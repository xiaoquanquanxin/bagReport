window.onload = function () {
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
            // console.log(data);
            /**
             * 赋值
             * */
            _assignmentYesterdaySalesVolume(data);

            //  上面的折线统计图
            brokenLineDiagram1Fn();
            //  默认绘制条形统计图
            pieDiagram1Fn();
            //  中国地图绘制
            drawChinaMap();
            //  省份地图绘制
            drawProvinceMap();

            //  累计销售冠军楼盘
            ;(function () {
                //  ul
                const $salesChampion = $('#salesChampion');
                //  区域
                const $salesVolumePillar = $salesChampion.find('.sales-volume-pillar');
                //  名称
                const $salesVolumeName = $salesChampion.find('.sales-volume-name');
                const data = [
                    {name: '家电套餐', sales: 0},
                    {name: '家私套餐', sales: 0},
                    {name: '智能套餐', sales: 10},
                    {name: '家装套餐', sales: 13},
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

            }());
        };
    }());

    // //  基础赋值
    // function basicAssignment() {
    //     _assignmentYesterdaySalesVolume();
    // }

    //  日期
    function _assignmentDate() {
        const date = getDate();
        dueDate.innerText = `${date.YEAR}/${completionZero(date.MONTH)}/${completionZero(date.DATE)} 24:00`;
    }

    //  昨日销量
    function _assignmentYesterdaySalesVolume(data) {
        console.log(data);
    }
};


const mainData = {
    "data": {
        "mapAddr": {
            "11": {"areaName": "11", "village": ["烦烦烦"], "totalValue": "0", "yesterdayValue": "0"},
            "121": {"areaName": "121", "village": ["太原紫藤公馆"], "totalValue": "102", "yesterdayValue": "0"},
            "北京市1": {
                "areaName": "北京市1",
                "village": ["员工特惠", "阿萨", "中山璟湖城", "北京市朝阳区东大桥路9号A座3层", "重庆蔷薇国际", "是对的"],
                "totalValue": "577",
                "yesterdayValue": "0"
            },
            "天津市": {"areaName": "天津市", "village": ["广州蔷薇花园"], "totalValue": "0", "yesterdayValue": "0"},
            "aa-11": {"areaName": "aa-11", "village": ["df"], "totalValue": "0", "yesterdayValue": "0"}
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
    }, "isSuccess": true
};


