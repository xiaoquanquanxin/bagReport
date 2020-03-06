//  中国地图绘制
/**
 * @param:markValue 标记值，-1昨日，1总的
 * @param:data 数据
 * */
function drawChinaMap(markValue, data) {
    console.log(data);
    //  自绑定一下数据哈
    data = data || drawChinaMap.data;
    drawChinaMap.data = data;
    //  基础数据
    const seriesData = (function () {
        return [{
            name: '北京',
            spell: 'beijing',
            value: -1,
            position: [100, 100],
        }, {
            name: '上海',
            spell: 'shanghai',
            value: -1,
        }, {
            name: '重庆',
            spell: 'chongqing',
            value: -1,
        }, {
            name: '河北',
            spell: 'hebei',
            value: -1,
        }, {
            name: '辽宁',
            spell: 'liaoning',
            value: -1,
        }, {
            name: '黑龙江',
            spell: 'heilongjiang',
            value: -1,
        }, {
            name: '湖南',
            spell: 'hunan',
            value: -1,
        }, {
            name: '安徽',
            spell: 'anhui',
            value: -1,
        }, {
            name: '新疆',
            spell: 'xinjiang',
            value: -1,
        }, {
            name: '江苏',
            spell: 'jiangsu',
            value: -1,
        }, {
            name: '浙江',
            spell: 'zhejiang',
            value: -1,
        }, {
            name: '江西',
            spell: 'jiangxi',
            value: -1,
        }, {
            name: '广西',
            spell: 'guangxi',
            value: -1,
        }, {
            name: '甘肃',
            spell: 'gansu',
            value: -1,
        }, {
            name: '内蒙古',
            spell: 'neimenggu',
            value: -1,
        }, {
            name: '陕西',
            spell: 'shanxi1',
            value: -1,
        }, {
            name: '吉林',
            spell: 'jilin',
            value: -1,
        }, {
            name: '福建',
            spell: 'fujian',
            value: -1,
        }, {
            name: '贵州',
            spell: 'guizhou',
            value: -1,
        }, {
            name: '青海',
            spell: 'qinghai',
            value: -1,
        }, {
            name: '西藏',
            spell: 'xizang',
            value: -1,
        }, {
            name: '宁夏',
            spell: 'ningxia',
            value: -1,
        }, {
            name: '海南',
            spell: 'hainan',
            value: -1,
        }, {
            name: '台湾',
            spell: 'taiwan',
            value: -1,
        }, {
            name: '香港',
            spell: 'xianggang',
            value: -1,
        }, {
            name: '澳门',
            spell: 'aomen',
            value: -1,
        }, {
            name: '河南',
            spell: 'henan',
            value: -1,
            position: [255, 85],
        }, {
            name: '山西',
            spell: 'shanxi',
            value: -1,
            position: [245, 65],
        }, {
            name: '湖北',
            spell: 'hubei',
            value: -1,
            position: [255, 115],
        }, {
            name: '四川',
            spell: 'sichuan',
            value: -1,
            position: [200, 110],
        }, {
            name: '云南',
            spell: 'yunnan',
            value: -1,
            position: [195, 150],
        }, {
            name: '天津',
            spell: 'tianjin',
            value: -1,
            position: [275, 55],
        }, {
            name: '山东',
            spell: 'shandong',
            value: -1,
            position: [275, 70],
        }, {
            name: '广东',
            spell: 'guangdong',
            value: -1,
            position: [250, 165],
        }];
    }());
    //  映射,key：城市 ，value：省名
    const seriesMap = {
        '11': '广东',
        '121': '山西',
        'aa-11': '四川',
        '北京市1': '北京',
        '天津市': '天津',
    };
    Object.keys(seriesMap).forEach(function (item) {
        seriesData.forEach(function (it) {
            if (seriesMap[item] === it.name) {
                const DATA_ITEM = data[item];
                it.areaName = DATA_ITEM.areaName;
                it.village = DATA_ITEM.village;
                it.totalValue = Number(DATA_ITEM.totalValue);
                it.yesterdayValue = Number(DATA_ITEM.yesterdayValue);
                switch (markValue) {
                    case -1:
                        it.value = it.yesterdayValue;
                        break;
                    case  1:
                        it.value = it.totalValue;
                        break;
                    default:
                        throw  new Error('formattingSeriesData - xx');
                }
                // console.log(it.value);
            }
        })
    });
    console.log(seriesData);
    (function () {
        //  颜色配置
        const visualMapColor = [
            '#D75E68',
            '#B05C5C',
            '#7D6464',
            '#858383',
            '#3A3637',
        ];

        //  格式化系列数据
        function formattingSeriesData(data) {
            //  屏幕宽度比例
            const WINDOW_WIDTH_RATE = window.innerWidth / (750 / 2);
            return data.map(function (item) {
                //  区域的颜色
                let areaColor = null;
                //  用于比较的值
                let compareValue = item.value;
                if (compareValue > 1000) {
                    areaColor = visualMapColor[0];
                } else if (compareValue > 500) {
                    areaColor = visualMapColor[1];
                } else if (compareValue > 0) {
                    areaColor = visualMapColor[2];
                } else if (compareValue === 0) {
                    areaColor = visualMapColor[3];
                } else if (compareValue < 0) {
                    areaColor = visualMapColor[4];
                }
                //  色块
                item.itemStyle = {
                    normal: {areaColor: areaColor},
                    emphasis: {areaColor: areaColor},
                };
                //  文字
                item.label = {
                    normal: {
                        show: item.value >= 0,
                        textStyle: {color: "#E0E0E0", fontSize: 6},
                    },
                    emphasis: {
                        show: item.value >= 0,
                        textStyle: {color: "#E0E0E0", fontSize: 8},
                    }
                };
                //  如果有小区，才弹框
                if (item.village) {
                    item.position = item.position.map(function (item) {
                        return item * WINDOW_WIDTH_RATE;
                    });
                    // console.log(item.position);
                }
                return item;
            })
        }

        //  地图配置
        function getChinaMapOption(seriesData) {
            //  重新计算的数据
            const _seriesData = formattingSeriesData(seriesData);
            // console.log(_seriesData);
            return {
                backgroundColor: '#312D2E',
                // backgroundColor: 'lightblue',
                //  弹框
                tooltip: {
                    //  允许操作
                    enterable: true,
                    trigger: 'item',
                    formatter: function (params) {
                        // console.clear();
                        // console.log(params);
                        const villages = params.data.village;
                        params.data.village[0] = '广州常春藤';
                        if (villages) {
                            // console.log(params.data.village);
                            //  是否 mapChooseVillageName.innerText 对应某个楼盘
                            let hasChooseVillage = false;
                            const arr = villages.map(function (item, index) {
                                //  如果有对应的，楼盘，设置颜色
                                if (item === mapChooseVillageName.innerText) {
                                    hasChooseVillage = true;
                                    return `<div class="map-tooltip cFF6C78 font10">${item}</div>`;
                                }
                                return `<div class="map-tooltip c858081 font10">${item}</div>`;
                            });
                            //  如果没有对应楼盘
                            if (!hasChooseVillage) {
                                arr[0] = `<div class="map-tooltip cFF6C78 font10">${villages[0]}</div>`;
                                //  被选中的那个小区，应该把这个数据渲染到省份那里
                                const village = requestData.mapVillage[villages[0]];
                                console.log(village);
                            }
                            arr.push('<div class="map-tooltip-triangle"></div>');
                            return arr.join('');
                        }
                        // $('*').css({
                        //     'pointer-events': 'all',
                        // })
                        return '';
                    },

                    backgroundColor: '#FFFFFF',
                    borderRadius: 0,
                    extraCssText: 'box-shadow: 0 3px 0  #D75E68;',
                    position: function (point, params) {
                        // console.clear();
                        // console.log(point, params);
                        if (params.data && params.data.position) {
                            return params.data.position;
                        }
                        const arr = [];
                        arr[0] = point[0] + 30;
                        arr[1] = point[1] - 30;
                        return arr;
                    },
                    // position:'bottom',
                },
                //  地图映射
                visualMap: {
                    itemGap: 5,
                    bottom: 10,
                    left: 24,
                    itemWidth: 9,
                    itemHeight: 4,
                    textStyle: {
                        color: '#858081',
                        fontSize: 8,
                    },
                    padding: 0,
                    pieces: [
                        {value: -1, max: -Infinity, label: '无项目'},
                        {value: 0, label: '无销售'},
                        {min: 1, max: 500, label: '<500万'},
                        {min: 500, max: 1000, label: '500万-1000万'},
                        {min: 1000, label: '1000万-9000万'},
                    ],
                    selectedMode: 'multiple',
                    color: visualMapColor,

                    //  鼠标浮在上面
                    hoverLink: false,
                    //  反转
                    inverse: true,
                    //  不管当前是谁，返回数组里的数
                    // formatter: function (value1, value2) {
                    //     console.log(value1, value2);
                    //     return visualMapTextList.splice(0, 1);
                    // },
                    // formatter: function (value1,value2) {
                    //     console.log(value1,value2);
                    //
                    //     switch (value1) {
                    //         case 0:
                    //             return visualMapTextList[0];
                    //         case 2250:
                    //             return visualMapTextList[1];
                    //         case 4500:
                    //             return visualMapTextList[2];
                    //         case 6750:
                    //             return visualMapTextList[3];
                    //         // default :
                    //         //     throw  new Error('xx');
                    //     }
                    // }

                    // splitNumber: 4,
                    // min: -1,
                    // max: 4,
                    // categories: visualMapTextList,

                },
                series: [{
                    //  小球？
                    showLegendSymbol: true,
                    type: 'map',
                    map: 'china',
                    zoom: 1,
                    top: 0,
                    bottom: 0,
                    // center: [100.97, 38.71],,
                    data: _seriesData,
                    roam: false,
                    itemStyle: {
                        borderColor: "#312D2E",
                    }
                }],
            }
        }

        const myChart = echarts.init(chinaMap);
        myChart.setOption(getChinaMapOption(seriesData));
        const mychartEvent = echarts.init(chinaMap);
        mychartEvent.on('click', function (params) {
            //  过滤不交互的省份
            if (params.data.value === -1) {
                return;
            }
            // console.log(params.data.spell, params.data.name);
            drawProvinceMap(params.data.spell, params.data.name);
        });
    }());
}

