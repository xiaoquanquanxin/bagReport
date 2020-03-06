window.onload = function () {
    //  万位
    // const WAN_DIGIT = 10000;
    ;(function () {
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
            pieDiagram1Fn(-1, data.yesterdayAndTotalSale);
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
    }());

    //  格式化总额
    function formattingTotalData(data) {
        //  总合同额
        data.TotalContract = correctToWan(data.TotalContract || 0);
        //  总收款额
        data.TotalReceives = correctToWan(data.TotalReceives || 0);

        //  总家电合同额
        data.TotalFamilyElectricContract = correctToWan(data.TotalFamilyElectricContract || 0);
        //  总家电收款额
        data.TotalFamilyElectricReceives = correctToWan(data.TotalFamilyElectricReceives || 0);

        //  总家私合同额
        data.TotalFamilyPropertyContract = correctToWan(data.TotalFamilyPropertyContract || 0);
        //  总家私收款额
        data.TotalFamilyPropertyReceives = correctToWan(data.TotalFamilyPropertyReceives || 0);

        //  总智家合同额
        data.TotalSmartHomeContract = correctToWan(data.TotalSmartHomeContract || 0);
        //  总智家收款额
        data.TotalSmartHomeReceives = correctToWan(data.TotalSmartHomeReceives || 0);

        //  总家装合同额
        data.TotalFamilyDecorationContract = correctToWan(data.TotalFamilyDecorationContract || 0);
        //  总家装收款额
        data.TotalFamilyDecorationReceives = correctToWan(data.TotalFamilyDecorationReceives || 0);
    }

    //  格式化昨日额
    function formattingYesterdayData(data) {
        //  昨日合同额
        data.YesterdayContract = correctToWan(data.YesterdayContract || 0);
        //  昨日收款额
        data.YesterdayReceives = correctToWan(data.YesterdayReceives || 0);

        //  昨日家电合同额
        data.YesterdayFamilyElectricContract = correctToWan(data.YesterdayFamilyElectricContract || 0);
        //  昨日家电收款额
        data.YesterdayFamilyElectricReceives = correctToWan(data.YesterdayFamilyElectricReceives || 0);

        //  昨日家私合同额
        data.YesterdayFamilyPropertyContract = correctToWan(data.YesterdayFamilyPropertyContract || 0);
        //  昨日家私收款额
        data.YesterdayFamilyPropertyReceives = correctToWan(data.YesterdayFamilyPropertyReceives || 0);

        //  昨日智家合同额
        data.YesterdaySmartHomeContract = correctToWan(data.YesterdaySmartHomeContract || 0);
        //  昨日智家收款额
        data.YesterdaySmartHomeReceives = correctToWan(data.YesterdaySmartHomeReceives || 0);

        //  昨日家装合同额
        data.YesterdayFamilyDecorationContract = correctToWan(data.YesterdayFamilyDecorationContract || 0);
        //  昨日家装收款额
        data.TotalFamilyDecorationReceives = correctToWan(data.TotalFamilyDecorationReceives || 0);
    }
};

//  日期
function _assignmentDate() {
    const _date = new Date();
    const yesterday = new Date(_date.getTime() - 1000 * 60 * 60 * 24);
    const date = getDate(yesterday);
    const DATE_TEXT = `${date.YEAR}/${completionZero(date.MONTH)}/${completionZero(date.DATE)} 24:00`;
    window.dueDate.innerText = DATE_TEXT;
    window.dueDateSurvey.innerText = DATE_TEXT;
}

//  昨日销量
//  家电
//  家私
//  智能家居
//  家装
function _assignmentYesterdaySalesVolume(data) {
    data.YesterdayHandBag = data.YesterdayHandBag || 0;
    data.YesterdayFamilyElectric = data.YesterdayFamilyElectric || 0;
    data.YesterdayFamilyProperty = data.YesterdayFamilyProperty || 0;
    data.YesterdaySmartHome = data.YesterdaySmartHome || 0;
    data.YesterdayFamilyDecoration = data.YesterdayFamilyDecoration || 0;

    const TOTAL_VALUE = data.YesterdayHandBag;
    const MAX_WIDTH = 2.5;
    //  计算长度
    window.YesterdayFamilyElectric.style.width = (data.YesterdayFamilyElectric / TOTAL_VALUE) * MAX_WIDTH;
    window.YesterdayFamilyProperty.style.width = (data.YesterdayFamilyProperty / TOTAL_VALUE) * MAX_WIDTH;
    window.YesterdaySmartHome.style.width = (data.YesterdaySmartHome / TOTAL_VALUE) * MAX_WIDTH;
    window.YesterdayFamilyDecoration.style.width = (data.YesterdayFamilyDecoration / TOTAL_VALUE) * MAX_WIDTH;
    //  赋值
    window.YesterdayFamilyElectric.innerText = data.YesterdayFamilyElectric
    window.YesterdayFamilyProperty.innerText = data.YesterdayFamilyProperty;
    window.YesterdaySmartHome.innerText = data.YesterdaySmartHome;
    window.YesterdayFamilyDecoration.innerText = data.YesterdayFamilyDecoration;
    //  总量
    window.YesterdayTotal.innerText = TOTAL_VALUE;
}

