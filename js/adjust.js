window.onload = function () {
    _eventUpwardTriangleButtonClick();
    _eventSelectDate();
    _assignmentDate();
    //  去楼盘详情数据页
    ;(function () {
        const $detailData = $('#detailData');
        $detailData.on('click', function (e) {
            wxNavigateTo(PageUrlList.housingDetails, {
                village: mapChooseVillageName.innerText
            });
            e.stopPropagation();
        });
    }());


    //  fixme   正式
    // $.getJSON(APIList.salesSummaryV2, function (result) {
    //     console.log(result);
    //     if(result.isSuccess){
    //         requestCallback(result.data);
    //     }
    // });
    //  fixme   调试
    requestCallback(mainData);

    //  请求数据
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
        // console.log(data);
        /**
         * 赋值
         * */

        _assignmentYesterdaySalesVolume(data.yesterdayAndTotalSale);
        _assignmentRealEstateOnSale(data.yesterdayAndTotalSale, Object.keys(data.mapVillage).length);
        _assignmentSalesChampion(data.mapVillage, data.totalTopSales);
        _assignmentNationalProjects(data.mapVillage);
        //  上面的折线统计图
        brokenLineDiagram1Fn();


        //  默认绘制扇形统计图
        pieDiagram1Fn(-1);
        //  中国地图绘制
        drawChinaMap(-1);

        //  冠军楼盘
        const championVillage = getChampionVillage(-1);
        // console.log(championVillage);
        //  省份地图绘制
        drawProvinceMap(getProvinceByVillage(data.mapVillage));
        //  设置省份楼盘的数据
        _assignmentProvincialRealEstate(championVillage);
    }
};
