window.onload = function () {
    //  万位
    const WAN_DIGIT = 10000;

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
    function _assignmentYesterdaySalesVolume(YesterdayFamilyElectric, YesterdayFamilyProperty, YesterdaySmartHome, YesterdayFamilyDecoration,) {
        YesterdayFamilyElectric = YesterdayFamilyElectric || 0;
        YesterdayFamilyProperty = YesterdayFamilyProperty || 0;
        YesterdaySmartHome = YesterdaySmartHome || 0;
        YesterdayFamilyDecoration = YesterdayFamilyDecoration || 0;

        const TOTAL_VALUE = YesterdayFamilyElectric + YesterdayFamilyProperty + YesterdaySmartHome + YesterdayFamilyDecoration;
        const MAX_WIDTH = 2.5;
        //  计算长度
        window.YesterdayFamilyElectric.style.width = (YesterdayFamilyElectric / TOTAL_VALUE) * MAX_WIDTH;
        window.YesterdayFamilyProperty.style.width = (YesterdayFamilyProperty / TOTAL_VALUE) * MAX_WIDTH;
        window.YesterdaySmartHome.style.width = (YesterdaySmartHome / TOTAL_VALUE) * MAX_WIDTH;
        window.YesterdayFamilyDecoration.style.width = (YesterdayFamilyDecoration / TOTAL_VALUE) * MAX_WIDTH;
        //  赋值
        window.YesterdayFamilyElectric.innerText = YesterdayFamilyElectric;
        window.YesterdayFamilyProperty.innerText = YesterdayFamilyProperty;
        window.YesterdaySmartHome.innerText = YesterdaySmartHome;
        window.YesterdayFamilyDecoration.innerText = YesterdayFamilyDecoration;
        //  总量
        window.YesterdayTotal.innerText = TOTAL_VALUE;
    }

    //  拎包在售楼盘
    function _assignmentRealEstateOnSale(data, realEstateOnSale) {
        //  拎包在售楼盘
        window.realEstateOnSale.innerText = realEstateOnSale || 0;

        //  累计销售 合同金额
        window.TotalContract.innerText = Math.round(data.TotalContract / WAN_DIGIT) || 0;
        //  收款金额
        window.TotalReceives.innerText = Math.round(data.TotalReceives / WAN_DIGIT) || 0;
        //  累计销售楼盘
        window.TotalHandBag.innerText = data.TotalHandBag || 0;

        //  家电合同额
        window.TotalFamilyElectricContract.innerText = Math.round(data.TotalFamilyElectricContract / WAN_DIGIT) || 0;
        //  家电收款额
        window.TotalFamilyElectricReceives.innerText = Math.round(data.TotalFamilyElectricReceives / WAN_DIGIT) || 0;
        //  家电数
        window.TotalFamilyElectric.innerText = data.TotalFamilyElectric || 0;


        //  家私套餐合同额
        window.TotalFamilyPropertyContract.innerText = Math.round(data.TotalFamilyPropertyContract / WAN_DIGIT) || 0;
        //  家私套餐收款额
        window.TotalFamilyPropertyReceives.innerText = Math.round(data.TotalFamilyPropertyReceives / WAN_DIGIT) || 0;
        //  家私数
        window.TotalFamilyProperty.innerText = data.TotalFamilyProperty || 0;


        //  智家合同额
        window.TotalSmartHomeContract.innerText = Math.round(data.TotalSmartHomeContract / WAN_DIGIT) || 0;
        //  智家套餐收款额
        window.TotalSmartHomeReceives.innerText = Math.round(data.TotalSmartHomeReceives / WAN_DIGIT) || 0;
        //  智家数
        window.TotalSmartHome.innerText = data.TotalSmartHome || 0;


        //  家装合同额
        window.TotalFamilyDecorationContract.innerText = Math.round(data.TotalFamilyDecorationContract / WAN_DIGIT) || 0;
        //  家装套餐收款额
        window.TotalFamilyDecorationReceives.innerText = Math.round(data.TotalFamilyDecorationReceives / WAN_DIGIT) || 0;
        //  家装数
        window.TotalFamilyDecoration.innerText = data.TotalFamilyDecoration || 0;


    }

    //  累计销售冠军楼盘
    function _assignmentSalesChampion(_data) {
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
            return `${prev}<tr><td>${current}</td><td>${data[current].TotalHandBag}</td><td>${Math.round(data[current].TotalContract / WAN_DIGIT)}</td><td>${Math.round(data[current].TotalReceives / WAN_DIGIT)}</td></tr>`
        }, '');
    }
    ;(function () {
        _eventUpwardTriangleButtonClick();
        _eventSelectDate();
        _assignmentDate();
        //  去楼盘详情页
        ;(function () {
            const $detailData = $('#detailData');
            $detailData.on('click', function (e) {
                wxNavigateTo(PageUrlList.housingDetails, {name: '我是housingDetails'});
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
        requestCallback(mainData.data);

        //  请求数据
        function requestCallback(data) {
            console.log(data);
            /**
             * 赋值
             * */

            _assignmentYesterdaySalesVolume(data.YesterdayFamilyElectric, data.YesterdayFamilyProperty, data.YesterdaySmartHome, data.YesterdayFamilyDecoration);
            _assignmentRealEstateOnSale(data.yesterdayAndTotalSale, Object.keys(data.mapVillage).length);
            _assignmentSalesChampion(data.mapVillage['广州常春藤']);
            _assignmentNationalProjects(data.mapVillage);
            //  上面的折线统计图
            brokenLineDiagram1Fn();


            //  默认绘制扇形统计图
            pieDiagram1Fn(-1, data.yesterdayAndTotalSale);
            //  中国地图绘制
            drawChinaMap(-1,data.mapAddr);
            //  省份地图绘制
            drawProvinceMap();
        }
    }());
};

