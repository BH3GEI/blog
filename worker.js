//<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=22668285&auto=1&height=66"></iframe>

// 定义 Github 项目，文章会从这里读取
const github_base = "BH3GEI/blog/";

// 设置站点信息
var default_title	 = "BH3GEI's Blog";					// 站点标题（显示在浏览器标题栏）
var default_intitle	 = "BH3GEI's Blog";								// 站点名称（显示在首页）
var site_domain		 = "liyao.blog";								// 站点域名
var site_subtitle	 = "";							// 站点副标题
var site_favicon	 = "https://en.gravatar.com/userimage/194126597/84ff189b66b338a3d5dcfc9a4d13d028.png?size=200";				// 站点 Logo

// 博主信息
var owner_name = "BH3GEI";									// 博主名字
var owner_logo = "https://avatars.githubusercontent.com/u/58540850?v=4"	// 博主头像
var owner_desc = "          BH3GEIのブログへようこそ！";					// 博主简介

// 设置站点资源文件地址
var css_bootstrap	 = "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css";		// Boostrap css 文件地址
var css_hljs_github   = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/github.min.css";  	// Highlight js css 地址
var js_jquery		 = "https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js";		// JQuery 地址
var js_bootstrap	= "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js";		// Bootstrap 地址
var js_instantclick   = "https://cdn.jsdelivr.net/npm/instantclick@3.1.0/instantclick.min.js";		// InstantClick 地址
var js_showdown	 = "https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js";			// Showdown 地址
var js_highlight	= "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js";		// Highlight 地址
var js_highlight_pack = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js";		// Highlight pack 地址

// 这是一些临时变量，无需修改
var title = "";
var intitle = "";
var title2 = "";
var description = "";
var ctime = "unknown";
var isunknown = "";

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

var header = `<!DOCTYPE HTML>
<!-- 由 CloudFlare Workers Blog 强力驱动 -->
<html lang="zh_CN">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=11">
		<meta name="application-name" content="${default_title}">
		<meta name="msapplication-TileColor" content="#F1F1F1">
		<meta name="author" content="${owner_name}">
		<meta name="keywords" content="blog,tech,${owner_name},programming">
		<meta name="description" content="{description}">
		<meta property="og:title" content="{title}">
		<meta property="og:description" content="{description}">
		<meta property="og:site_name" content="${default_title}">
		<meta property="og:type" content="website">
		<meta property="og:url" content="https://${site_domain}{current_path}">
		<meta property="og:image" content="${owner_logo}">
		<link rel="shortcut icon" href="${site_favicon}" />
		<link rel="stylesheet" href="${css_bootstrap}" crossorigin="anonymous">
		<link rel="stylesheet" href="${css_hljs_github}">
		<title>{title}</title>
		<style type="text/css">.pageid{margin-bottom:-26px}code{color:#484848;background-color:#f5f5f5;border-radius:0px;border:1px solid #dadada;}pre>code{color:unset;background-color:unset;border-radius:unset;border:0px;}.post-a {color: #000;text-decoration: none ! important;}.post-box {padding: 12px 20px 12px 20px;border-bottom: 1px solid rgba(0,0,0,0.07);cursor: pointer;border-left: 0px solid rgba(66, 66, 66, 0);transition-duration: 0.3s;}.post-box:hover {transition-duration: 0.3s;border-left: 5px solid rgba(66, 66, 66, 0.15);}.thread h2 {border-bottom: 1px solid rgb(238,238,238);padding-bottom: 10px;}.editor-preview pre, .editor-preview-side pre{padding: 0.5em;}.hljs{background: unset ! important;padding: 0px;}.CodeMirror{height: calc(100% - 320px);min-height: 360px;}.msgid{font-family:Consolas;}.tooltip {word-break: break-all;}h2 a{font-weight: 400;}body{/*background:url(https://i.natfrp.org/cbf5973ce9da283bc9abe307cdea7f30.jpg);*/font-family:'-apple-system','BlinkMacSystemFont','Segoe UI','Helvetica','Arial','sans-serif','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol' ! important;font-weight:400;background-attachment:fixed;background-size:cover;background-repeat:no-repeat;background-position:center;}h2 a{color: #000;} h2 a:hover{color: #000; text-decoration: none;}.full-width{width: 100%;}.thread img{vertical-align:text-bottom ! important;max-width:100% ! important;margin-top:8px;margin-bottom:8px;}.thread table{display:block;width:100%;overflow:auto;margin-bottom:8px;}.thread table tr{background-color:#fff;border-top:1px solid #c6cbd1;}.thread table tr:nth-child(2n){background-color:#f7f7f7;}.thread table th,.thread table td{padding:10px 12px 0px 12px;border:1px solid #dfe2e5;font-size:14px;}.thread table th {padding-bottom: 10px;background: #f7f7f7;}.thread pre{margin-bottom:16px;}pre{border:none ! important;}blockquote{font-size:15px ! important;}@media screen and(max-width:768px){.copyright{text-align:center;}}</style>
		<script>
			var _hmt = _hmt || [];
			(function() {
			var hm = document.createElement("script");
			hm.src = "https://hm.baidu.com/hm.js?b1f3cc985ea87c4141634fa0572a1612";
			var s = document.getElementsByTagName("script")[0]; 
			s.parentNode.insertBefore(hm, s);
			})();
		</script>
	</head>
	<body>

		<div class="container">
			<div class="row">
			<div class="col-sm-12" style="display: flex; justify-content: space-between; align-items: center;">
			<h2><a href="/" class="post-a">{intitle}</a></h2>
		</div>
		<p>${site_subtitle}</p>
		<hr>
				<div class="col-sm-9">
					<div class="thread">
						`;


