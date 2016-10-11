!function () {
    "use strict";
    function e(e, t, n) {
        var i = void 0 != window.screenLeft ? window.screenLeft : screen.left, d = void 0 != window.screenTop ? window.screenTop : screen.top, o = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width, c = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height, w = o / 2 - e / 2 + i, h = c / 2 - t / 2 + d, r = window.open("", "_blank", "width=" + e + ", height=" + t + ", top=" + h + ", left=" + w);
        r.document.open(), r.document.write(n), r.document.close()
    }

    function t() {
        e(500, 300, '<html><head><title>QQ客服</title></head><body><div style="text-align:center"><div>点击下面按钮发起对话</div><script charset="utf-8" type="text/javascript" src="http://wpa.b.qq.com/cgi/wpa.php?key=XzkzODE4OTQ3OF8zNTc2NTZfNDAwMDYyNTI1Nl8"></script></div></body></html>')
    }

    window.openQQWindow = t
}();


function isLogged(){

    if($.cookie('username')==undefined){
        return false;
    }
    return true;
}

function isChedui(){

    if($.cookie('chedui')==undefined){
        return false;
    }
    return true;
}

function logoutFromCookie(){
    if(isLogged()){
        $.removeCookie('username');
        $.removeCookie('rolename');
    }
}

function loginOnCookie(username,rolename){
    $.cookie('username', userName, { expires: 1 });
    $.cookie('rolename', rolename, { expires: 1 });
}

function setCheduiFlag(){
    $.cookie('chedui', 'true', { expires: 1 });
}

function delCheduiFlag(){
    $.removeCookie('chedui');
}

function getUsernameFromCookie(){
    return $.cookie('username');
}

function getRolenameFromCookie(){
    return $.cookie('rolename');
}

function gotoJKDCC() {
    var url;
    if (!isLogged()) {
        url = "/login";
    } else {
        var username = getUsernameFromCookie();
        var rolename = getRolenameFromCookie();

        if (rolename === 'ADMINISTRATOR' || rolename === 'SUPPORTER') {
            url = "/admin/requisitions?size=10&sort=status,updatedTime,desc";
        }else if(userRole==='DISPATCHER'){
            url = "/admin/taoXiangData/fetch"
        } else {
            url = "/requisitions?size=10&sort=status,updatedTime,desc";
        }
    }
    location.href = url;
}

function gotoCKSFC() {
    var url;
    if (!isLogged()) {
        url = "/login";
    } else {
        var username = getUsernameFromCookie();
        var rolename = getRolenameFromCookie();

        if(rolename==='DISPATCHER'){
            url = "/admin/taoXiangData/fetch"
        } else {
            url = "/expLoadPlans?size=10&sort=updatedTime,desc";
        }
    }
    location.href = url;
}

function login() {
    location.href = '/login';
}

function logout() {
    location.href = '/logout';
}

function signup() {
    location.href = '/newUser';
}

function gotoModifyUser() {
    location.href = '/modifyUser';
}
function gotoMyLeYun() {
    location.href = '/user/authInfo';
}

if(location.host==='tx.a56yun.com'){
    setCheduiFlag();
}

if(!isChedui()){
    $("#search_box").show();
    $("#slide_img1").attr('src','http://static.a56yun.com/img/carousel/activity.png');
}else{
    $("#search_box").hide();
    $("#slide_img1").attr('src','http://static.a56yun.com/img/carousel/aboutme.png');
}

if (!isLogged()) {
    $("#unLoggedBanner").show();
    $("#loggedBanner").hide();

} else {
    $("#myNameHref").text(getUsernameFromCookie());
    $("#loggedBanner").show();
    if(getRolenameFromCookie()==='SUPPORTER'||getRolenameFromCookie()==='ADMINISTRATOR'||getRolenameFromCookie()==='DISPATCHER'){
        $("#loggedBanner>li:eq(1)").hide();
    }else{
        $("#loggedBanner>li:eq(1)").show();
    }
    $("#unLoggedBanner").hide();
}
