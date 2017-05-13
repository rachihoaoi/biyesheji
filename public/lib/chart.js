/*** Created by 八千穂えな on 2016/10/10.*/
var pie_doughnut = function (dom,data,xdata,title) {
    this.chart = echarts.init(dom);
    this.option = {
        color:['#B4A582', '#877F6C','#897D55','#74673E','#A28C37','#6C6024','#867835','#62592C'],
        title : {
            text: title,
            x:'center',
            textStyle:{
                color:'#7b7a6c',
                fontStyle:'normal',
                fontWeight:'lighter'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:xdata
        },

        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },

        series: [
            {
                
                name:'参数类型',
                type:'pie',
                radius: ['40%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'normal'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data
            }
        ]
    };
    this.setData(data);
}

pie_doughnut.prototype.setData = function (data) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 4;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

pie_doughnut.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

pie_doughnut.prototype.loading = function () {
    this.chart.showLoading();
};

pie_doughnut.prototype.loaded = function () {
    this.chart.hideLoading();
};


////////////////////////////////

var line_chart = function (dom,xdata,data1,data2) {
    this.chart = echarts.init(dom);
    this.option = {
        title: {
            text: '跨部门人员流动情况'
        },
        legend: {
            data: ['流动前', '流动后'],
            align: 'left'
        },
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {},
        xAxis: {
            data: xdata,
            silent: false,
            splitLine: {
                show: true
            },
            axisLabel: {
                interval: 0,//横轴信息全部显示
                rotate: 30
            }
        },
        yAxis: {
        },
        series: [{
            name: '流动前',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: '流动后',
            type: 'bar',
            data: data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    this.setData(xdata,data1,data2);
};

line_chart.prototype.setData = function (xdata,data1,data2) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 2;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

line_chart.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

line_chart.prototype.loading = function () {
    this.chart.showLoading();
};

line_chart.prototype.loaded = function () {
    this.chart.hideLoading();
};



//line_maker
var line_maker = function (dom,data1){
    this.chart = echarts.init(dom);
    this.option = {
        color:['#2E5C6E', '#006284','yellow','blueviolet'],
        title: {
            text: '一周内调用成功失败统计',
            textStyle:{
                color:'white'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['成功次数','失败次数'],
            textStyle:{
                color:'white'
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLabel:{
                textStyle:{
                    color:'white'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 次',
                textStyle:{
                    color:'white'
                }
            }

        },
        series: [
            {
                name:'成功次数',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 19],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ],
                    textStyle:{
                        color:'white'
                    }
                }
            },
            {
                name:'失败次数',
                type:'line',
                data:[1, 0, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ],
                    textStyle:{
                        color:'white'
                    }
                }
            }
        ]
    }
    this.setData(data1);
};

line_maker.prototype.setData = function (data1) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 2;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

line_maker.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

line_maker.prototype.loading = function () {
    this.chart.showLoading();
};

line_maker.prototype.loaded = function () {
    this.chart.hideLoading();
};

////////////////堆叠区域图

var stackLine = function (dom,data,xdata,title,smooth) {
    this.chart = echarts.init(dom);
    this.option = {
        title: {
            text: title,
            textStyle:{
                color:'#7b7a6c',
                fontStyle:'normal',
                fontWeight:'lighter'
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
                
            }
        },
        legend: {
            data:[title]
        },
        toolbox: {
            feature: {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : xdata
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:title,
                smooth:smooth,
                color:['#7b7a6c'],
                name:title,
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:data
            },

        ]
    };
    this.setData(data);
    console.log(data)
}

stackLine.prototype.setData = function (data) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 1;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

stackLine.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

stackLine.prototype.loading = function () {
    this.chart.showLoading();
};

stackLine.prototype.loaded = function () {
    this.chart.hideLoading();
};


////////////////堆叠区3域图

var stackLine3 = function (dom,data,data1,data2,data3,xdata,title,smooth) {
    this.chart = echarts.init(dom);
    this.option = {
        title: {
            text: title,
            textStyle:{
                color:'#7b7a6c',
                fontStyle:'normal',
                fontWeight:'lighter'
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }

            }
        },
        legend: {
            data:[title]
        },
        toolbox: {
            feature: {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : xdata
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series :[
        {
            name:'用户注册数',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:data
        },

        {
            name:'待审查',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:data1
        },
        {
            name:'未通过',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:data2
        },
            {
                name:'已通过',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:data3
            }
        ]
    };
    this.setData(data);
    console.log(data)
}

stackLine3.prototype.setData = function (data) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 1;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

stackLine3.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

stackLine3.prototype.loading = function () {
    this.chart.showLoading();
};

stackLine3.prototype.loaded = function () {
    this.chart.hideLoading();
};

/////////////////////2diudie

var stackLine2 = function (dom,data,data2,xdata,title,title1,title2,smooth) {
    this.chart = echarts.init(dom);
    this.option = {
        title: {
            text: title,
            textStyle:{
                color:'#7b7a6c',
                fontStyle:'normal',
                fontWeight:'lighter'
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }

            }
        },
        legend: {
            data:[title1,title2]
        },
        toolbox: {
            feature: {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : xdata
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:1,
                smooth:smooth,
                color:['#7b7a6c'],
                name:title1,
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:data
            },
            {
                name:2,
                smooth:smooth,
                color:['#aaa893'],
                name:title2,
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:data2
            },

        ]
    };
    this.setData(data);
    console.log(data)
}

stackLine2.prototype.setData = function (data) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 2;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

stackLine2.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

stackLine2.prototype.loading = function () {
    this.chart.showLoading();
};

stackLine2.prototype.loaded = function () {
    this.chart.hideLoading();
};



/////////////南丁格尔玫瑰图

var rose = function (dom,data,xdata,title) {
    this.chart = echarts.init(dom);
    this.option = {
        color:['#B4A582', '#877F6C','#897D55','#74673E','#A28C37','#6C6024','#867835','#62592C'],
        title : {
            text: title,
            x:'center',
            textStyle:{
                color:'#7b7a6c',
                fontStyle:'normal',
                fontWeight:'lighter'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} 个({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:xdata
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'请求方式：',
                type:'pie',
                radius : [20, 110],
                center : ['50%', '50%'],
                roseType : 'radius',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:data,
            }
        ]
    };
    this.setData(data);
    console.log(data)
}

rose.prototype.setData = function (data) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 4;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

rose.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

rose.prototype.loading = function () {
    this.chart.showLoading();
};

rose.prototype.loaded = function () {
    this.chart.hideLoading();
};

/////////////南丁格尔玫瑰图(小）

var rose_s = function (dom,data,xdata,title) {
    this.chart = echarts.init(dom);
    this.option = {
        color:['#B4A582', '#877F6C','#897D55','#74673E','#A28C37','#6C6024','#867835','#62592C'],
        title : {
            text: title,
            x:'center',
            textStyle:{
                color:'#7b7a6c',
                fontStyle:'normal',
                fontWeight:'lighter'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} 个({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:xdata
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'请求方式：',
                type:'pie',
                radius : [50, 80],
                center : ['50%', '50%'],
                roseType : 'radius',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:data,
            }
        ]
    };
    this.setData(data);
    console.log(data)
}

rose_s.prototype.setData = function (data) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 4;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

rose_s.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

rose_s.prototype.loading = function () {
    this.chart.showLoading();
};

rose_s.prototype.loaded = function () {
    this.chart.hideLoading();
};


////////radar   

////////////////radar

var radar = function (dom,data,max) {
    this.chart = echarts.init(dom);
    this.option =  {
        title: {
            text: '服务参数类别'
        },
        tooltip: {},
        legend: {
            data: ['服务参数类别']
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'Params', max: max},
                { name: 'Header', max: max},
                { name: 'Path', max: max},
                { name: 'Body', max: max}
            ]
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
                {
                    value : data,
                    name : '服务参数类别'
                }
            ]
        }]
    };


    this.setData(data);
    console.log(data)
}

radar.prototype.setData = function (data) {
    var thisPie = this;
    var nameArray = [];
    var thisOption;
    thisOption=this.option;
    thisOption.legend.data.length = 1;
    thisPie.chart.setOption(thisOption);
    thisPie.chart.hideLoading();
};

radar.prototype.setTitle = function (title) {
    this.option.title.text = title;
    this.chart.setOption(this.option);
};

radar.prototype.loading = function () {
    this.chart.showLoading();
};

radar.prototype.loaded = function () {
    this.chart.hideLoading();
};