//  拎包在售楼盘
function _assignmentRealEstateOnSale(data, realEstateOnSale) {
    //  拎包在售楼盘
    window.realEstateOnSale.innerText = realEstateOnSale || 0;

    //  累计销售 合同金额
    window.TotalContract.innerText = data.TotalContract;
    //  收款金额
    window.TotalReceives.innerText = data.TotalReceives;
    //  累计销售楼盘
    window.TotalHandBag.innerText = data.TotalHandBag || 0;

    //  家电合同额
    window.TotalFamilyElectricContract.innerText = data.TotalFamilyElectricContract;
    //  家电收款额
    window.TotalFamilyElectricReceives.innerText = data.TotalFamilyElectricReceives;
    //  家电数
    window.TotalFamilyElectric.innerText = data.TotalFamilyElectric || 0;


    //  家私套餐合同额
    window.TotalFamilyPropertyContract.innerText = data.TotalFamilyPropertyContract;
    //  家私套餐收款额
    window.TotalFamilyPropertyReceives.innerText = data.TotalFamilyPropertyReceives;
    //  家私数
    window.TotalFamilyProperty.innerText = data.TotalFamilyProperty || 0;


    //  智家合同额
    window.TotalSmartHomeContract.innerText = data.TotalSmartHomeContract;
    //  智家套餐收款额
    window.TotalSmartHomeReceives.innerText = data.TotalSmartHomeReceives;
    //  智家数
    window.TotalSmartHome.innerText = data.TotalSmartHome || 0;


    //  家装合同额
    window.TotalFamilyDecorationContract.innerText = data.TotalFamilyDecorationContract;
    //  家装套餐收款额
    window.TotalFamilyDecorationReceives.innerText = data.TotalFamilyDecorationReceives;
    //  家装数
    window.TotalFamilyDecoration.innerText = data.TotalFamilyDecoration || 0;


}

//  累计销售冠军楼盘
function _assignmentSalesChampion(villageData, totalTopSales) {
    //  累计销售冠军楼盘
    window.totalTopSales.innerText = totalTopSales;
    const _data = villageData[totalTopSales];
    //  总数
    window.ChampionTotalHandBag.innerText = _data.TotalHandBag;
    //  详细
    const data = [
        {name: '家电套餐', sales: _data.TotalFamilyElectric || 0},
        {name: '家私套餐', sales: _data.TotalFamilyProperty || 0},
        {name: '智能套餐', sales: _data.TotalSmartHome || 0},
        {name: '家装套餐', sales: _data.TotalFamilyDecoration || 0},
    ].sort(function (a, b) {
        return a.sales - b.sales;
    });
    //  ul
    const $salesChampion = $('#salesChampion');
    //  区域
    const $salesVolumePillar = $salesChampion.find('.sales-volume-pillar');
    //  名称
    const $salesVolumeName = $salesChampion.find('.sales-volume-name');
    //  总数
    const total = data.reduce(function (prev, current) {
        return prev + current.sales;
    }, 0);
    if (total === 0) {
        return;
    }
    //  比例
    const rate = data[3].sales / 300 * 100;
    data.forEach(function (item, index) {
        const value = item.sales / rate;
        //  每个的范围
        const $self = $($salesVolumePillar[index]);
        // console.log(value)
        //  边框宽度 === 数据换算成rem的值 * 0.707 + 保底的0.14 rem
        const borderWidth = value * 0.707 + 0.14;
        // console.log(borderWidth);
        //  右侧淡色小方块
        $self.find('div').css({
            borderWidth: `${borderWidth}rem`,
        });
        $self.css({
            width: `${(borderWidth + 0.2) * 1.41}rem`,
        });

        $self.siblings('span').text(item.sales);
        $salesVolumeName[index].innerText = item.name;
    });

}

//  全国各项目情况
function _assignmentNationalProjects(data) {
    window.nationalProjectsTable.innerHTML = Object.keys(data).reduce(function (prev, current) {
        return `${prev}<tr><td>${current}</td><td>${data[current].TotalHandBag}</td><td>${data[current].TotalContract}</td><td>${data[current].TotalReceives}</td></tr>`;
    }, '');
}

//  设置省份楼盘的数据
function _assignmentProvincialRealEstate(data) {
    // console.log(data);
    //  地图选择的楼盘名
    mapChooseVillageName.innerText = data.name;
    //  拎包认购数
    mapChooseHandBag.innerText = data.__room;
    //  拎包合同额/万
    mapChooseContract.innerText = data.__contractValue;
    //  拎包收款额/万
    mapChooseReceives.innerText = data.__receives;
}

