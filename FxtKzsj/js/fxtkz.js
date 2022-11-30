$(function () {
	sjkz();
	$("#btn").on("click",function () {
		if (sj) {
			clearTimeout(sj);
			sj=null;
			$("#btn").text("ACTION");
		} else{
			sjkz();
			$("#btn").text("STOP");
		}
	})
})
var sj=null;
var timeStr = "2020-12-02 17:57:47";
var beginDate = StrToDate(timeStr);
var beginTime = beginDate.getTime();
var jrDateStr = "2023-01-22 00:00:00";
var jrDate = StrToDate(jrDateStr);
var jrTimes = jrDate.getTime();
function sjkz (){
	var now=new Date();
	var endTime = now.getTime();
	let toDay = millisecondToDay(beginTime,endTime);
	var s=now.getHours();
	var f=now.getMinutes();
	var m=now.getSeconds();
	s=s<10?'0'+s:s;
	f=f<10?'0'+f:f;
	m=m<10?'0'+m:m;
	var days = toDay.day+"天"+toDay.hour+"时"+toDay.min+"分"+toDay.sec+"秒";
	$("#context").html(days);
	$("#xs").html(s+':'+f+':'+m);
	let jrDatejg = millisecondToDay(endTime,jrTimes);
	var jrDays = jrDatejg.day+"天"+jrDatejg.hour+"时"+jrDatejg.min+"分"+jrDatejg.sec+"秒";
	$("#jr").html(jrDays);
	sj=setTimeout('sjkz()',500);
}
//字符串转日期
function StrToDate(datestr) {
	return new Date(datestr);
}
//毫秒数转天数
function millisecondToDay(begin,end){
	var difference = end-begin;
	var num = difference/1000;
	//num是秒数    98876秒  有多少天： xx天xx时xx分xx秒
	var sec = setDb(Math.trunc(num % 60)); //06 秒
	var min = setDb(Math.floor(num / 60) % 60); //Math.floor(num / 60) % 60     分
	var hour = setDb(Math.floor(num / 60 / 60) % 24); //时
	var day = setDb(Math.floor(num / 60 / 60 / 24)); //天数
	return {"sec":sec,"min":min,"hour":hour,"day":day};
}
/*
     补零函数:toDB(num)
     参数：num数字
     返回值：小于10的补零返回

 */
function setDb(num) {
	//补零操作
	if (num < 10) {
		return '0' + num;
	} else {
		return '' + num;
	}
}