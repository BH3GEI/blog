async function generateRSS() {
    try {
        // 获取文章列表
        const listUrl = `https://raw.githubusercontent.com/${github_base}/main/list.json`;
        const response = await fetch(listUrl);
        const posts = await response.json();
        
        // 按日期排序
        posts.sort((a, b) => new Date(b.time) - new Date(a.time));
        
        // RSS 头部
        let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>${default_title}</title>
    <description>BH3GEI's personal blog about programming, technology and more</description>
    <link>https://${site_domain}</link>
    <atom:link href="https://${site_domain}/rss.xml" rel="self" type="application/rss+xml" />
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

        // 获取并添加最新的10篇文章
        const recentPosts = posts.slice(0, 10);
        for (const post of recentPosts) {
            try {
                // 获取文章内容
                const articleUrl = `https://raw.githubusercontent.com/${github_base}/main/${post.file}`;
                const articleResponse = await fetch(articleUrl);
                let content = '';
                
                if (articleResponse.ok) {
                    content = await articleResponse.text();
                    // 只取文章的前500个字符作为描述
                    content = content.substring(0, 500) + '...';
                }
                
                // 构建文章链接 - 修复URL构建
                const postPath = post.file.replace(/^posts\//i, "").replace(/\.md$/i, "");
                const postUrl = `https://${site_domain}/blog/${encodeURIComponent(postPath)}`;
                
                // 添加文章到 RSS
                rss += `
    <item>
        <title>${escapeXML(post.title)}</title>
        <link>${postUrl}</link>
        <guid isPermaLink="true">${postUrl}</guid>
        <pubDate>${new Date(post.time).toUTCString()}</pubDate>
        <description><![CDATA[${content || post.title}]]></description>
        <author>BH3GEI</author>
        <category>Programming</category>
    </item>`;
            } catch (error) {
                console.error('Error processing post:', post, error);
                continue; // 跳过出错的文章，继续处理下一篇
            }
        }
        
        // RSS 尾部
        rss += `
</channel>
</rss>`;
        
        // 返回生成的RSS
        return new Response(rss, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        
    } catch (error) {
        console.error('Error generating RSS:', error);
        return new Response('Error generating RSS feed', { 
            status: 500,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
    }
}

// 辅助函数：转义 XML 特殊字符
function escapeXML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// 如果直接访问这个文件，生成 RSS
if (typeof window !== 'undefined') {
    generateRSS();
} 