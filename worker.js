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
var css_bootstrap	 = "https://cdn.zerodream.net/css/bootstrap.min.css";		// Boostrap css 文件地址
var css_hljs_github   = "https://cdn.zerodream.net/css/highlight.js/github.css";  	// Highlight js css 地址
var js_jquery		 = "https://cdn.zerodream.net/js/jquery.min.js";		// JQuery 地址
var js_bootstrap	= "https://cdn.zerodream.net/js/bootstrap.min.js";		// Bootstrap 地址
var js_instantclick   = "https://cdn.zerodream.net/js/instantclick.min.js";		// InstantClick 地址
var js_showdown	 = "https://cdn.zerodream.net/js/showdown.min.js";			// Showdown 地址
var js_showdown_table = "https://cdn.zerodream.net/js/showdown-table.min.js";		// Showdown table 地址
var js_highlight	= "https://cdn.zerodream.net/js/highlight.min.js";		// Highlight 地址
var js_highlight_pack = "https://cdn.zerodream.net/js/highlight.pack.js";		// Highlight pack 地址

// // 设置站点资源文件地址
// var css_bootstrap	 = "./bootstrap.min.css";		// Boostrap css 文件地址
// var css_hljs_github   = "./github.css";  	// Highlight js css 地址
// var js_jquery		 = "./jquery.min.js";		// JQuery 地址
// var js_bootstrap	= "./bootstrap.min.js";		// Bootstrap 地址
// var js_instantclick   = "./instantclick.min.js";		// InstantClick 地址
// var js_showdown	 = "./showdown.min.js";			// Showdown 地址
// var js_showdown_table = "./showdown-table.min.js";		// Showdown table 地址
// var js_highlight	= "./highlight.min.js";		// Highlight 地址
// var js_highlight_pack = "./highlight.pack.js";		// Highlight pack 地址

