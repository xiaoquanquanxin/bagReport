//  计算rem
;(function (doc, win, undefined) {
    const docEl = doc.documentElement;
    const resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
    const recalc = function () {
        const clientWidth = docEl.clientWidth;
        if (clientWidth === undefined) return;
        docEl.style.fontSize = clientWidth / 7.50 + 'px';
    };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);

//  获取参数
function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}

//  获得日期
function getDate() {
    const date = new Date();
    const YEAR = date.getFullYear();
    const MONTH = date.getFullYear();
    const DATE = date.getDate();
    //  todo    测试版
    return `${YEAR}.${MONTH}.${DATE}.${date.getTime()}`;
    //  todo    正式版
    // return `${YEAR}.${MONTH}.${DATE}`;
}

//  加载js
function loadJs(src, scriptId, singlePass, loadCallback) {
    const script = document.createElement('script');
    script.type = "text/javascript";
    //  如果需要拼接随机数
    if (!singlePass) {
        src = `${src}?v=${getDate()}`;
    }
    // console.log(src);
    script.src = src;
    if (scriptId) {
        script.id = scriptId;
    }
    document.body.appendChild(script);
    if (!loadCallback) {
        return;
    }
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            loadCallback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState === 'loaded') {
                loadCallback();
            }
        });
    }
}

//  加载css
function loadCss(href) {
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = `${href}?v=${getDate()}`;
    document.head.appendChild(link);
}

//  带参数的跳转
function wxNavigateTo(pageUrl, params) {
    params = params || {};
    params = Object.assign(params, {iswx: true, v: Math.random()});
    console.log(params);
    //  拼接搜索的参数
    const searchUrl = Object.keys(params).reduce(function (pre, current) {
        return `${pre}${current}=${params[current]}&`;
    }, '?').slice(0, -1);
    console.log(searchUrl);
    const url = `${pageUrl}${searchUrl}`;
    wx.miniProgram.navigateTo({
        url: `/pages/outLine/outLine?url=${encodeURIComponent(url)}`,
    });
}

//  跳转页面地址
const PageUrlList = {
    //  进展列表
    messageList: `${window.location.origin}/messageList.html`,
    //  进展详情
    messageDetail: `${window.location.origin}/messageDetail.html`,

};
// /**
//  * 在onload之后加载业务js
//  * @fn:function 业务js方法
//  * */
// function addProfessionJs(fn) {
//     const onloadFn = window.onload;
//     if (typeof onloadFn === "function") {
//         window.onload = function () {
//             onloadFn();
//             fn();
//         }
//     } else {
//         window.onload = fn;
//     }
// }