//  地图
const $chinaMap = $('#chinaMap');
//  地图点出来的mapTOolTip，点击某个楼盘
$chinaMap.on('click', function (e) {
    const $target = $(e.target);
    //  如果不是map-tooltip
    if (!$target.hasClass('map-tooltip')) {
        return;
    }
    //  移除高亮
    $target.siblings('.cFF6C78').removeClass('cFF6C78').addClass('c858081');
    //  设置高亮
    $target.addClass('cFF6C78');


    //  被选中的那个小区，应该把这个数据渲染到省份那里
    const villageName = $target.text();
    const village = requestData.mapVillage[villageName];

    //  昨天？总的？
    const dateValue = $chinaMap.parents('section').find('.select-date').data('value');

    // debugger;
    //  用于渲染的数据
    const aimData = {name: villageName};
    getVillageRenderData(aimData, village, dateValue);
    // console.log(aimData);
    //  设置省份楼盘的数据
    _assignmentProvincialRealEstate(aimData);
    //  隐藏父级
    $target.parent('div').hide();
});


//  某个省份的地图绘制
function drawProvinceMap(provinceSpell, provinceName,) {
    provinceSpell = provinceSpell || 'guangdong';
    provinceName = provinceName || '广东';
    loadJs(`./js/mapData/province/${provinceSpell}.js`, provinceSpell, true, function () {
        const option = getProvinceMapOption(provinceName);
        const myChart = echarts.init(provinceMap);
        myChart.setOption(option);
    });
}

