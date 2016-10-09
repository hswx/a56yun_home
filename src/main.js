/**
 * Created by jchnxu on 3/31/16.
 */
(function () {
    'use strict';

    function popupWindowWithContent(w, h, content) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open('', '_blank', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        newWindow.document.open();
        newWindow.document.write(content);
        newWindow.document.close();
    }

    function openQQWindow() {
        popupWindowWithContent(500, 300, '<html><head><title>QQ客服</title></head><body><div style="text-align:center"><div>请点击按钮，发起聊天</div><script charset="utf-8" type="text/javascript" src="http://wpa.b.qq.com/cgi/wpa.php?key=XzkzODE4OTQ3OF8zNTc2NTZfNDAwMDYyNTI1Nl8"></script></div></body></html>');
    }

    window.openQQWindow = openQQWindow;
})();

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
        } else {
            url = "/requisitions?size=10&sort=status,updatedTime,desc";
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

if (!isLogged()) {
    $("#unLoggedBanner").show();
    $("#loggedBanner").hide();
} else {
    $("#myNameHref").text(getUsernameFromCookie());
    $("#loggedBanner").show();
    $("#unLoggedBanner").hide();
}