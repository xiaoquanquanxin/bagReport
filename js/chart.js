const colorConfig = ['#F78988', '#EF5A66', '#F0A9AD', '#FCE3E9'];
//      各套包合同额占比
const proportionContractValuePackage = function (data) {
    return {
        color: colorConfig,
        animation: false,
        series: [
            {
                type: 'pie',
                roseType: 'radius',
                radius: [
                    window.innerWidth / 12,
                    window.innerWidth / 12 * 2.5,
                ],
                //  高亮
                legendHoverLink: false,
                //  是否在数据和为0
                stillShowZeroSum: false,
                //  最小的扇区角度
                minAngle: 2,
                data: data,
                //  提示文字
                label: {
                    formatter: [
                        //  数据
                        '{c|{c}%}',
                        //  数据名
                        '{b|{b}}'
                    ].join('\n'),
                    rich: {
                        c: {
                            color: '#FF6A6A',
                            lineHeight: 20,
                            fontSize: 16
                        },
                        b: {
                            color: '#FFFFFF',
                            fontSize: 9,
                            align: 'left',
                        },
                    }
                },
                //  视觉引导线
                labelLine: {
                    length2: 0,
                    lineStyle: {
                        type: 'dotted',
                        color: '#B1A6A8'
                    }
                },
            }
        ]
    };
};

//  各组合套包购买人数占比
const proportionNumberForCombinationPackage = function (data) {
    const n = 14;
    //  最多有多少列
    const interval = window.innerWidth > 374 ? 9 : 8;
    return {
        color: colorConfig,
        animation: false,
        legend: {
            data: ['仅家电', '家电家私', '家电家私智能', '其他'],
            textStyle: {color: '#FFFFFF', fontSize: 9},
            itemWidth: 8,
            itemHeight: 6,
            left: 0,
            borderRadius: 0,
            //  不交互
            selectedMode: false,
            top: 6,
        },
        grid: {
            left: 30,
            right: 0,
            bottom: 30,
            top: 50,
        },
        xAxis: [
            {
                type: 'category',
                data: ['10/32', '10/32', '10/32', '10/32', '10/32', '10/32', '10/32', '10/32', '10/32', '10/32', '10/32', '10/32', '10/32', '10/32'],
                //  轴线
                axisLine: {
                    lineStyle: {
                        color: '#564F50',
                        width: 0.33,
                    }
                },
                //  刻度
                axisTick: {
                    show: false,
                },
                //  坐标轴刻度标签
                axisLabel: {
                    color: '#D3CCCE',
                    fontSize: 7,
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                //  坐标轴刻度标签
                axisLabel: {
                    color: '#FFFFFF',
                    fontSize: 9,
                    margin: 28,
                    align: 'left',
                    formatter: function (value) {
                        return `${value}%`;
                    }
                },
                //  坐标线
                splitLine: {
                    lineStyle: {
                        color: '#564F50',
                        width: 0.33,
                    }
                },
            }
        ],
        series: [

            {
                name: '仅家电',
                type: 'bar',
                stack: '1',
                data: [10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40, 10, 20],
                barWidth: 10,
            },
            {
                name: '家电家私',
                type: 'bar',
                stack: '1',
                data: [20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30],
            },
            {
                name: '家电家私智能',
                type: 'bar',
                stack: '1',
                data: [40, 10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40, 10]
            },
            {
                name: '其他',
                type: 'bar',
                stack: '1',
                data: [30, 40, 10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40],
            },
        ],
        //  滚动
        dataZoom: [
            {
                animation: true,
                type: 'inside',
                zoomLock: true,
                realtime: false,
                start: 100 - (n > interval ? interval / n * 100 : 100),
                end: 100,
            }
        ],
    };
};

//  套餐销售数量
const packageSalesQuantity = function (data) {
    data = {
        "x": ["11.04", "11.11", "11.18", "11.25", "12.02", "12.09", "12.16", "12.23", "12.30", "01.06", "01.13", "01.20", "11.04", "11.11", "11.18", "11.25", "12.02", "12.09", "12.16", "12.23", "12.30", "01.06", "01.13", "01.20"],
        "v": ["24", "211", "280", "576", "397", "377", "341", "700", "727", "181", "255", "33", "24", "211", "280", "576", "397", "377", "341", "700", "727", "181", "255", "33"]
    };
    const n = data.x.length;
    //  最多有多少列
    const interval = window.innerWidth > 374 ? 15 : 14;
    return {
        animation: false,
        xAxis: {
            type: 'category',
            //  刻度文字
            axisLabel: {
                color: '#D3CCCE',
                fontSize: 7,
                rotate: 69,
            },
            //  纵坐标本身
            axisLine: {
                lineStyle: {
                    show: false,
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false
            },
            splitNumber: data.length,
            data: data.x,
            //  留白策略
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            //  刻度文字
            axisLabel: {
                color: '#FFFFFF',
                fontSize: 9,
                margin: 17,
            },
            axisLine: {
                lineStyle: {
                    type: 'dotted',
                    color: '#605A5B',
                    width: 0.5,
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#564F50',
                    width: 0.33,
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#564F50',
                    width: 0.33,
                },
                length: 10,
            },
        },
        series: [
            {
                type: 'line',
                //  平滑
                smooth: true,
                symbolSize: 3,
                sampling: 'average',
                symbol: 'circle',
                seriesLayoutBy: 'column',
                itemStyle: {
                    color: '#312D2E',
                    borderColor: '#DF5867',
                    borderWidth: 0.67,
                    shadowColor: 'rgba(224,126,126,0.3)',
                    shadowBlur: 1.33,
                },
                areaStyle: {
                    color: 'rgba(223,88,103,0.05)',
                },
                data: data.v,
                backgroundColor: 'green',
                lineStyle: {
                    width: 1,
                    color: '#DF5867',
                },
            }
        ],
        //  整体的位置
        grid: {
            top: 30,
            left: 40,
            right: 10,
            bottom: 30,
        },
        //  滚动
        dataZoom: [
            {
                animation: true,
                type: 'inside',
                zoomLock: true,
                realtime: false,
                start: 100 - (n > interval ? interval / n * 100 : 100),
                end: 100,
            }
        ],
    };
};

//  扇形统计图————各套包合同额占比
function pieDiagram1Fn() {
    const myChart = echarts.init(pieDiagram1);
    myChart.setOption(proportionContractValuePackage([
        {value: 49, name: '家装'},
        {value: 36, name: '智能'},
        {value: 33, name: '家私'},
        {value: 23, name: '家电'},
    ]));
}

//  条形统计图————各组合套包购买人数占比
function barDiagram1Fn() {
    const myChart = echarts.init(barDiagram1);
    myChart.setOption(proportionNumberForCombinationPackage());
}

//  折线统计图————套餐销售数量
function brokenLineDiagram1Fn() {
    const myChart = echarts.init(brokenLineDiagram1);
    myChart.setOption(packageSalesQuantity());
}