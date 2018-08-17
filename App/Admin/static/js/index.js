var tab;
layui.define(['element', 'nprogress', 'form', 'table', 'loader', 'tab', 'navbar', 'laytpl','serializejson'], function(exports) {
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        _win = $(window),
        _doc = $(document),
        _body = $('.kit-body'),
        form = layui.form,
        table = layui.table,
        loader = layui.loader,
        navbar = layui.navbar,
        laytpl = layui.laytpl;
    tab = layui.tab;
    var height = _win.height();
    $.ajaxSetup({cache:false});
    // 全局禁用回车事件
    document.onkeydown = function (e) {
    	//捕捉回车事件
        var ev = (typeof event!= 'undefined') ? window.event : e;
        if(ev.keyCode == 13) {
            return false;//禁用回车事件
        }
    }
    // 点击其他区域关闭筛选表单
    $(document).on('click',function(e){
    	if(e.target.className === 'kit-search-more' || $(e.target).parents('.kit-search-mored').length === 1){
    		return;
    	}else{
    		$('.kit-search-mored').hide();
    	}
    });
    // 关闭图片弹层
    $(document).on('click','.close-photos',function(){
		var index = $(this).parent().attr('times');
		layer.close(index);
	});
    // 更多筛选
    $(document).on('click','.kit-search-more', function() {
		if($(this).parents('.kit-table').find('.kit-search-mored').is(':visible')){
			$(this).find('.layui-icon').html('&#xe619;');
		}else{
			$(this).find('.layui-icon').html('&#xe61a;');
		}
    });
    // 列表刷新
    $(document).on('click','.refresh',function(){
    	var id = $(this).parents('.kit-table').find('.kit-table-body>table').attr('id');
    	table.reload(id);
    });
    //时间戳的处理
    laytpl.toDateString = function(d, format) {
    	if(!d) return '';
        var date = new Date(d || new Date()),
            ymd = [
                this.digit(date.getFullYear(), 4), this.digit(date.getMonth() + 1), this.digit(date.getDate())
            ],
            hms = [
                this.digit(date.getHours()), this.digit(date.getMinutes()), this.digit(date.getSeconds())
            ];

        format = format || 'yyyy-MM-dd HH:mm:ss';

        return format.replace(/yyyy/g, ymd[0])
            .replace(/MM/g, ymd[1])
            .replace(/dd/g, ymd[2])
            .replace(/HH/g, hms[0])
            .replace(/mm/g, hms[1])
            .replace(/ss/g, hms[2]);
    };
    //数字前置补零
    layui.laytpl.digit = function(num, length, end) {
        var str = '';
        num = String(num);
        length = length || 2;
        for (var i = num.length; i < length; i++) {
            str += '0';
        }
        return num < Math.pow(10, length) ? str + (num | 0) : num;
    };
    laytpl.defaultIfBlank = function(d, defaultValue) {
        defaultValue = defaultValue || '';
        if (d === 0 || d === '0') return d;
        if (!d) return defaultValue;
        return d;
    };
    layui.laytpl.formatMoney = function(str){
    	var money = parseFloat(str);
    	if(isNaN(money)){
    		return '0';
    	}
    	money = money.toFixed(2);
    	return Number(money).toLocaleString();
    };
    form.verify({
  	  length: function(value,item){ //value：表单的值、item：表单的DOM对象
  		  var maxlength = $(item).attr('length');
  		  if(value.length>maxlength){
  			  return '长度不超过'+maxlength;
  		  }
  	   
  	  },
  	  num:function(value, item){
  		  if(value && isNaN(value)){
  			  return '只能填写数字';
  		  }
  	  },
  	  //金额验证
  	  amount:function(value,item){
  		  var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  		  if(!reg.test(value)){
  			  return '请输入正确的金额格式';
  		  }
  	  },
  	  pass: [/^[\S]{8,32}$/,'密码必须8到32位，且不能出现空格'],
  	  enableRequired: function(value,item){
  		  if(!$(item).prop('disabled')){
  			  value = $.trim(value);
  			  if(value === ''){
  				  return '必填项不能为空';
  			  }
  			  value = parseFloat(value);
  			  if(isNaN(value)){
  				  return '请填写正确的数字';
  			  }
  		  }
  	  },
  	  equalTo: function(value,item){
  		  var name = $(item).attr('equal');
  		  var compareValue = $(item).parents('form').find('[name="' + name + '"]').val();
  		  if(value !== compareValue){
  			  return '请输入相同的密码';
  		  }
  	  }
  	});      
    var index = {
        hello: function(str) {
            layui.hint().error('hello ' + str);
        },
        config: {
            type: 'iframe'
        },
        set: function(options) {
            var that = this;
            $.extend(true, that.config, options);
            return that;
        },
        init: function() {
            var that = this,
                _config = that.config;
            if (_config.type === 'page') {
                tab.set({
                    renderType: 'page',
                    mainUrl: mainUrl + 'home',
                    elem: '#container',
                    openWait: false,
                    onSwitch: function(data) {},
                    closeBefore: function(data) {
                        return true;
                    }
                }).render();
                //navbar加载方式一，直接绑定已有的dom元素事件                
                navbar.bind(function(data) {
                    tab.tabAdd(data);
                });
            }
            if (_config.type === 'iframe') {
                tab.set({
                    renderType: 'iframe',
                    mainUrl: mainUrl + 'home_bak.html',
                    elem: '#container',
                    onSwitch: function(data) {},
                    closeBefore: function(data) {
                        return true;
                    }
                }).render();
                //navbar加载方式一，直接绑定已有的dom元素事件                
                navbar.bind(function(data) {
                    tab.tabAdd(data);
                });
            }
            $('.view-logout').click(function(){//注销
            	layer.confirm('确定退出吗 ?', {
            		icon: 3, 
            		title:'提示',
            		btn: ['取消','确认'],
            		yes: function(index,layero){
            			layer.close(index);
            		},
            		btn2: function(index,layero){
            			$.get('logout', null, function(res) {
                        	location.href="../login";
                        });
            		}
            	});
        	});
            
            $('.view-password').click(function(){//修改密码
            	laytpl($('#passwordTpl').html()).render(1,function(html) {
                    var index = layer.open({
                        type: 1,
                        title:'修改密码',
                        content: html,
                        area: ['360px','300px'],
                        maxmin: true,
                        btn: ['取消','提交'],
                        success: function() {
                            form.render(null,'passwordForm');
                            // 表单提交
                            form.on('submit(passwordSubmit)', function(data){
                            	var data=$("#password-form").serializeJSON();
                                $.post('insuranceUser/modifyPass',data,function(res){
                                	if (res.code) {
                                        layer.msg(res.msg, {
                                            icon: 1,
                                            time: 1000,
                                        }, function() {
                                        	layer.close(index);
                                        });
                                    } else {
                                        layer.msg(res.msg, {
                                            icon: 2,
                                            time: 1000
                                        });
                                    }
                            	});
                                return false;
                            });
                        },
                        btn2: function(index, layero) {
                        	$('form[lay-filter="passwordForm"]').find('button[lay-submit]').click();
                            return false;
                        },
                        yes: function(index, layero){
                        	layer.close(index);
                        }
                    });
                });
        	});
            // ripple start
            var addRippleEffect = function(e) {
                layui.stope(e)
                var target = e.target;
                if (target.localName !== 'button' && target.localName !== 'a') return false;
                var rect = target.getBoundingClientRect();
                var ripple = target.querySelector('.ripple');
                if (!ripple) {
                    ripple = document.createElement('span');
                    ripple.className = 'ripple'
                    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
                    target.appendChild(ripple);
                }
                ripple.classList.remove('show');
                var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
                var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
                ripple.style.top = top + 'px'
                ripple.style.left = left + 'px'
                ripple.classList.add('show');
                return false;
            }
            document.addEventListener('click', addRippleEffect, false);
            // ripple end
            return that;
        }
    };
    //输出index接口
    exports('index', index);
});