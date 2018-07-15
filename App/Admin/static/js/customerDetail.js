/**
	@author 赵翔
	@desc 客户详情公用js
*/
layui.define(['laytpl', 'underscore'], function(exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        _ = layui.underscore,
        element = layui.element,
        table = layui.table,
        customerDetail = {
            config: {
                customerId: 0
            },
            set: function(options) {
                var that = this;
                $.extend(true, that.config, options);
                return that;
            },
            init: function() {
                var that = this;
                $.get('customer/getCusDetailById',{
                	id: that.config.customerId
                },function(d){
                	laytpl($('#customerDetailTpl').html()).render(d, function(html) {
                        layer.open({
                            type: 1,
                            title: '患者详情',
                            content: html,
                            area: ['900px', '600px'],
                            success: function() {
                            	element.render('collapse');
                            	table.init('customer-relation-table', { //转化静态表格
                            		height: 'auto',
                            		page: false
                        		}); 
                            	
                            	// 查看图片
                            	$('.customer-detail-pop .view-pic1').unbind().click(function(){
                             		var that = $(this);
                            		var json = {
                            			start: 0,
                            			data: []
                            		};
                            		layui.each(that.find('img'),function(index,item){
                            			json.data.push({
                            				alt: $(item).attr('alt'),
                            				src: $(item).attr('layer-src')
                            			});
                            		});
                            		layer.photos({
                        			  photos: json,
                        			  anim: 5,
                        			  shadeClose: false,
                        			  tab: function(pic,layero){
	                						var i = '<i class="close-photos"></i>';
	                						layero.prev('.layui-layer-shade').css({
	                							width : '90%',
	                							height : '90%',
	                							top : '5%',
	                							left : '5%'
	                						}).append(i);
	                					}
                        			}); 
                            	});
                            	

                            }
                        })
                    });
                })
            }
            
        }
    exports('customerDetail', customerDetail);
});