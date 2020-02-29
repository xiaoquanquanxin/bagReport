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
function loadJs(src) {
    const script = document.createElement('script');
    script.type = "text/javascript";
    script.src = `${src}?v=${getDate()}`;
    document.body.appendChild(script);
}

//  加载css
function loadCss(href) {
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = `${href}?v=${getDate()}`;
    document.head.appendChild(link);
}

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
