
//保存cookie
//参数：cookie名,cookie值,有效时长(单位：天)
function saveCookie(cookieName, cookieValue, cookieDates){
	var d = new Date();
	d.setDate(d.getDate()+cookieDates);
	document.cookie = cookieName+"="+cookieValue+";expires="+d.toGMTString();
}


//读取cookie
function getCookie(cookieName){
	var cookieStr = unescape(document.cookie);
	var arr = cookieStr.split("; ");
	var cookieValue = "";
	for(var i=0;i<arr.length;i++){
		var temp = arr[i].split("=");
		if(temp[0]==cookieName){
			cookieValue = temp[1];
			break;
		}
	}
	return cookieValue;
}


//删除cookie
//删除cookie
function removeCookie(cookieName) {
    document.cookie = encodeURIComponent(cookieName) + '=; expires=' + new Date();
}

export {
	saveCookie,
	getCookie,
	removeCookie
}