//  中国地图绘制
function drawChinaMap(data) {
    (function () {
        //  位置的信息，750px下
        const seriesData = [{
            name: '北京',
            value: -1,
        }, {
            name: '上海',
            value: -1,
        }, {
            name: '重庆',
            value: -1,
        }, {
            name: '河北',
            value: -1,
        }, {
            name: '辽宁',
            value: -1,
        }, {
            name: '黑龙江',
            value: -1,
        }, {
            name: '湖南',
            value: -1,
        }, {
            name: '安徽',
            value: -1,
        }, {
            name: '新疆',
            value: -1,
        }, {
            name: '江苏',
            value: -1,
        }, {
            name: '浙江',
            value: -1,
        }, {
            name: '江西',
            value: -1,
        }, {
            name: '广西',
            value: -1,
        }, {
            name: '甘肃',
            value: -1,
        }, {
            name: '内蒙古',
            value: -1,
        }, {
            name: '陕西',
            value: -1,
        }, {
            name: '吉林',
            value: -1,
        }, {
            name: '福建',
            value: -1,
        }, {
            name: '贵州',
            value: -1,
        }, {
            name: '青海',
            value: -1,
        }, {
            name: '西藏',
            value: -1,
        }, {
            name: '宁夏',
            value: -1,
        }, {
            name: '海南',
            value: -1,
        }, {
            name: '台湾',
            value: -1,
        }, {
            name: '香港',
            value: -1,
        }, {
            name: '澳门',
            value: -1,
        },
            {
                name: '河南',
                value: 0,
                position: [255, 85],
                village: ['广州常春藤', '中山京沪城', '遵义蔷薇国际'],
            }, {
                name: '山西',
                value: 111,
                position: [245, 65],
                village: ['广州常春藤', '中山京沪城', '遵义蔷薇国际'],
            }, {
                name: '湖北',
                value: 0,
                position: [255, 115],
                village: ['广州常春藤', '中山京沪城', '遵义蔷薇国际'],
            }, {
                name: '四川',
                value: 111,
                position: [200, 110],
                village: ['广州常春藤', '中山京沪城', '遵义蔷薇国际'],
            }, {
                name: '云南',
                value: 999,
                position: [195, 150],
                village: ['广州常春藤', '中山京沪城', '遵义蔷薇国际'],
            }, {
                name: '天津',
                value: 111,
                position: [275, 55],
                village: ['广州常春藤', '中山京沪城', '遵义蔷薇国际'],
            }, {
                name: '山东',
                value: 111,
                position: [275, 70],
                village: ['广州常春藤', '中山京沪城', '遵义蔷薇国际'],
            }, {
                name: '广东',
                value: 1600,
                position: [250, 165],
                village: ['广州常春藤', '中山京沪城', '遵义蔷薇国际'],
            },];

        //  颜色配置
        const visualMapColor = [
            '#D75E68',
            '#B05C5C',
            '#7D6464',
            '#858383',
            '#4A4647',
        ];

        //  格式化系列数据
        function formattingSeriesData(data) {
            //  屏幕宽度比例
            const WINDOW_WIDTH_RATE = window.innerWidth / (750 / 2);
            return data.map(function (item) {
                //  区域的颜色
                let areaColor = null;
                if (item.value > 1000) {
                    areaColor = visualMapColor[0];
                } else if (item.value > 500) {
                    areaColor = visualMapColor[1];
                } else if (item.value > 0) {
                    areaColor = visualMapColor[2];
                } else if (item.value === 0) {
                    areaColor = visualMapColor[3];
                } else if (item.value < 0) {
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
                    console.log(item.position);
                }
                return item;
            })
        }

        //  地图配置
        function getChinaMapOption(seriesData) {
            //  重新计算的数据
            const _seriesData = formattingSeriesData(seriesData);
            console.log(_seriesData);
            return {
                backgroundColor: '#312D2E',
                // backgroundColor: 'lightblue',
                //  弹框
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        // console.clear();
                        if (params.data.village) {
                            console.log(params.data.village);
                            const arr = params.data.village.map(function (item, index) {
                                if (index === 0) {
                                    return `<div class="map-tooltip cFF6C78 font10">${item}</div>`;
                                }
                                return `<div class="map-tooltip c858081 font10">${item}</div>`;
                            });
                            arr.push('<div class="map-tooltip-triangle"></div>');
                            return arr.join('');
                        }
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
                    bottom: 10,
                    left: 10,
                    itemWidth: 9,
                    itemHeight: 4,
                    textStyle: {
                        color: '#fff',
                        fontSize: 8,
                    },
                    padding: 0,
                    pieces: [
                        {value: -1, max: -Infinity, label: '-'},
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
                    // center: [100.97, 38.71],
                    roam: false,
                    data: _seriesData,
                    itemStyle: {
                        borderColor: "#312D2E",
                    }
                }],
            }
        }

        const myChart = echarts.init(chinaMap);
        setTimeout(function () {
            myChart.setOption(getChinaMapOption(seriesData));
        })
    }())
};

//  某个省份的地图绘制
