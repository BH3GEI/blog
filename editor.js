const CLIENT_ID = 'Ov23liUHoNfB0EUXWMh3';
const REDIRECT_URI = window.location.origin + '/blog/editor.html';
const WORKER_URL = 'https://editor.stratosphericus.workers.dev/auth';
const REPO_OWNER = 'BH3GEI';
const REPO_NAME = 'blog';

// Initialize EasyMDE
let easyMDE = new EasyMDE({
    element: document.getElementById('editor'),
    autofocus: true,
    spellChecker: false,
    status: ['lines', 'words'],
});

// GitHub OAuth handling
document.getElementById('loginButton').addEventListener('click', () => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`;
    window.location.href = authUrl;
});

// Check if we're returning from OAuth
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
    // Exchange code for token
    fetch(WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            localStorage.setItem('github_token', data.access_token);
            showEditor();
        }
    })
    .catch(error => console.error('Error:', error));
}

// Show editor if we're already logged in
if (localStorage.getItem('github_token')) {
    showEditor();
}

function showEditor() {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('editorSection').classList.remove('hidden');
}

// Handle save button click
document.getElementById('saveButton').addEventListener('click', async () => {
    const title = document.getElementById('titleInput').value;
    const content = easyMDE.value();
    
    if (!title || !content) {
        alert('Please enter both title and content');
        return;
    }

    const token = localStorage.getItem('github_token');
    if (!token) {
        alert('Please login first');
        return;
    }

    try {
        // Create file name from title
        const fileName = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '.md';

        // Prepare file content with frontmatter
        const date = new Date().toISOString().split('T')[0];
        const fileContent = `# ${title}\n\n${content}`;

        // Create new file in GitHub repository
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/posts/${fileName}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Add new post: ${title}`,
                content: btoa(fileContent),
                branch: 'main'
            })
        });

        if (response.ok) {
            // Update list.json
            await updateListJson(title, fileName, date);
            alert('Post saved successfully!');
            window.location.href = '/';
        } else {
            throw new Error('Failed to save post');
        }
    } catch (error) {
        console.error('Error saving post:', error);
        alert('Failed to save post. Please try again.');
    }
});

async function updateListJson(title, fileName, date) {
    const token = localStorage.getItem('github_token');
    
    // First get the current list.json
    const listResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/list.json`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const listData = await listResponse.json();
    
    // Decode current content
    const currentContent = JSON.parse(atob(listData.content));
    
    // Add new post to the beginning
    currentContent.unshift({
        title: title,
        time: date,
        file: `posts/${fileName}`
    });
    
    // Update list.json
    await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/list.json`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: `Update list.json for: ${title}`,
            content: btoa(JSON.stringify(currentContent, null, 4)),
            sha: listData.sha,
            branch: 'main'
        })
    });
} 