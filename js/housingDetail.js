window.onload = function () {
    ;(function () {
        _eventUpwardTriangleButtonClick();
        _eventSelectDate();
        _assignmentDate();


        //  fixme   正式
        // $.getJSON(APIList.salesSummaryV2, function (result) {
        //     console.log(result);
        //     if(result.isSuccess){
        //         requestCallback(result.data);
        //     }
        // });
        //  fixme   调试
        requestCallback(mainData);

        function requestCallback(data) {
            console.log(data);
            // console.log(data.yesterdayAndTotalSale);
            //  转化格式
            formattingTotalData(data.yesterdayAndTotalSale);
            formattingYesterdayData(data.yesterdayAndTotalSale);
            Object.keys(data.mapVillage).forEach(function (item) {
                formattingTotalData(data.mapVillage[item]);
                formattingYesterdayData(data.mapVillage[item]);
            });
            window.requestData = data;

            //  哪一个楼盘
            const village = decodeURIComponent(getQueryVariable('village'));
            _assignmentRealEstateOnSale(data.mapVillage[village], 1);
            //  默认绘制扇形统计图
            pieDiagram1Fn(-1, data.mapVillage[village]);
        }
    }());
};