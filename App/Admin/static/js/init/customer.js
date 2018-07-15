(function(P) {
	
    var _this = null;
    var parms={};
    var tableIndex = null;
    
    _this = P.mgr = {
        init: function() {
            _this.initEvent();
        },
        initEvent: function() {
            layui.use(['laydate', 'laytpl', 'upload', 'serializejson', 'underscore', 'customerDetail', 'captrue'], function() {
                var $ = layui.jquery,
                    _ = layui.underscore,
                    element = layui.element,
                    _win = $(window),
                    form = layui.form,
                    table = layui.table,
                    layer = layui.layer,
                    laydate = layui.laydate,
                    loader = layui.loader,
                    laytpl = layui.laytpl,
                    upload = layui.upload,
                    customerDetail = layui.customerDetail;
                var height = _win.height(),
                    familyData = [],
                    familyIndex = 0,
                    familyLayerIndex = 0,
                    relationList = [],
                    isEdit = false;
                var $keyword = $('#customerSearchDiv').siblings().find('[name="keyword"]');
                var customerCols = [
                                    [{
                                        type: 'checkbox',
                                        fixed: true
                                    }, {
                                        field: 'code',
                                        title: '用户编号',
                                        templet: '<div><a href="javascript:;" data-id="{{d.id}}" class="view-customer">{{d.code}}</a></div>',
                                        width: 120,
                                        sort: true
                                    }, {
                                        field: 'name',
                                        title: '姓名',
                                        width: 120,
                                        sort: true
                                    },  {
                                        field: 'nickName',
                                        title: '昵称',
                                        width: 120,
                                        sort: true
                                    }, {
                                        field: 'sex',
                                        title: '性别',
                                        templet: "#sexStatusTpl",
                                        width: 90,
                                        sort: true
                                    }, {
                                        field: 'telephone',
                                        title: '手机号码',
                                        width: 120,
                                        sort: true
                                    }, {
                                        field: 'wxId',
                                        title: '微信号',
                                        width: 190,
                                        sort: true
                                    }, {
                                        fixed: 'right',
                                        title: '操作',
                                        align: 'center',
                                        toolbar: '#customerBar',
                                        minWidth: 80
                                    }
                                ]
                            ];
                    tableIndex = table.render({
	                    elem: '#customerList',
	                    height: 'full-178', //容器高度
	                    url: 'customer/getDataList',
	                    id: 'customerList',
	                    page: {
		                	limit: 20,
	                        limits: [20,100,500,1000]
		                },
	                    request: {
	                        limitName: 'pageNumber'
	                    },
	                    cols: customerCols,
	                    done: function(res, curr, count) {
	                        element.render('breadcrumb');
	                        $('.view-customer').unbind().click(function(){
	                        	customerDetail.set({
	                            	customerId: $(this).data('id')
	                            }).init();
	                        });
	                    },
	                    loading: true
	                });
                 
                // 渲染搜索表单
                form.render(null, 'kit-search-form-customer');
                // 打开搜索面板
                $('#kit-search-more-customer').on('click', function() {
                	$keyword.val("");
        			$('#customerSearchDiv').toggle();
        		});
                //监听搜索icon提交
        		form.on('submit(customerSearchIcon)', function(data) {
        			var keyword = $keyword.val();
        			tableIndex.reload({
        				where: {
        					keyword: keyword
        				}
        			});
        			parms={};
        			parms.keyword=keyword;
        			return false;
        		});
        		//监听搜索表单提交
        		form.on('submit(customerSearch)', function(data) {
        			//带条件查询
        			tableIndex.reload({
        				where: data.field
        			});
        			parms={};
        			parms=$("#cusSearch").serializeJSON();
        			$('#customerSearchDiv').toggle();
        			return false;
        		});
        		// 排序之后重新对面包屑进行初始化
        		table.on('sort(customerList)', function(obj){
        			element.render('breadcrumb');
        		});
                //监听工具条
                table.on('tool(customerList)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值
                    var tr = obj.tr; //获得当前行 tr 的DOM对象
                    if (layEvent === 'del') { //删除
                        deleteCustomer(data.id);
                    } else if (layEvent === 'edit') { //编辑
                        getEditForm(data.id);
                    }
                });
                
             	// 导出
                $('#customerExport').unbind().click(function() {
            			 var form = document.createElement("form");  
            			 form.style.display='none';;  
            			 form.action ='customer/exprotCustomerList';  
            			 form.method="post";  
            			 document.body.appendChild(form);  
            			 for(var key in parms){  
            			  var input = document.createElement("input");  
            			  input.type = "hidden";  
            			  input.name = key;  
            			  input.value = parms[key];  
            			  form.appendChild(input);  
            			 }  
                		 form.submit();  
                });
                
            });
        }
    };
}(Customer));