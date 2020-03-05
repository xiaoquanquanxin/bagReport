//  日期选择
function _eventSelectDate(selectCallback) {
    //  日期选择
    const $selectDate = $('.select-date');
    //  日期选择的ul
    const $selectDateUl = $selectDate.find('ul');
    $selectDateUl.on('click', function (e) {
        const $this = $(this);
        const $parent = $this.parent();
        $parent.removeClass('select-date-open');
        e.stopPropagation();
        const $target = $(e.target);
        $parent.find('.current-date').text($target.text());
        $this.find('.bg403B3D').removeClass('bg403B3D');
        $target.addClass('bg403B3D');
        if (typeof selectCallback === "function") {
            selectCallback();
        }
    });
    //  日期选择的默认位置
    const $defaultDate = $selectDate.find('.default-date');
    $defaultDate.on('click', function (e) {
        $(this).parents().addClass('select-date-open');
        e.stopPropagation();
    });
}


//  带有向上三角的大按块————切换canvas
function _eventUpwardTriangleButtonClick() {
    const $barChartControl = $('.bar-chart-control');
    // console.log($barChartControl);
    $barChartControl.on('click', function (e) {
        const $target = $(e.target);
        // console.log($target);
        // console.log($target.data('bind-fn'));
        //  先改变样式
        $target
            .addClass('active-bar-chart')
            .siblings()
            .removeClass('active-bar-chart');
        //  选中的应该被控制的div的name
        const chartControlName = $target.parent().data('chart-control');
        const chartControlIndex = $target.data('chart-control-index');
        //  应该被控制的div
        const $chartControlDiv = $(`[chart-control-name='${chartControlName}']`);
        // console.log($chartControlDiv);
        //  被控制的全部的div
        const $chartControlItem = $chartControlDiv.find('[chart-control-index]');
        const $currentDiv = $chartControlDiv.find(`[chart-control-index='${chartControlIndex}']`);
        $chartControlItem.hide();
        $currentDiv.show();
        const fnName = $target.data('bind-fn');
        if (fnName && typeof window[fnName] === "function") {
            window[fnName]();
            window[fnName] = null;
        }
        e.stopPropagation();
    })
}


//  跳转页面地址
const PageUrlList = {
    //  进展列表
    messageList: `${window.location.origin}/messageList.html`,
    //  进展详情
    messageDetail: `${window.location.origin}/messageDetail.html`,
    //  楼盘详情
    housingDetails: `${window.location.origin}/housingDetails.html`,
};

//  API接口地址
const APIList = {
    salesSummaryV2: `${window.location.origin}/statistics/h5/salesSummaryV2`,

};
