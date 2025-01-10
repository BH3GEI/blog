// 配置
const GITHUB_REPO = 'BH3GEI/blog';
const SITE_TITLE = "BH3GEI's Blog";
const SITE_DESCRIPTION = "BH3GEI's personal blog about programming, technology and more";
const SITE_URL = 'https://bh3gei.github.io/blog';

async function handleRequest() {
	try {
		// 获取文章列表
		const listResponse = await fetch(`https://raw.githubusercontent.com/${GITHUB_REPO}/main/list.json`);
		if (!listResponse.ok) {
			throw new Error('Failed to fetch article list');
		}
		const posts = await listResponse.json();
		
		// 按日期排序
		posts.sort((a, b) => new Date(b.time) - new Date(a.time));
		
		// 生成 RSS
		let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
	<title>${SITE_TITLE}</title>
	<description>${SITE_DESCRIPTION}</description>
	<link>${SITE_URL}</link>
	<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
	<language>zh-CN</language>
	<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

		// 获取最新的10篇文章
		const recentPosts = posts.slice(0, 10);
		
		// 并行获取所有文章内容
		const postPromises = recentPosts.map(async post => {
			try {
				const contentResponse = await fetch(`https://raw.githubusercontent.com/${GITHUB_REPO}/main/${post.file}`);
				if (!contentResponse.ok) {
					return null;
				}
				const content = await contentResponse.text();
				return { post, content };
			} catch (error) {
				console.error('Error fetching post:', post.title, error);
				return null;
			}
		});

		const results = await Promise.all(postPromises);

		// 添加文章到RSS
		for (const result of results) {
			if (!result) continue;
			
			const { post, content } = result;
			const summary = content.substring(0, 500).replace(/[\n\r]/g, ' ') + '...';
			const postPath = post.file.replace(/^posts\//i, "").replace(/\.md$/i, "");
			const postUrl = `${SITE_URL}/${encodeURIComponent(postPath)}`;

			rss += `
	<item>
		<title>${escapeXML(post.title)}</title>
		<link>${postUrl}</link>
		<guid isPermaLink="true">${postUrl}</guid>
		<pubDate>${new Date(post.time).toUTCString()}</pubDate>
		<description><![CDATA[${summary}]]></description>
		<author>BH3GEI</author>
		<category>Programming</category>
	</item>`;
		}

		rss += `
</channel>
</rss>`;

		// 返回RSS
		return new Response(rss, {
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'public, max-age=3600',
			},
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

addEventListener('fetch', event => {
	event.respondWith(handleRequest());
});
