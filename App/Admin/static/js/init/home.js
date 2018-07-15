(function(P) {
    var _this = null;
    _this = P.mgr = {
        init: function() {
            _this.initEvent();
        },
        initEvent: function() {
            layui.use(['jquery', 'nicescroll','laytpl','tab'], function() {
                var $ = layui.jquery,
                    form = layui.form,
                    loader = layui.loader,
                    element = layui.element,
                    tab = layui.tab,
                    laytpl = layui.laytpl;
                form.render('select');
                
                $(function() {
                    function selfHeight(father, son) {
                        var objHeight = $(father).height();
                        var sonHeight = $(son).height();
                        $(son).css("margin-top", (objHeight - sonHeight) / 2);
                    }

                    selfHeight($(".modular-com"), $(".infos"));
                    selfHeight($(".modular-com"), $(".modular-img"));

                    function ulHeight(parent, ul) {
                        var parentHeight = $(parent).height();
                        $(ul).height(parentHeight - 100);
                    }
                    ulHeight($(".warning-dynamics"), $(".warn-ul"));
                    ulHeight($(".ranking"), $(".rank-ul"));
                    ulHeight($(".agency"), $(".agency-ul"));
                    var myChart1;
                    loader.getScript('./plugins/echarts/echarts-all-3.js', function() {
                        loader.getScript('./plugins/echarts/macarons.js', function() {
                        	
                           //金额统计图
                           myChart1 = echarts.init(document.getElementById("chart1"), 'macarons');
                           var totalData = [],discountData = [];
                            var option1 = {
                        		tooltip: {
                                    trigger: 'axis',
                                    formatter: function(params, ticket, callback) {
                                        var a = params[0];
                                        var b = params[1];
                                        var month = a.name;
                                        var totalName = a.seriesName;
                                        var discountName = b.seriesName;
                                        var totalValue = a.value;
                                        var discountValue = b.value;
                                        if (totalValue === undefined && discountValue === undefined) {
                                            return '';
                                        }
                                        var percent;
                                        if (discountValue == 0 || totalValue === undefined) {
                                            percent = '--';
                                        } else {
                                            percent = discountValue / totalValue * 100;
                                            percent = percent.toFixed(2);
                                        }
                                        return month + '<br/>' + totalName + ' : ' + (totalValue === undefined ? '--' : totalValue + '个') +
                                            '<br/>' + discountName + ' : ' + discountValue + '个' + '<br/>' +
                                            '已随访占比： ' + (percent === '--' ? percent : percent + '%');
                                    }
                                },
	                            legend: {
	                            	data: ['随访总数', '已随访数'],
                                    left: 'center',
                                    top: '30'
	                            },
	                            xAxis: {
	                            	data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	                            },
	                            yAxis: {
                                    type: 'value',
                                    name: '随访数（个）',
                                    axisLabel: {
                                        formatter: '{value}'
                                    }
                                },
	                            series: [{
	                                name: '随访总数',
	                                type: 'bar',
                                    data: totalData
	                            }, {
                                    name: '已随访数',
                                    type: 'bar',
                                    data: discountData
                                }]
                            };
                            myChart1.setOption(option1);
                            $.get('queryHomeAmountInfo', function(res) {
                            	if(res.length > 0){
                            		for(var i=0,len=res.length;i<len;i++){
                            			totalData.push(res[i].totalAmount);
                            			discountData.push(res[i].expenseAmount);
                            		}
                            		
                            		// 填入数据
                            	    myChart1.setOption({
                            	        series: [{
        	                                name: '随访总数',
                                            data: totalData
        	                            }, {
                                            name: '已随访数',
                                            data: discountData
                                        }]
                            	    });
                            	}
                            });
                            
                            
                            
                           //用于使chart自适应高度和宽度
                            window.onresize = function () {
                                myChart1.resize();
                            };
                            // 选项卡切换时重置tab
                            tab.set({
                                onSwitch: function(data) { //选项卡切换时触发
                                	if(data.index===0){
                                        myChart1.resize();
                                	}
                            }}); 
                        });
                    });
                    
                    element.render('nav');

                    // 用户随访排名
                    form.on('select(aihao)', function(data){
                	  var url = '';
                	  if(data.value == 0){
                		  url += 'queryExpenseAmountByProductId';
                	  }else if(data.value==1){
                		  url += 'queryExpenseAmountByShopId';
                	  }else if(data.value==2){
                		  url += 'queryExpenseAmountByHospitalId';
                	  }else if(data.value==3){
                		  url += 'queryExpenseAmountByDoctorId';
                	  }
                	  $.get(url, function(res) {
                		  var html = '';
                          if(res.length>0){
                        	  for(var i=0,len=res.length;i<len;i++){
                        		  html += '<li>';
                        		  html += '<span class="no-wrap">'+res[i].name+'</span>';
                        		  html += '<span class="trend">￥'+laytpl.formatMoney(res[i].currYearExpenseAmount)+'<img src="images/ranking-1.png"/></span></li>';
                        	  }
                        	  $('#rankUL').empty().html(html);
                          }
                      });
                	});
                    
                });
            });
        }
    };
}(Home));