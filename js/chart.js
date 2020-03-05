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
    // const interval = window.innerWidth > 374 ? 10 : 9;
    const interval = 14;
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
                    interval: 0,
                },
                //  留白策略
                boundaryGap: ['20%', '20%'],
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
    //  最大值
    const MAX_VALUE = Math.max.apply(null, data.v);
    // console.log(MAX_VALUE);
    //  最大值的位数
    const MAX_VALUE_DIGIT = Math.abs(Math.ceil(MAX_VALUE)).toString().length;
    //  十的几次方
    const DV = Math.pow(10, MAX_VALUE_DIGIT - 1);
    //  最大值+最大位数*1
    const UP_VALUE = (Math.floor(Math.ceil(MAX_VALUE) / DV) + 1) * DV;
    // console.log(UP_VALUE);
    const n = data.x.length;
    //  最多有多少列
    const interval = 18;
    return {
        animation: false,
        xAxis: {
            type: 'category',
            //  刻度文字
            axisLabel: {
                color: '#D3CCCE',
                fontSize: 7,
                rotate: 69,
                interval: 0,
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
        //  事件
        tooltip: {
            //  触发类型
            trigger: 'axis',
            //  坐标轴指示器配置项。
            axisPointer: {
                // type: 'none',
                // label: {
                //     show: true,
                // },
                lineStyle: {
                    color: '#564F50',
                    width: 0.5,
                }
            },
            //  是否将 tooltip 框限制在图表的区域内。
            confine: true,
            //  位置
            position: function (points, params, dom, rect, size) {
                // console.log(points, params, dom, rect, size);
                const arr = [];
                //  x轴位置 === 鼠标位置-dom元素位置宽度
                arr[0] = (points[0] - size.contentSize[0] / 2);
                arr[1] = points[1];
                return arr;
                //  y轴位置 === chart高度*（当前元素值/最大高度）- grid.top - grid.bottom
                arr[1] = (size.viewSize[1] - 30 - 30) * (1 - (params[0].data / UP_VALUE));
                // console.log(arr);
                console.log(dom, size);
                return arr;

                //  三角形
                const $underTriangle = $(`<div></div>`);
                const _width = size.contentSize[0] / 5;
                $underTriangle.css({
                    backgroundColor: '#DF5867',
                    position: 'absolute',
                    bottom: `${-_width / 2}px`,
                    left: `50%`,
                    marginLeft: `${-_width / 2}px`,
                    width: `${_width}px`,
                    height: `${_width}px`,
                    transformOrigin: 'center center',
                    transform: 'rotate(45deg)',
                });
                $(dom).append($underTriangle);
                // window.aa = dom

            },
            formatter: '{c}',
            backgroundColor: '#DF5867',
            textStyle: {
                fontSize: 9,
            },
            padding: [0, 5],
        }
    };
};

/**
 * 扇形统计图————各套包合同额占比
 * @param:markValue 标记值，-1昨日，1总的
 * @param:data 数据
 * */
function pieDiagram1Fn(value, data) {
    //  自绑定一下数据哈
    data = data || pieDiagram1Fn.data;
    pieDiagram1Fn.data = data;
    const myChart = echarts.init(pieDiagram1);
    //  数据
    const list = [];
    //  总金额
    let TOTAL_CONTRACT;
    switch (value) {
        case -1:
            list.push({value: data.YesterdayFamilyDecorationContract || 0, name: '家装'});
            list.push({value: data.YesterdaySmartHomeContract || 0, name: '智能'});
            list.push({value: data.YesterdayFamilyPropertyContract || 0, name: '家私'});
            list.push({value: data.YesterdayFamilyElectricContract || 0, name: '家电'});
            TOTAL_CONTRACT = data.YesterdayContract || 0;
            break;
        case 1:
            list.push({value: data.TotalFamilyDecorationContract || 0, name: '家装'});
            list.push({value: data.TotalSmartHomeContract || 0, name: '智能'});
            list.push({value: data.TotalFamilyPropertyContract || 0, name: '家私'});
            list.push({value: data.TotalFamilyElectricContract || 0, name: '家电'});
            TOTAL_CONTRACT = data.TotalContract || 0;
            break;
        default :
            throw new Error('pieDiagram1Fn - value');
    }

    // console.log(list, TOTAL_CONTRACT);
    //  计算比例
    list.forEach(function (item) {
        const VALUE = Math.round(item.value / TOTAL_CONTRACT * 100);
        item.value = isNaN(VALUE) ? 0 : VALUE;
        if (TOTAL_CONTRACT === 0) {
            item.value = 25;
        }
    });
    console.table(list);
    myChart.setOption(proportionContractValuePackage(list.sort(function (a, b) {
        return b.value - a.value;
    })));
}

//  条形统计图————各组合套包购买人数占比
function barDiagram1Fn() {
    const myChart = echarts.init(barDiagram1);
    myChart.setOption(proportionNumberForCombinationPackage());
}

//  折线统计图————套餐销售数量
function brokenLineDiagram1Fn() {
    const myChart = echarts.init(brokenLineDiagram1);
    myChart.setOption(packageSalesQuantity(
        {
            "x": ["11.04", "11.11", "11.18", "11.25", "12.02", "12.09", "12.16", "12.23", "12.30", "01.06", "01.13", "01.20", "11.04", "11.11", "11.18", "11.25", "12.02", "12.09", "12.16", "12.23", "12.30", "01.06", "01.13", "01.20"],
            "v": ["24", "211", "280", "576", "397", "377", "341", "900", "727", "181", "255", "33", "24", "211", "280", "576", "397", "377", "341", "700", "727", "181", "255", "33"]
        }
    ));
}
