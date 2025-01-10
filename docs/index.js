// 定义 Github 项目，文章会从这里读取
const github_base = "BH3GEI/blog";

// 设置站点信息
const default_title = "BH3GEI's Blog";
const default_intitle = "BH3GEI's Blog";
const site_domain = "bh3gei.github.io/blog";
const site_subtitle = "";
const site_favicon = "https://en.gravatar.com/userimage/194126597/84ff189b66b338a3d5dcfc9a4d13d028.png?size=200";

// 博主信息
const owner_name = "BH3GEI";
const owner_logo = "https://avatars.githubusercontent.com/u/58540850?v=4";
const owner_desc = "BH3GEIのブログへようこそ！";

// CDN 资源
const resources = {
    css: {
        bootstrap: "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css",
        hljs: "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/github.min.css"
    },
    js: {
        jquery: "https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js",
        bootstrap: "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js",
        showdown: "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js",
        highlight: "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"
    }
};

async function init() {
    // 获取文章列表
    const listUrl = `https://raw.githubusercontent.com/${github_base}/main/list.json`;
    const response = await fetch(listUrl);
    const posts = await response.json();
    
    // 按日期倒序排序文章
    posts.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    // 如果是访问 RSS feed
    if (window.location.pathname.endsWith('/rss.xml')) {
        const rssResponse = await generateRSS();
        document.body.innerHTML = `<pre>${await rssResponse.text()}</pre>`;
        return;
    }
    
    // 添加 decodeURIComponent 来处理 URL 中的特殊字符
    const path = decodeURIComponent(window.location.pathname)
        .replace(/^\/blog\//, '')  // Remove leading /blog/
        .replace(/\/$/, '');       // Remove trailing slash
    
    // 特殊路径处理
    if (path === 'editor/editor.html') {
        return; // 让编辑器页面自己处理
    }
    
    if (path === '') {
        renderHome(posts);
    } else {
        renderPost(posts, path);
    }
}

function renderHome(posts) {
    document.title = default_title;
    // 重置 meta 描述
    document.querySelector('meta[name="description"]').setAttribute("content", "BH3GEI's personal blog about programming, technology and more");
    const container = document.querySelector('.thread');
    
    // 添加搜索框
    let html = `
        <div class="search-box" style="margin-bottom: 20px;">
            <input type="text" id="searchInput" class="form-control" placeholder="Search for posts..." style="margin-bottom: 10px;">
        </div>
        <div id="searchResults"></div>
        <p>All Posts</p>
    `;
    
    // 分页逻辑
    const postsPerPage = 12;
    const currentPage = parseInt(new URLSearchParams(window.location.search).get('p')) || 1;
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagesPosts = posts.slice(start, end);
    
    // 创建文章列表容器
    html += '<div id="postsList">';
    
    // 渲染文章列表
    pagesPosts.forEach(post => {
        const filename = post.file.replace(/^posts\//i, "").replace(/\.md$/i, "");
        html += `
            <a href="/blog/${encodeURIComponent(filename)}" class="post-a">
                <div class="post-box">
                    <h4>${post.title}</h4>
                    <p>${post.time}</p>
                </div>
            </a>
        `;
    });
    
    html += '</div>';
    
    // 添加分页控制
    html += `<br><p class="text-left pageid">Current at page ${currentPage}</p><p class="text-right">`;
    if (currentPage > 1) {
        html += `<a href="?p=${currentPage - 1}"><button class="btn btn-default">Previous Page</button></a>&nbsp; &nbsp;`;
    }
    if (end < posts.length) {
        html += `<a href="?p=${currentPage + 1}"><button class="btn btn-default">Next Page</button></a>`;
    }
    html += '</p>';
    
    container.innerHTML = html;
    
    // 添加搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const postsList = document.getElementById('postsList');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === '') {
            searchResults.style.display = 'none';
            postsList.style.display = 'block';
            return;
        }
        
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.time.toLowerCase().includes(searchTerm)
        );
        
        if (filteredPosts.length > 0) {
            let resultsHtml = '';
            filteredPosts.forEach(post => {
                const filename = post.file.replace(/^posts\//i, "").replace(/\.md$/i, "");
                resultsHtml += `
                    <a href="/blog/${encodeURIComponent(filename)}" class="post-a">
                        <div class="post-box">
                            <h4>${post.title}</h4>
                            <p>${post.time}</p>
                        </div>
                    </a>
                `;
            });
            searchResults.innerHTML = resultsHtml;
            searchResults.style.display = 'block';
            postsList.style.display = 'none';
        } else {
            searchResults.innerHTML = '<p>没有找到匹配的文章</p>';
            searchResults.style.display = 'block';
            postsList.style.display = 'none';
        }
    });
}

async function renderPost(posts, path) {
    // 解码路径用于比较
    const decodedPath = decodeURIComponent(path);
    const post = posts.find(p => {
        const postPath = p.file.replace(/^posts\//i, "").replace(/\.md$/i, "");
        return postPath === decodedPath;
    });
    
    if (!post) {
        console.error('Post not found for path:', path);
        render404();
        return;
    }
    
    // 修正 GitHub raw URL 的构建方式
    const url = `https://raw.githubusercontent.com/${github_base}/main/${post.file}`;
    const response = await fetch(url);
    if (!response.ok) {
        console.error('Failed to fetch post content:', response.status, response.statusText);
        render404();
        return;
    }
    const content = await response.text();
    
    // 渲染文章
    const converter = new showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });
    
    document.querySelector('.thread').innerHTML = `
        <article itemscope itemtype="http://schema.org/BlogPosting">
            <h1 itemprop="headline">${post.title}</h1>
            <div class="post-meta">
                <time itemprop="datePublished" datetime="${post.time}">${post.time}</time>
                <span itemprop="author" itemscope itemtype="http://schema.org/Person">
                    <span itemprop="name">${owner_name}</span>
                </span>
            </div>
            <div class="markdown-body" itemprop="articleBody">
                ${converter.makeHtml(content)}
            </div>
        </article>
    `;
    
    // 代码高亮
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block);
    });
    
    // 更新页面标题和 meta 信息
    document.title = `${post.title} - ${default_title}`;
    
    // 更新 meta 描述
    const metaDesc = content.substring(0, 160).replace(/[#\n]/g, ''); // 提取前160个字符作为描述
    document.querySelector('meta[name="description"]').setAttribute("content", metaDesc);
    document.querySelector('meta[property="og:title"]').setAttribute("content", post.title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", metaDesc);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", post.title);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", metaDesc);
    
    // 添加结构化数据
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "datePublished": post.time,
        "author": {
            "@type": "Person",
            "name": owner_name,
            "image": owner_logo
        },
        "publisher": {
            "@type": "Organization",
            "name": default_title,
            "logo": {
                "@type": "ImageObject",
                "url": site_favicon
            }
        }
    };
    
    // 插入结构化数据
    const scriptTag = document.createElement('script');
    scriptTag.type = "application/ld+json";
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);
}

function render404() {
    document.querySelector('.thread').innerHTML = `
        <h1>404 - Page Not Found</h1>
        <div class="error-message">
            <p>Sorry, the page you are looking for cannot be found.</p>
            <div class="back-link">
                <a href="/blog/" class="btn btn-primary">Back to Homepage</a>
            </div>
        </div>
    `;
}

// 初始化
document.addEventListener('DOMContentLoaded', init); 