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
            textStyle: {color: '#FFFFFF'},
            itemWidth: 8,
            itemHeight: 6,
            left: 0,
            borderRadius: 0,
            //  不交互
            selectedMode: false,
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
                    }
                },
                //  刻度
                axisTick: {
                    show: false,
                },
                //  坐标轴刻度标签
                axisLabel: {
                    color: '#D3CCCE',
                    fontSize: 9,
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

//  扇形统计图————各套包合同额占比
function pieDiagram1Fn() {
    const myChart = echarts.init(pieDiagram1);
    myChart.setOption(proportionContractValuePackage([
        {value: 23, name: '家电'},
        {value: 33, name: '家私'},
        {value: 36, name: '智能'},
        {value: 49, name: '家装'},
    ]));
}

//  条形统计图————各组合套包购买人数占比
function barDiagram1Fn() {
    const myChart = echarts.init(barDiagram1);
    myChart.setOption(proportionNumberForCombinationPackage());
}