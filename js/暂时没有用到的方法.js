/**
 * 暂时没有用到的公共方法
 * */

//  拎包整体tab点击
function a() {
    //  点击目标
    const $bagAsWholeUl = $('.bag-as-whole-ul');
    //  切换目标
    const $bagAsWholeMenuItem = $('.bag-as-whole-menu').find('.bag-as-whole-menu-item');
    $bagAsWholeUl.on('click', function (e) {
        //  激活当前tab的class
        $bagAsWholeUl.find('.active-tab').removeClass('active-tab');
        const $target = $(e.target);
        $target.addClass('active-tab');
        const index = $target.data('index');
        //  隐藏全部的item，展示当前的item
        $bagAsWholeMenuItem.hide().eq(index).show();
        e.stopPropagation();
    });
}
//  各套包毛利占比
function d() {
    const $grossProfitRatioPackage = $('#grossProfitRatioPackage');
    const arr = [
        {name: '家私', num: 42},
        {name: '家私', num: 40},
        {name: '家私', num: 16},
        {name: '家私', num: 2}];
    const $packageNameDiv = $grossProfitRatioPackage.find('div');
    const $packageNameList = $grossProfitRatioPackage.find('h4');
    const $packageNumList = $grossProfitRatioPackage.find('p');
    arr.forEach(function (item, index) {
        //  标题文字
        const $div = $($packageNameDiv[index]);
        $div.css({
            width: `${item.num}%`,
        });
        const divFontSizeRate = 100;
        // console.log(`${Math.min(0.26, Math.max((item.num / divFontSizeRate), 0.2))}rem`);
        $($packageNameList[index])
            .text(item.name)
            .css({
                // fontSize: `${Math.max((item.num / divFontSizeRate), 0.2)}rem`,
                fontSize: `${Math.min(0.26, Math.max((item.num / divFontSizeRate), 0.2))}rem`,
            });
        //  百分比
        const $p = $($packageNumList[index]);
        $p.text(`${item.num}%`);
        const pFontSizeRate = 50;
        // console.log(item.num / pFontSizeRate);
        $p.css({
            fontSize: `${Math.min(0.66, Math.max((item.num / pFontSizeRate), 0.34))}rem`,
        });
    })
}


//  进入最新进展列表
function e() {
    //  去最新进展列表
    const $latestProgress = $('#latestProgress');
    $latestProgress.on('click', function (e) {
        wxNavigateTo(PageUrlList.messageList, {name: '我是messageList'});
        e.stopPropagation();
    });
    const $latestProgressDetail = $('#latestProgressDetail');
    //  去最新进展详情
    $latestProgressDetail.on('click', function (e) {
        wxNavigateTo(PageUrlList.messageDetail, {messageId: 2});
        e.stopPropagation();
    })
}

//  数据说明
function f() {
    //  数据说明按钮 带问号
    const dataDeclarationTap = $('.data-declaration-tap');
    //  确认说明按钮 —— 我知道了
    const $confirmDeclaration = $("#confirmDeclaration");
    //  确认说明弹框
    const $dateDeclarationBox = $("#dateDeclarationBox");
    //  弹出
    dataDeclarationTap.on('click', function (e) {
        e.stopPropagation();
        $dateDeclarationBox.removeClass('hide').addClass('flex');
    });
    //  隐藏
    $confirmDeclaration.on('click', function (e) {
        e.stopPropagation();
        $dateDeclarationBox.removeClass('flex').addClass('hide');
    });
    //  防止滚动
    $dateDeclarationBox.on('touchmove', function (e) {
        e.preventDefault();
    });
}