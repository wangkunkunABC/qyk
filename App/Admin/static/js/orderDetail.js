/**
	@author 赵翔
	@desc 订单详情公用js
*/
layui.define(['laytpl', 'underscore'], function(exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        _ = layui.underscore,
        element = layui.element,
        orderDetail = {
            config: {
            	orderId: 0
            },
            set: function(options) {
                var that = this;
                $.extend(true, that.config, options);
                return that;
            },
            init: function() {
                var that = this;
                $.get('order/detail',{
                	id: that.config.orderId
                },function(d){
                	laytpl($('#orderDetailTpl').html()).render(d, function(html) {
                        layer.open({
                            type: 1,
                            title: '订单详情',
                            content: html,
                            area: ['900px', '600px'],
                            success: function() {
                            	element.render('collapse');
                            	$('.viewRecipe').unbind().click(function(){
                            		laytpl($('#receiptDetailTpl').html()).render(d,function(html){
                            			layer.open({
                      				      type: 1,
                      				      title: '查看处方详情',
                      				      area: ['400px', '600px'],
                      				      shadeClose: true, //点击遮罩关闭
                      				      content: html
                      				    });
                            		});
                            	});
                            }
                        })
                    });
                });
            }
        }
    exports('orderDetail', orderDetail);
});