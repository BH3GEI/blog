const CLIENT_ID = 'Ov23liUHoNfB0EUXWMh3';
const CLIENT_SECRET = '0941398059e2ea7d54a1742b06ac2fc5dbe3a959';

// HTML template for the editor
const editorHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Editor</title>
    <link rel="icon" href="https://bh3gei.github.io/avatar.png" type="image/png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.css" rel="stylesheet">
    <style>
        .editor-container {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .hidden {
            display: none;
        }
        .editor-wrapper {
            display: flex;
            gap: 20px;
            margin-top: 1rem;
        }
        #editor, #preview {
            flex: 1;
            min-height: 500px;
        }
        #editor {
            font-family: monospace;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            resize: none;
        }
        #preview {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow-y: auto;
        }
        .login-container {
            text-align: center;
            margin-top: 5rem;
        }
        .post-list {
            margin-top: 2rem;
        }
        .post-item {
            padding: 1rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .post-info {
            flex-grow: 1;
        }
        .post-actions {
            display: flex;
            gap: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="editor-container">
        <div id="loginSection" class="login-container">
            <h1 class="mb-4">Blog Editor</h1>
            <button id="loginButton" class="btn btn-primary btn-lg">
                Login with GitHub
            </button>
        </div>

        <div id="editorSection" class="hidden">
            <div class="d-flex justify-content-between align-items-center">
                <h1>New Post</h1>
                <button id="saveButton" class="btn btn-success">Save Post</button>
            </div>
            <div class="mb-3">
                <input type="text" id="titleInput" class="form-control form-control-lg" placeholder="Post Title">
            </div>
            <div class="editor-wrapper">
                <textarea id="editor" placeholder="Write your post in Markdown..."></textarea>
                <div id="preview" class="markdown-body"></div>
            </div>
            
            <div id="postList" class="post-list">
                <h2>All Posts</h2>
                <div id="postItems"></div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        const CLIENT_ID = '${CLIENT_ID}';
        const REDIRECT_URI = 'https://editor.stratosphericus.workers.dev';
        const REPO_OWNER = 'BH3GEI';
        const REPO_NAME = 'blog';

        // Initialize Markdown preview
        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview');
        
        editor.addEventListener('input', () => {
            preview.innerHTML = marked.parse(editor.value);
        });

        // GitHub OAuth handling
        document.getElementById('loginButton').addEventListener('click', () => {
            const authUrl = \`https://github.com/login/oauth/authorize?client_id=\${CLIENT_ID}&redirect_uri=\${REDIRECT_URI}&scope=repo\`;
            window.location.href = authUrl;
        });

        // Check if we're returning from OAuth
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Exchange code for token
            fetch('/auth', {
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
                    loadPosts();
                }
            })
            .catch(error => console.error('Error:', error));
        }

        // Show editor if we're already logged in
        if (localStorage.getItem('github_token')) {
            showEditor();
            loadPosts();
        }

        function showEditor() {
            document.getElementById('loginSection').classList.add('hidden');
            document.getElementById('editorSection').classList.remove('hidden');
        }

        async function loadPosts() {
            const token = localStorage.getItem('github_token');
            if (!token) return;

            try {
                const listResponse = await fetch(\`https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/contents/list.json\`, {
                    headers: {
                        'Authorization': \`token \${token}\`
                    }
                });
                const listData = await listResponse.json();
                // 使用 decodeURIComponent 和 escape 来正确处理中文
                const content = decodeURIComponent(escape(atob(listData.content)));
                const posts = JSON.parse(content);
                
                // 按时间倒序排序
                posts.sort((a, b) => new Date(b.time) - new Date(a.time));
                
                const postItemsContainer = document.getElementById('postItems');
                postItemsContainer.innerHTML = posts.map(post => \`
                    <div class="post-item">
                        <div class="post-info">
                            <h4>\${post.title}</h4>
                            <small>\${post.time}</small>
                        </div>
                        <div class="post-actions">
                            <a href="https://github.com/\${REPO_OWNER}/\${REPO_NAME}/blob/main/\${post.file}" 
                               target="_blank" 
                               class="btn btn-sm btn-primary">Edit on GitHub</a>
                            <button class="btn btn-sm btn-danger" onclick="deletePost('\${post.file}', '\${post.title}')">Delete</button>
                        </div>
                    </div>
                \`).join('');
            } catch (error) {
                console.error('Error loading posts:', error);
                alert('Failed to load posts. Please try again.');
            }
        }

        async function deletePost(filePath, title) {
            if (!confirm(\`Are you sure you want to delete "\${title}"?\`)) return;
            
            const token = localStorage.getItem('github_token');
            if (!token) return;

            try {
                // First get the file's SHA
                const response = await fetch(\`https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/contents/\${filePath}\`, {
                    headers: {
                        'Authorization': \`token \${token}\`
                    }
                });
                const fileData = await response.json();

                // Delete the file
                await fetch(\`https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/contents/\${filePath}\`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': \`token \${token}\`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: \`Delete post: \${title}\`,
                        sha: fileData.sha,
                        branch: 'main'
                    })
                });

                // Update list.json
                await removeFromList(filePath);
                alert('Post deleted successfully!');
                loadPosts();
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Failed to delete post. Please try again.');
            }
        }

        async function removeFromList(filePath) {
            const token = localStorage.getItem('github_token');
            
            // Get current list.json
            const listResponse = await fetch(\`https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/contents/list.json\`, {
                headers: {
                    'Authorization': \`token \${token}\`
                }
            });
            const listData = await listResponse.json();
            
            // 使用 decodeURIComponent 和 escape 来正确处理中文
            const content = decodeURIComponent(escape(atob(listData.content)));
            const currentContent = JSON.parse(content);
            
            // Remove the post
            const updatedContent = currentContent.filter(post => post.file !== filePath);
            
            // Update list.json
            await fetch(\`https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/contents/list.json\`, {
                method: 'PUT',
                headers: {
                    'Authorization': \`token \${token}\`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: \`Remove deleted post from list\`,
                    content: btoa(unescape(encodeURIComponent(JSON.stringify(updatedContent, null, 4)))),
                    sha: listData.sha,
                    branch: 'main'
                })
            });
        }

        // Handle save button click
        document.getElementById('saveButton').addEventListener('click', async () => {
            const title = document.getElementById('titleInput').value;
            const content = editor.value;
            
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
                const now = new Date();
                // 转换为日本时间
                const jpDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
                const date = jpDate.toISOString().split('T')[0];
                
                // 生成文件名：YYYYMMDD_HHMMSS
                const fileName = jpDate.getFullYear().toString() +
                    (jpDate.getMonth() + 1).toString().padStart(2, '0') +
                    jpDate.getDate().toString().padStart(2, '0') + '_' +
                    jpDate.getHours().toString().padStart(2, '0') +
                    jpDate.getMinutes().toString().padStart(2, '0') +
                    jpDate.getSeconds().toString().padStart(2, '0') + '.md';

                // 不再自动添加标题
                const fileContent = content;

                const response = await fetch(\`https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/contents/posts/\${fileName}\`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': \`token \${token}\`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: \`Add new post: \${title}\`,
                        content: btoa(unescape(encodeURIComponent(fileContent))),
                        branch: 'main'
                    })
                });

                if (response.ok) {
                    await updateListJson(title, fileName, date);
                    alert('Post saved successfully!');
                    // Clear the form
                    document.getElementById('titleInput').value = '';
                    editor.value = '';
                    preview.innerHTML = '';
                    loadPosts();
                } else {
                    const errorData = await response.json();
                    throw new Error(\`Failed to save post: \${errorData.message}\`);
                }
            } catch (error) {
                console.error('Error saving post:', error);
                alert(error.message || 'Failed to save post. Please try again.');
            }
        });

        async function updateListJson(title, fileName, date) {
            const token = localStorage.getItem('github_token');
            
            // First get the current list.json
            const listResponse = await fetch(\`https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/contents/list.json\`, {
                headers: {
                    'Authorization': \`token \${token}\`
                }
            });
            const listData = await listResponse.json();
            
            // 使用 decodeURIComponent 和 escape 来正确处理中文
            const content = decodeURIComponent(escape(atob(listData.content)));
            const currentContent = JSON.parse(content);
            
            // Add new post to the end
            currentContent.push({
                title: title,
                time: date,
                file: \`posts/\${fileName}\`
            });
            
            // Update list.json
            await fetch(\`https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/contents/list.json\`, {
                method: 'PUT',
                headers: {
                    'Authorization': \`token \${token}\`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: \`Update list.json for: \${title}\`,
                    content: btoa(unescape(encodeURIComponent(JSON.stringify(currentContent, null, 4)))),
                    sha: listData.sha,
                    branch: 'main'
                })
            });
        }
    </script>
</body>
</html>
`;

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const url = new URL(request.url);
    
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(editorHTML, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
        },
      });
    }

    if (request.method === "POST" && url.pathname === "/auth") {
      const { code } = await request.json();

      // Exchange the code for an access token
      const tokenResponse = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
          }),
        }
      );

      const data = await tokenResponse.json();

      // Return the response with CORS headers
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};