//  省份配置
function getProvinceMapOption(provinceName) {
    return {
        series: [
            {
                type: 'map',
                mapType: provinceName,
                data: [],
                top: 0,
                bottom: 0,
                //  不交互的
                silent: true,
                itemStyle: {
                    normal: {
                        areaColor: "#4A4647",
                    },
                },
            }
        ],
    };
}


//  更加楼盘名，算他在哪个省
function getProvinceByVillage(villageName) {
    // console.log(villageName);
}

/**
 *  获取冠军楼盘
 * @param:markValue 标记值，-1昨日，1总的
 * @param:data 数据
 * */
function getChampionVillage(markValue) {
    const arr = [];
    Object.keys(requestData.mapVillage).forEach(function (item) {
        const data = {
            name: item,
        };
        const ITEM = requestData.mapVillage[item];
        getVillageRenderData(data, ITEM, markValue);
        // console.log(ITEM.TotalRoom, ITEM.YesterdayRoom );
        arr.push(data);
    });
    return arr.sort(function (a, b) {
        return b.__contractValue - a.__contractValue;
    })[0];
}

//  获取楼盘数据，用于渲染省份哪里的字段
/**
 * @param:aimData 目标对象
 * @param:originData 原对象，从上面抽取值
 * @param:markValue 昨天：-1 总的：1
 * */
function getVillageRenderData(aimData, originData, markValue) {
    markValue = markValue || -1;
    switch (markValue) {
        case -1:
            //  拎包认购数
            aimData.__room = originData.YesterdayRoom || 0;
            //  拎包合同额
            aimData.__contractValue = originData.YesterdayContract || 0;
            //  拎包收款额
            aimData.__receives = originData.YesterdayReceives || 0;
            break;
        case 1:
            aimData.__contractValue = originData.TotalContract || 0;
            aimData.__room = originData.TotalRoom || 0;
            aimData.__receives = originData.TotalReceives || 0;
            break;
        default :
    }
}
