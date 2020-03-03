window.onload = function () {
    ;(function () {
        // debugger
        // addProfessionJs(a);
        // addProfessionJs(b);
        // addProfessionJs(c);
        // addProfessionJs(d);
        // addProfessionJs(e);
        a();
        b();
        c();
        d();
        e();
        f();
        g();

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

        //  带有向上三角的大按块————切换canvas
        function b() {
            const $barChartControl = $('.bar-chart-control');
            // console.log($barChartControl);
            $barChartControl.on('click', function (e) {
                const $target = $(e.target);
                console.log($target);
                console.log($target.data('bind-fn'));
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

        //  日期选择
        function c() {
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
            });
            //  日期选择的默认位置
            const $defaultDate = $selectDate.find('.default-date');
            $defaultDate.on('click', function (e) {
                $(this).parents().addClass('select-date-open');
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
            // const arr = [
            //     {name: '家私', num: 40},
            //     {name: '家私', num: 30},
            //     {name: '家私', num: 20},
            //     {name: '家私', num: 10}];
            //
            // const arr = [
            //     {name: '家私', num: 90},
            //     {name: '家私', num: 7},
            //     {name: '家私', num: 2},
            //     {name: '家私', num: 1}];
            // const arr = [
            //     {name: '家私', num: 30},
            //     {name: '家私', num: 28},
            //     {name: '家私', num: 22},
            //     {name: '家私', num: 20}];
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

        //  累计销售冠军楼盘
        function g() {
            //  ul
            const $salesChampion = $('#salesChampion');
            //  区域
            const $salesVolumePillar = $salesChampion.find('.sales-volume-pillar');
            //  名称
            const $salesVolumeName = $salesChampion.find('.sales-volume-name');

            const data = [
                {name: '家电套餐', sales: 0},
                {name: '家私套餐', sales: 0},
                {name: '智能套餐', sales: 0},
                {name: '家装套餐', sales: 1},
            ];
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
                console.log(borderWidth);
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

        //  请求数据
        (function f1() {
            pieDiagram1Fn();
            brokenLineDiagram1Fn();
        }());
    }());
};

const mainData = {
    "mapAddr": {
        "11": ["烦烦烦"],
        "121": ["太原紫藤公馆"],
        "北京市1": ["员工特惠", "阿萨", "中山璟湖城", "北京市朝阳区东大桥路9号A座3层", "重庆蔷薇国际", "是对的"],
        "天津市": ["广州蔷薇花园"],
        "aa-11": ["df"]
    },
    "mapVillage": {
        "广州常春藤": {
            "TotalHandBag": "951",
            "TotalContract": 34020000.00,
            "TotalReceives": 10512000.00,
            "TotalFamilyElectric": "348",
            "TotalFamilyElectricContract": 13410000.00,
            "TotalFamilyElectricReceives": 4074000.00,
            "TotalFamilyProperty": "349",
            "TotalFamilyPropertyContract": 13410000.00,
            "TotalFamilyPropertyReceives": 4074000.00,
            "TotalSmartHome": "254",
            "TotalSmartHomeContract": 7200000.00,
            "TotalSmartHomeReceives": 2364000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "重庆蔷薇国际": {
            "TotalHandBag": "577",
            "TotalContract": 17270000.00,
            "TotalReceives": 4278000.00,
            "TotalFamilyElectric": "424",
            "TotalFamilyElectricContract": 12570000.00,
            "TotalFamilyElectricReceives": 3180000.00,
            "TotalFamilyProperty": "145",
            "TotalFamilyPropertyContract": 4320000.00,
            "TotalFamilyPropertyReceives": 918000.00,
            "TotalSmartHome": "6",
            "TotalSmartHomeContract": 180000.00,
            "TotalSmartHomeReceives": 60000.00,
            "TotalFamilyDecoration": "2",
            "TotalFamilyDecorationContract": 200000.00,
            "TotalFamilyDecorationReceives": 120000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "安阳紫薇公馆": {
            "TotalHandBag": "72",
            "TotalContract": 2160000.00,
            "TotalReceives": 864000.00,
            "TotalFamilyElectric": "72",
            "TotalFamilyElectricContract": 2160000.00,
            "TotalFamilyElectricReceives": 864000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "广州蔷薇国际": {
            "TotalHandBag": "476",
            "TotalContract": 10230000.00,
            "TotalReceives": 5778000.00,
            "TotalFamilyElectric": "252",
            "TotalFamilyElectricContract": 5340000.00,
            "TotalFamilyElectricReceives": 3081000.00,
            "TotalFamilyProperty": "212",
            "TotalFamilyPropertyContract": 4530000.00,
            "TotalFamilyPropertyReceives": 2559000.00,
            "TotalSmartHome": "12",
            "TotalSmartHomeContract": 360000.00,
            "TotalSmartHomeReceives": 138000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "惠州常春藤": {
            "TotalHandBag": "259",
            "TotalContract": 8050000.00,
            "TotalReceives": 1868000.00,
            "TotalFamilyElectric": "254",
            "TotalFamilyElectricContract": 7620000.00,
            "TotalFamilyElectricReceives": 1782000.00,
            "TotalFamilyProperty": "1",
            "TotalFamilyPropertyContract": 30000.00,
            "TotalFamilyPropertyReceives": 6000.00,
            "TotalFamilyDecoration": "4",
            "TotalFamilyDecorationContract": 400000.00,
            "TotalFamilyDecorationReceives": 80000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "昆明花鹤翎": {
            "TotalHandBag": "130",
            "TotalContract": 3690000.00,
            "TotalReceives": 1062000.00,
            "TotalFamilyElectric": "130",
            "TotalFamilyElectricContract": 3690000.00,
            "TotalFamilyElectricReceives": 1062000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "惠州木槿雅著": {
            "TotalHandBag": "87",
            "TotalContract": 2890000.00,
            "TotalReceives": 650000.00,
            "TotalFamilyElectric": "83",
            "TotalFamilyElectricContract": 2490000.00,
            "TotalFamilyElectricReceives": 570000.00,
            "TotalFamilyDecoration": "4",
            "TotalFamilyDecorationContract": 400000.00,
            "TotalFamilyDecorationReceives": 80000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "天津海棠雅著": {
            "TotalHandBag": "103",
            "TotalContract": 3300000.00,
            "TotalReceives": 732000.00,
            "TotalFamilyElectric": "62",
            "TotalFamilyElectricContract": 1860000.00,
            "TotalFamilyElectricReceives": 420000.00,
            "TotalFamilyProperty": "32",
            "TotalFamilyPropertyContract": 960000.00,
            "TotalFamilyPropertyReceives": 216000.00,
            "TotalSmartHome": "6",
            "TotalSmartHomeContract": 180000.00,
            "TotalSmartHomeReceives": 36000.00,
            "TotalFamilyDecoration": "3",
            "TotalFamilyDecorationContract": 300000.00,
            "TotalFamilyDecorationReceives": 60000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "太原紫藤公馆": {
            "TotalHandBag": "102",
            "TotalContract": 3060000.00,
            "TotalReceives": 1296000.00,
            "TotalFamilyElectric": "59",
            "TotalFamilyElectricContract": 1770000.00,
            "TotalFamilyElectricReceives": 876000.00,
            "TotalFamilyProperty": "41",
            "TotalFamilyPropertyContract": 1230000.00,
            "TotalFamilyPropertyReceives": 408000.00,
            "TotalSmartHome": "2",
            "TotalSmartHomeContract": 60000.00,
            "TotalSmartHomeReceives": 12000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "周口九里香堤": {
            "TotalHandBag": "130",
            "TotalContract": 3750000.00,
            "TotalReceives": 906000.00,
            "TotalFamilyElectric": "74",
            "TotalFamilyElectricContract": 2145000.00,
            "TotalFamilyElectricReceives": 519000.00,
            "TotalFamilyProperty": "52",
            "TotalFamilyPropertyContract": 1500000.00,
            "TotalFamilyPropertyReceives": 360000.00,
            "TotalSmartHome": "4",
            "TotalSmartHomeContract": 105000.00,
            "TotalSmartHomeReceives": 27000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "遵义蔷薇国际": {
            "TotalHandBag": "291",
            "TotalContract": 8670000.00,
            "TotalReceives": 2400000.00,
            "TotalFamilyElectric": "248",
            "TotalFamilyElectricContract": 7380000.00,
            "TotalFamilyElectricReceives": 2040000.00,
            "TotalFamilyProperty": "41",
            "TotalFamilyPropertyContract": 1230000.00,
            "TotalFamilyPropertyReceives": 336000.00,
            "TotalSmartHome": "2",
            "TotalSmartHomeContract": 60000.00,
            "TotalSmartHomeReceives": 24000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "天津蔷薇国际": {
            "TotalHandBag": "246",
            "TotalContract": 7380000.00,
            "TotalReceives": 1662000.00,
            "TotalFamilyElectric": "122",
            "TotalFamilyElectricContract": 3660000.00,
            "TotalFamilyElectricReceives": 810000.00,
            "TotalFamilyProperty": "117",
            "TotalFamilyPropertyContract": 3510000.00,
            "TotalFamilyPropertyReceives": 774000.00,
            "TotalSmartHome": "7",
            "TotalSmartHomeContract": 210000.00,
            "TotalSmartHomeReceives": 78000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "成都海棠名著": {
            "TotalHandBag": "442",
            "TotalContract": 12270000.00,
            "TotalReceives": 4488000.00,
            "TotalFamilyElectric": "277",
            "TotalFamilyElectricContract": 7430000.00,
            "TotalFamilyElectricReceives": 3022000.00,
            "TotalFamilyProperty": "159",
            "TotalFamilyPropertyContract": 4670000.00,
            "TotalFamilyPropertyReceives": 1426000.00,
            "TotalSmartHome": "6",
            "TotalSmartHomeContract": 170000.00,
            "TotalSmartHomeReceives": 40000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "遵义君兰国际": {
            "TotalHandBag": "206",
            "TotalContract": 6180000.00,
            "TotalReceives": 1416000.00,
            "TotalFamilyElectric": "108",
            "TotalFamilyElectricContract": 3240000.00,
            "TotalFamilyElectricReceives": 768000.00,
            "TotalFamilyProperty": "98",
            "TotalFamilyPropertyContract": 2940000.00,
            "TotalFamilyPropertyReceives": 648000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "三亚海棠之星": {
            "TotalHandBag": "8",
            "TotalContract": 480000.00,
            "TotalReceives": 96000.00,
            "TotalFamilyProperty": "4",
            "TotalFamilyPropertyContract": 240000.00,
            "TotalFamilyPropertyReceives": 48000.00,
            "TotalSmartHome": "4",
            "TotalSmartHomeContract": 240000.00,
            "TotalSmartHomeReceives": 48000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "青岛蔷薇国际": {
            "TotalHandBag": "127",
            "TotalContract": 4830000.00,
            "TotalReceives": 1062000.00,
            "TotalFamilyElectric": "109",
            "TotalFamilyElectricContract": 3720000.00,
            "TotalFamilyElectricReceives": 816000.00,
            "TotalFamilyProperty": "18",
            "TotalFamilyPropertyContract": 1110000.00,
            "TotalFamilyPropertyReceives": 246000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "荆门紫薇雅著": {
            "TotalHandBag": "57",
            "TotalContract": 1710000.00,
            "TotalReceives": 396000.00,
            "TotalFamilyElectric": "48",
            "TotalFamilyElectricContract": 1440000.00,
            "TotalFamilyElectricReceives": 342000.00,
            "TotalFamilyProperty": "8",
            "TotalFamilyPropertyContract": 240000.00,
            "TotalFamilyPropertyReceives": 48000.00,
            "TotalSmartHome": "1",
            "TotalSmartHomeContract": 30000.00,
            "TotalSmartHomeReceives": 6000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        },
        "黄冈蔷薇国际": {
            "TotalHandBag": "108",
            "TotalContract": 3240000.00,
            "TotalReceives": 1014000.00,
            "TotalFamilyElectric": "108",
            "TotalFamilyElectricContract": 3240000.00,
            "TotalFamilyElectricReceives": 1014000.00,
            "ConversionRate": 0.0,
            "MarginRate": 0.0
        }
    },
    "yesterdayAndTotalSale": {
        "TotalHandBag": "4372",
        "TotalContract": 133180000.00,
        "TotalReceives": 40480000.00,
        "TotalFamilyElectric": "2778",
        "TotalFamilyElectricContract": 83165000.00,
        "TotalFamilyElectricReceives": 25240000.00,
        "TotalFamilyProperty": "1277",
        "TotalFamilyPropertyContract": 39920000.00,
        "TotalFamilyPropertyReceives": 12067000.00,
        "TotalSmartHome": "304",
        "TotalSmartHomeContract": 8795000.00,
        "TotalSmartHomeReceives": 2833000.00,
        "TotalFamilyDecoration": "13",
        "TotalFamilyDecorationContract": 1300000.00,
        "TotalFamilyDecorationReceives": 340000.00,
        "ConversionRate": 0.0,
        "MarginRate": 0.0
    }
};