// // 设置站点资源文件地址
// var css_bootstrap	 = "./.min.css";		// Boostrap css 文件地址
// var css_hljs_github   = "./gitub.cs";  	// Highlight js css 地址
// var js_jquery		 = "./jqury.min.js";		// JQuery 地址
// var js_bootstrap	= "./bootstra.min.js";		// Bootstrap 地址
// var js_instantclick   = "./instanclick.min.js";		// InstantClick 地址
// var js_showdown	 = "./showdownmin.js";			// Showdown 地址
// var js_showdown_table = "./showdon-table.min.js";		// Showdown table 地址
// var js_highlight	= "./highlight.mn.js";		// Highlight 地址
// var js_highlight_pack = "./highght.pack.js";		// Highlight pack 地址

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
		<meta name="application-name" content="SakuraFrp Blog">
		<meta name="msapplication-TileColor" content="#F1F1F1">
		<link rel="shortcut icon" href="${site_favicon}" />
		<meta name="description" content="{description}">
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
	var cookie = {};
	var clist = undefined;
	try {
		cookieText.split(';').forEach(l => {
			var parts = l.split('=');
			cookie[parts[0].trim()] = unescape((parts[1] || '').trim());
		});
	} catch(e) {
		// 无可奉告
	}
	var $_GET = getRequestParams(request.url);
	var urls = new URL(request.url);
	var data = header;
	if(urls.pathname == "/") {
		var url = "https://raw.githubusercontent.com/" + github_base + "/main/list.json";
		const init = {
		method: "GET"
		};
		const response = await fetch(url, init);
		var resptxt = await response.text();
		if(cookie['list'] == undefined) {
			var Days = 30; 
			var exp = new Date(); 
			exp.setTime(exp.getTime() + Days*24*60*60*1000); 
			modifyHeader = {
				"Set-Cookie" : "list="+ escape (resptxt) + ";expires=" + exp.toGMTString()
			};
		}
		var json = JSON.parse(resptxt);
		// console.log(json);
		data += `<p>All Posts</p>
						`;
		var before_page = 0;
		var current_page = 1;
		var next_page = 2;
		var pagenow = json.length;
		var pageval = json.length - 12;
		if($_GET['p'] != undefined && $_GET['p'] != "") {
			pageval = json.length - (parseInt($_GET['p']) * 12);
			pagenow = json.length - ((parseInt($_GET['p']) - 1) * 12) - 1;
			next_page = parseInt($_GET['p']) + 1;
			current_page = parseInt($_GET['p']);
			before_page = parseInt($_GET['p']) - 1;
		}
		console.log(pageval);
		var update_i = 0;
		for(var i = pagenow;i >= pageval;i--) {
		try {
			var tmpfilename = encodeURIComponent(json[i].file
			.replace(/"/g, "").replace(/posts\//ig, "").replace(/\.md/ig, ""));
			var tmptime = json[i].time;
			var tmptitle = json[i].title;
			data += `<a href="/${tmpfilename}" class="post-a">
							<div class="post-box">
								<h4>${tmptitle}</h4>
								<p></p>
							</div>
						</a>
						`;
			update_i++;
		} catch(e) {
			// 收声
		}
		}
		console.log(update_i);
		if(update_i == 0) {
		data += `<p><blockquote>No content yet</blockquote></p>
				`
		}
		data += `<br>
						<p class="text-left pageid"> Current at page ${current_page} </p>
						<p class="text-right">
							`;
		if(current_page > 1) {
		data += `<a href="/?p=${before_page}"><button class="btn btn-default">Previous Page</button></a>&nbsp; &nbsp;`;
		}
		if(update_i >= 12) {
		data += `<a href="/?p=${next_page}"><button class="btn btn-default">Next Page</button></a>`;
		}
		data += `
						</p>
					</div>
				`;
		title = default_title;
		//intitle = default_intitle;
		intitle = default_title;
		title2 = default_title;
		// title2 = "";
	} else {
		var uname = unescape("posts" + urls.pathname + ".md");
		try {
		clist = cookie['list'];
		} catch(e) {
		var url = "https://raw.githubusercontent.com/" + github_base + "/main/list.json";
		const init = {
			method: "GET"
		};
		const response = await fetch(url, init);
		clist = await response.text();
		}
		if(clist != undefined) {
			try {
				var json = JSON.parse(clist);
				var found = false;
				for(var i in json) {
					tmpfilename = json[i].file.replace(/"/g, "");
					tmptime = json[i].time;
					tmptitle = json[i].title;
					if(tmpfilename == uname) {
						title = tmptitle;
						// intitle = tmptitle;
						intitle = title;
						title = default_title;
						intitle = default_title;
						title2 = default_title;
						ctime = tmptime;
						found = true;
					}
				}
				if(!found) {
					var url = "https://raw.githubusercontent.com/" + github_base + "//list.json";
					const init = {
						method: "GET"
					};
					const response = await fetch(url, init);
					clist = await response.text();
					var json = JSON.parse(clist);
					for(var i in json) {
						tmpfilename = json[i].file.replace(/"/g, "");
						tmptime = json[i].time;
						tmptitle = json[i].title;
						if(tmpfilename == uname) {
							title = tmptitle;
							intitle = tmptitle;
							intitle = default_title;
							title = default_title;
							title2 = default_title;
							ctime = tmptime;
						}
					}
					var Days = 30; 
					var exp = new Date(); 
					exp.setTime(exp.getTime() + Days*24*60*60*1000); 
					modifyHeader = {
						"Set-Cookie" : "list="+ escape (clist) + ";expires=" + exp.toGMTString()
					};
				}
			} catch(e) {
				// 收声
			}
		} else {
			var url = "https://raw.githubusercontent.com/" + github_base + "/main/list.json";
			const init = {
				method: "GET"
			};
			const response = await fetch(url, init);
			var clist = await response.text();
			var json = JSON.parse(clist);
			for(var i in json) {
				tmpfilename = json[i].file.replace(/"/g, "");
				tmptime = json[i].time;
				tmptitle = json[i].title;
				if(tmpfilename == uname) {
					title = tmptitle;
					intitle = tmptitle;
					intitle = default_title;
					title = default_title;
					title2 = default_title;
					ctime = tmptime;
				}
			}
			var Days = 30; 
			var exp = new Date(); 
			exp.setTime(exp.getTime() + Days*24*60*60*1000); 
			modifyHeader = {
				"Set-Cookie" : "list="+ escape (clist) + ";expires=" + exp.toGMTString()
			};
		}
		data += `</div>
						<p class="text-center{isunknown}"><small></small></p>
						<textarea id="textdata" style="display: none;">`;
		var url = "https://raw.githubusercontent.com/" + github_base + "/main/posts" + urls.pathname + ".md";
		const init = {
			method: "GET"
		};
		const response = await fetch(url, init);
		if(response.status == 200) {
			var resptxt = await response.text();
			data += resptxt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			description = resptxt.substring(0, 128).replace(/"/ig, "").replace(/\n/g, " ");
			data += `</textarea>
					<hr>
					
				`;
		} else {
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
					</textarea>
				`;
			title = '404 - Page Not Found';
			// title2 = ` - ${default_title}`;
			title2 = ``;
			intitle = ``;
			title = default_title;
			intitle = ``;
			description = ``;
			isunknown = " hidden";
		}
		title2 = `${default_title}`;
	}
	data += `</div>
				<div class="col-sm-3">
					<div style="padding: 16px;text-align: center;">
						<img src="${owner_logo}" style="max-width: 220px;width: 100%;border-radius: 50%;">
						<h3>${owner_name}</h3>
						<p class="text-CENTER">${owner_desc}
						<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="//music.163.com/outchain/player?type=2&id=27090060&auto=1&height=32"></iframe>
						</p>
						<hr>
						<div class="text-left">
							<h4>Homepage</h4>						
							<p><a href="https://bh3gei.github.io" target="_blank">🏠 Visit!</a></p>


							<h4>GitHub</h4>						
							<p><a href="https://github.com/BH3GEI/" target="_blank">💼 Code!</a></p>					
                            
                            <h4>163 Music</h4>						
							<p><a href="https://music.163.com/#/user/home?id=6336499362" target="_blank">🎧 Listen! </a></p>		
                            
                            <h4>Spotify</h4>						
							<p><a href="https://open.spotify.com/user/dixonhill-?si=35067335daa44ff3" target="_blank">🎵 Listen! </a></p>		
                            
                            <h4>Telegram</h4>			
							<p><a href="https://t.me/yao_luv_cs" target="_blank">✈️ Chat!</a></p>		
							
                            <h4>Web Proxy</h4>						
							<p><a href="https://stratoproxy.stratosphericus.workers.dev" target="_blank">🧱 Surf!</a></p>
							
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
		<script src="${js_showdown_table}" type="text/javascript"></script>
		<script src="${js_highlight}"></script>
		<script src="${js_highlight_pack}"></script>
		<script src="https://comments.zerodream.net/comments.js?s=2"></script>
		<script type="text/javascript">
			var init = {
			site: "${site_domain}",
			cid: "posts${urls.pathname}.md"
			};
			hljs.initHighlightingOnLoad();
			var md = new showdown.Converter({extensions: ['table']});
			md.setOption('simplifiedAutoLink', true);
			md.setOption('simpleLineBreaks', true);
			md.setOption('openLinksInNewWindow', true);
			md.setOption('noHeaderId', true);
			window.onload = function() {
				try {
					$(".thread").html(md.makeHtml($("#textdata").val()));
					document.querySelectorAll('pre code').forEach(function(e) {
						hljs.highlightBlock(e);
					});
					CommentsInit(comments, init);
				} catch(e) {}
			}
		</script>
		<script data-no-instant>
			InstantClick.init();
			InstantClick.on('change', function() {
				try {
					$(".thread").html(md.makeHtml($("#textdata").val()));
					document.querySelectorAll('pre code').forEach(function(e) {
						hljs.highlightBlock(e);
					});
					CommentsInit(comments, init);
				} catch(e) {}
			});
		</script>
	</body>
</html>
	`;
	data = data.replace(/\{title\}/ig, title)
		.replace(/\{intitle\}/ig, intitle)
		.replace(/\{title\_2\}/ig, title2)
		.replace(/\{isunknown\}/ig, isunknown)
		.replace(/\{description\}/ig, description);
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
