window.onload = function () {
    ;(function () {
        _eventUpwardTriangleButtonClick();
        _eventSelectDate(function () {
            console.log('日期选择');
        });

        ;(function () {
            //  默认绘制条形统计图
            pieDiagram1Fn();
        }());


    }());
};