var modifyHeader = {};
var cookieText = "";

function getRequestParams(str) {
	var index = str.indexOf("?");
	str = str.substring(index + 1, str.length);
	if(typeof(str) == "string"){
		u = str.split("&");
		var get = {};
		for(var i in u){
			var j = u[i].split("=");
			get[j[0]] = j[1];
		}
		return get;
	} else {
		return {};
	}
}

async function bloghandle(request) {
	var urls = new URL(request.url);
	var data = header;
	
	if(urls.pathname == "/") {
		var url = "https://raw.githubusercontent.com/" + github_base + "/main/list.json";
		const init = {
			method: "GET"
		};
		const response = await fetch(url, init);
		var resptxt = await response.text();
		var json = JSON.parse(resptxt);
		
		data += `<p>All Posts</p>`;
		
		var before_page = 0;
		var current_page = 1;
		var next_page = 2;
		var pagenow = json.length;
		var pageval = json.length - 12;
		
		var $_GET = getRequestParams(request.url);
		if($_GET['p'] != undefined && $_GET['p'] != "") {
			pageval = json.length - (parseInt($_GET['p']) * 12);
			pagenow = json.length - ((parseInt($_GET['p']) - 1) * 12) - 1;
			next_page = parseInt($_GET['p']) + 1;
			current_page = parseInt($_GET['p']);
			before_page = parseInt($_GET['p']) - 1;
		}
		
		var update_i = 0;
		for(var i = pagenow;i >= pageval;i--) {
			try {
				var tmpfilename = json[i].file
					.replace(/^posts\//i, "")
					.replace(/\.md$/i, "");
				var tmptime = json[i].time;
				var tmptitle = json[i].title;
				data += `<a href="/${encodeURIComponent(tmpfilename)}" class="post-a">
					<div class="post-box">
						<h4>${tmptitle}</h4>
						<p>${tmptime}</p>
					</div>
				</a>`;
				update_i++;
			} catch(e) {
				console.error("Error processing post:", e);
			}
		}
		
		if(update_i == 0) {
			data += `<p><blockquote>No content yet</blockquote></p>`;
		}
		
		data += `<br>
			<p class="text-left pageid">Current at page ${current_page}</p>
			<p class="text-right">`;
		
		if(current_page > 1) {
			data += `<a href="/?p=${before_page}"><button class="btn btn-default">Previous Page</button></a>&nbsp; &nbsp;`;
		}
		if(update_i >= 12) {
			data += `<a href="/?p=${next_page}"><button class="btn btn-default">Next Page</button></a>`;
		}
		
		data += `</p></div>`;
		
		title = default_title;
		intitle = default_title;
		title2 = default_title;
	} else {
		// 处理文章页面
		var uname = decodeURIComponent(urls.pathname).trim();
		// 移除开头的斜杠
		uname = uname.replace(/^\/+/, '');
		// 添加 posts/ 前缀和 .md 后缀，不要移除任何特殊字符
		uname = "posts/" + uname + ".md";
		console.log("Normalized article path:", uname);
		
		// 直接从 GitHub 获取文章列表
		const listUrl = "https://raw.githubusercontent.com/" + github_base + "/main/list.json";
		const listResponse = await fetch(listUrl);
		const json = await listResponse.json();
		
		var found = false;
		for(const post of json) {
			// 保持特殊字符的文件名比较
			const normalizedPostFile = post.file;
			console.log("Comparing:", normalizedPostFile, "with:", uname);
			if(normalizedPostFile === uname) {
				title = post.title;
				intitle = default_title;
				title2 = default_title;
				ctime = post.time;
				found = true;
				console.log("Found article:", post.file);
				break;
			}
		}
		
		data += `</div>
			<p class="text-center{isunknown}"><small></small></p>
			<textarea id="textdata" style="display: none;">`;
		
		if (found) {
			var url = "https://raw.githubusercontent.com/" + github_base + "/main/" + uname;
			console.log("Fetching article content from:", url);
			
			try {
				const response = await fetch(url);
				if(response.status == 200) {
					var resptxt = await response.text();
					// 在文章内容外包装一个 div，避免与页面结构冲突
					data += `<div class="markdown-body">
${resptxt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</div>`;
					description = resptxt.substring(0, 128).replace(/"/ig, "").replace(/\n/g, " ");
					console.log("Successfully fetched article content");
					data += `</textarea><hr>`;
				} else {
					console.error("Failed to fetch article content, status:", response.status);
					throw new Error("Failed to fetch article content");
				}
			} catch(e) {
				console.error("Error fetching article:", e);
				found = false;
			}
		}
		
		if (!found) {
			console.error("Article not found or failed to fetch");
			data += `### 404 Not Found

<div class="error-message">
    <p>Sorry, the page you are looking for cannot be found. This might be due to:</p>
    <ul>
        <li>The article has been deleted</li>
        <li>The article title has been changed</li>
        <li>The link you entered is incorrect</li>
        <li>The website might be experiencing technical issues</li>
    </ul>
    
    <p>Suggestion:</p>
    <p>Please visit <a href="https://bh3gei.github.io">my homepage</a> and look for the content within the site</p>

    <div class="back-link">
        <a href="/" class="btn">Back to ${default_intitle} Homepage</a>
    </div>
</div>
			</textarea>`;
			
			title = '404 - Page Not Found';
			title2 = ``;
			intitle = ``;
			description = ``;
			isunknown = " hidden";
		}
	}
	data += `</div>
				<div class="col-sm-3">
					<div style="padding: 16px;text-align: center;">
						<img src="${owner_logo}" style="max-width: 220px;width: 100%;border-radius: 50%;">
						<h3>${owner_name}</h3>
						<p class="text-CENTER">${owner_desc}
						</p>
						<hr>
						<div class="text-left">
							<h4>Homepage</h4>						
							<p><a href="https://bh3gei.github.io" target="_blank">🏠 Visit!</a></p>

							<h4>GitHub</h4>						
							<p><a href="https://github.com/BH3GEI/" target="_blank">⌨️ Code!</a></p>

							<h4>LinkedIn</h4>						
							<p><a href="https://linkedin.com/in/yao-li2026" target="_blank">💼 Connect!</a></p>

							<h4>Projects</h4>						
							<p><a href="https://bh3gei.github.io/ProjectPage/" target="_blank">🗺️ Play!</a></p>

							<h4>All Links</h4>						
							<p><a href="https://bh3gei.github.io/AllLinks/" target="_blank">🔗 Visit!</a></p>

				
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
				<p>Powered by CloudFlare Workers | <a href="https://github.com/BH3GEI/blog" target="_blank">Github</a></p>
				<p>&copy; 2023 ${default_intitle}</p>
				<br><br>
				</div>
			</div>
		</div>
		<script src="${js_jquery}"></script>
		<script src="${js_bootstrap}" crossorigin="anonymous"></script>
		<script src="${js_instantclick}" data-no-instant></script>
		<script src="${js_showdown}" type="text/javascript"></script>
		<script src="${js_highlight}"></script>
		<script src="${js_highlight_pack}"></script>
		<script type="text/javascript">
			// 使用新的 highlight.js API
			document.addEventListener('DOMContentLoaded', (event) => {
				hljs.highlightAll();
			});

			// 初始化 showdown，使用更完整的配置
			var md = new showdown.Converter({
				tables: true,
				simplifiedAutoLink: true,
				simpleLineBreaks: true,
				openLinksInNewWindow: true,
				noHeaderId: false,  // 启用标题ID
				parseImgDimensions: true,
				strikethrough: true,
				tasklists: true,
				smoothLivePreview: true,
				prefixHeaderId: 'section-',  // 添加标题ID前缀，避免冲突
				ghCompatibleHeaderId: true,  // 使用GitHub兼容的标题ID
				ghMentions: false,
				encodeEmails: true,
				emoji: true
			});

			function processMarkdown() {
				try {
					const content = $("#textdata").val();
					if (!content) return;
					
					// 处理文章内容
					$(".markdown-body").html(md.makeHtml(content));
					
					// 处理代码高亮
					document.querySelectorAll('pre code').forEach(function(e) {
						hljs.highlightElement(e);
					});
				} catch(e) {
					console.error('Error processing markdown:', e);
				}
			}

			// 页面加载完成时处理
			window.onload = processMarkdown;

			// InstantClick 切换页面时处理
			InstantClick.on('change', processMarkdown);
		</script>
		<style>
			/* Markdown 样式 */
			.markdown-body {
				padding: 20px;
				line-height: 1.6;
				word-wrap: break-word;
			}
			
			.markdown-body h1,
			.markdown-body h2,
			.markdown-body h3,
			.markdown-body h4,
			.markdown-body h5,
			.markdown-body h6 {
				margin-top: 24px;
				margin-bottom: 16px;
				font-weight: 600;
				line-height: 1.25;
			}
			
			.markdown-body h1 {
				padding-bottom: 0.3em;
				font-size: 2em;
				border-bottom: 1px solid #eaecef;
			}
			
			.markdown-body h2 {
				padding-bottom: 0.3em;
				font-size: 1.5em;
				border-bottom: 1px solid #eaecef;
			}
			
			.markdown-body p {
				margin-top: 0;
				margin-bottom: 16px;
			}
			
			.markdown-body code {
				padding: 0.2em 0.4em;
				margin: 0;
				font-size: 85%;
				background-color: rgba(27,31,35,0.05);
				border-radius: 3px;
			}
			
			.markdown-body pre > code {
				padding: 16px;
				overflow: auto;
				font-size: 85%;
				line-height: 1.45;
				background-color: #f6f8fa;
				border-radius: 3px;
				display: block;
			}
		</style>
	</body>
</html>
	`;
	data = data.replace(/\{title\}/ig, title)
		.replace(/\{intitle\}/ig, intitle)
		.replace(/\{title\_2\}/ig, title2)
		.replace(/\{isunknown\}/ig, isunknown)
		.replace(/\{description\}/ig, description)
		.replace(/\{current_path\}/ig, urls.pathname);
	return data;
}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
	if(new URL(request.url).protocol != "https:") {
		var rhttps = new Response("Location to https", {status: 301});
		rhttps.headers.set("Location", request.url.replace("http://", "https://"));
		return rhttps;
	}

	const url = new URL(request.url);
	
	// Handle robots.txt
	if(url.pathname == "/robots.txt") {
		return new Response(`User-agent: *
Allow: /
Sitemap: https://${site_domain}/sitemap.xml`, {
			headers: {
				"content-type": "text/plain"
			}
		});
	}
	
	// Handle sitemap.xml
	if(url.pathname == "/sitemap.xml") {
		const listUrl = "https://raw.githubusercontent.com/" + github_base + "/main/list.json";
		const response = await fetch(listUrl);
		const json = await response.json();
		
		let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://${site_domain}/</loc>
		<changefreq>daily</changefreq>
		<priority>1.0</priority>
	</url>`;
		
		for(const post of json) {
			const path = post.file.replace(/posts\//ig, "").replace(/\.md/ig, "");
			sitemap += `
	<url>
		<loc>https://${site_domain}/${encodeURIComponent(path)}</loc>
		<lastmod>${post.time.split(' ')[0]}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.8</priority>
	</url>`;
		}
		
		sitemap += `
</urlset>`;
		
		return new Response(sitemap, {
			headers: {
				"content-type": "application/xml"
			}
		});
	}

	cookieText = request.headers.get("cookie");
	var resp = new Response(await bloghandle(request), {status: 200});
	resp.headers.set("Content-Type", "text/html");
	if(modifyHeader != undefined) {
		for(var index in modifyHeader) {
			resp.headers.set(index, modifyHeader[index]);
		}
	}
	return resp;
}
