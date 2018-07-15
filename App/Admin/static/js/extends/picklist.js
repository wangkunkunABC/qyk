layui.define('layer', function(exports) {
	var layer = layui.layer //获得layer模块

	function picklist(jQuery) {
		// 插件代码区
		(function($) {

			$.fn.pickList = function(options,callback) {

				var opts = $.extend({}, $.fn.pickList.defaults, options);
				
				// 变量缓存表格渲染数据
				var tableStrData = JSON.stringify(opts.data[0]);
				var tableData = tableStrData;
				

				this.fill = function() {
					var option = '';

					$.each(tableData, function(key, val) {
						if(val.type !== 'checkbox'){
							option += '<option data-id=' + key + '>' + val.title + '</option>';
						}
					});
					$('#pickList').find('.pickData').append(option);
					
				};
				this.controll = function() {
					var pickThis = $('#pickList');
					var optsAll = $('#optsAll');

					pickThis.find(".pAdd").on('click', function() {
						var p = pickThis.find(".pickData option:selected");
						p.clone().appendTo(pickThis.find(".pickListResult"));
						p.remove();
					});

					pickThis.find(".pRemove").on('click', function() {
						var p = pickThis.find(".pickListResult option:selected");
						p.clone().appendTo(pickThis.find(".pickData"));
						p.remove();
					});

					optsAll.find(".pAddAll").on('click', function() {
						var p = pickThis.find(".pickData option");
						p.clone().appendTo(pickThis.find(".pickListResult"));
						p.remove();
					});


					optsAll.find(".pRemoveAll").on('click', function() {
						var p = pickThis.find(".pickListResult option");
						p.clone().appendTo(pickThis.find(".pickData"));
						p.remove();
					});
				};

				this.getValues = function() {
					var pickThis = $('#pickList');
					var objResult = [[]];
					var eachId;
					
					$.each(tableData, function(key, val) {
						if(val.type == 'checkbox'){
							objResult[0].push(val);
						}
					});
					
					pickThis.find(".pickData option").each(function() {
						eachId = $(this).data('id');
						$.each(tableData, function(key, val) {
							if(eachId==key){
								objResult[0].push(val);
							}
						});
					});
					return objResult;
				};

				this.bind = function() {
					var self = this;
					$(this).on('click', function() {
						tableData = JSON.parse(tableStrData);
						// 动态加载样式
						//layui.link('https://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css');
						layui.link('./css/picklist.css');

						var sourceHtml = "<div id='pickList'>";

						var pickListHtml =
							"<div>" +
							"  <div class='sourse'>" +
							"  	<h3>显示字段</h3>" +
							"	 <select class='form-control pickListSelect pickData' multiple></select>" +
							" </div>" +
							" <div class='pickListButtons'>" +
							"	<button  class='pAdd'>" + opts.add + "</button><br><br><br>" +
							"	<button  class='pRemove'>" + opts.remove + "</button><br>" +
							" </div>" +
							" <div class='target'>" +
							"  	<h3>隐藏字段</h3>" +
							"    <select class='form-control pickListSelect pickListResult' multiple></select>" +
							" </div>" +
							"</div>";

						var endHtml = "</div>"+
									"<div id='optsAll'>" +
									"	<span  class='pRemoveAll'><i class='iconfont icon-jianshao'></i>" + opts.removeAll + "</span>" +
									"   <span  class='pAddAll'><i class='iconfont icon-tianjia'></i>" + opts.addAll + "</span>" +
									"</div>";
						
						layer.open({
							type: 1,
							area: ['700px','480px'],
							title: '表格自定义',
							btn: ['取消','确认'],
							shadeClose: true,
							content: sourceHtml + pickListHtml + endHtml,
							btn2: function(index, layero){
								var data = self.getValues();
								if(data[0].length == 1){
									layer.msg('至少显示一列', {
		                                icon: 2,
		                                time: 1000
		                            });
									return false;
								}else{
									callback(data);
								}
							}
						});
						
						self.fill();
						self.controll();
					})
				}
				

				this.init = function() {
					this.bind();
				};

				this.init();
				return this;
			};

			$.fn.pickList.defaults = {
				add: '<i class="layui-icon">&#xe602;</i>',
				addAll: '添加所有',
				remove: '<i class="layui-icon">&#xe603;</i>',
				removeAll: '移除所有'
			};

		}(jQuery));

		return jQuery;
	};

	exports('picklist', picklist);
});