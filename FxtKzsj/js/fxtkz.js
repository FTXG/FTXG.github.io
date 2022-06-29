window.onload=sjkz();
var sj=null;
function sjkz(){
	var now=new Date();
	var s=now.getHours();
	var f=now.getMinutes();
	var m=now.getSeconds();
	s=s<10?'0'+s:s;
	f=f<10?'0'+f:f;
	m=m<10?'0'+m:m;
	document.getElementById('xs').innerHTML=s+':'+f+':'+m;
	sj=setTimeout('sjkz()',500);
}
document.getElementById('btn').onclick=function(){
	var btn=document.getElementById('btn');
	if (sj) {
		clearTimeout(sj);
		sj=null;
		btn.value="打开";
	} else{
		sjkz();
		btn.value="暂停";
	}
}

