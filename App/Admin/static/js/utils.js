/** kit_admin-v1.1.0 MIT License By http://kit/zhengjinfan.cn e-mail:zheng_jinfan@126.com */
 ;/**
 * Name:utils.js
 * Author:Van
 * E-mail:zheng_jinfan@126.com
 * Website:http://kit.zhengjinfan.cn/
 * LICENSE:MIT
 */
layui.define(['layer'], function(exports) {
    var $ = layui.jquery,
        layer = layui.layer,
        _modName = 'utils';
    var utils = {
        v: '1.0.3',
        /**
         * 根据一个html内容读取出body标签里的文本
         */
        getBodyContent: function(content) {
            var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/,
                result = REG_BODY.exec(content);
            if (result && result.length === 2)
                return result[1];
            var obj;
            try{
            	obj = JSON.parse(content);
            }catch(err){
            }finally{
            	if(obj){
            		if(obj.isLogin === false){
                    	location.href = location.href;
                    	return false;
                    }
            	}else{
            		return content;
            	}
            }
        },
        /**
         * 读取html字符串
         */
        loadHtml: function(url, callback) {
            var result;
            $.ajax({
                url: url,
                async: false,
                dataType: 'html',
                beforeSend: function(request) {
                    request.setRequestHeader("IsGetHtml", 'true');
                },
                error: function(xhr, err, msg) {
                    var m = ['<div style="padding: 20px;font-size: 20px;text-align:left;color:#009688;">',
                        '<p>{{msg}}  >>> ' + url + '</p>',
                        '</div>'
                    ].join('');
                    if (xhr.status === 404) {
                        result = m.replace('{{msg}}', '<i class="layui-icon" style="font-size:70px;">&#xe61c;</i>  ' + msg);
                        return;
                    }
                    result = m.replace('{{msg}}', '<i class="layui-icon" style="font-size:70px;">&#xe69c;</i>  未知错误.');
                },
                success: function(res) {
                    result = res;
                },
                complete: function() {
                    typeof callback === 'function' && callback();
                }
            });
            return result;
        },
        /**
         * 加载等待层
         */
        load: function(type) {
            type = type || 0;
            return layer.load(type, { shade: [0.3, '#333'] });
        },
        /**
         * ajax post
         */
        post: function(url, params, callback, options) {
            var defaults = {
                error: function(xhr, err, msg) {
                    console.log('发生错误了..');
                    console.log(xhr);
                    console.log(err);
                    console.log(msg);
                },
                complete: function(xhr, statusCode) {
                    console.log('complete.' + statusCode);
                }
            };
            $.extend(true, defaults, options);
            $.ajax({
                url: url,
                beforeSend: function(request) {
                    request.setRequestHeader("IsAjax", 'true');
                },
                dataType: 'json',
                method: 'POST',
                data: params,
                error: function(xhr, err, msg) {
                    defaults.error(xhr, err, msg);
                },
                success: function(res) {
                    if (res.code === 101) {
                        layer.alert(res.msg, {
                            icon: 2,
                            title: '系统提示',
                            cancel: function(index, layero) {
                                top.location.href = location.origin + '/Account/Login';
                            }
                        }, function() {
                            top.location.href = location.origin + '/Account/Login';
                        });
                    } else {
                        callback(res);
                    }
                },
                complete: function(xhr, statusCode) {
                    defaults.complete(xhr, statusCode);
                }
            });
        },
        /**
         * ajax get
         */
        get: function(url, params, callback, options) {
            var defaults = {
                error: function(xhr, err, msg) {
                    console.log('发生错误了..');
                    console.log(xhr);
                    console.log(err);
                    console.log(msg);
                },
                complete: function(xhr, statusCode) {
                    console.log('complete.' + statusCode);
                }
            };
            $.extend(true, defaults, options);
            $.ajax({
                url: url,
                beforeSend: function(request) {
                    request.setRequestHeader("IsAjax", 'true');
                },
                dataType: 'json',
                method: 'GET',
                data: params,
                error: function(xhr, err, msg) {
                    defaults.error(xhr, err, msg);
                },
                success: function(res) {
                    if (res.code === 101) {
                        layer.alert(res.msg, {
                            icon: 2,
                            title: '系统提示',
                            cancel: function(index, layero) {
                                top.location.href = location.origin + '/Account/Login';
                            }
                        }, function() {
                            top.location.href = location.origin + '/Account/Login';
                        });
                    } else {
                        callback(res);
                    }
                },
                complete: function(xhr, statusCode) {
                    defaults.complete(xhr, statusCode);
                }
            });
        },
        keyWordHighlight: function(o, flag, rndColor, url) {
            /// <summary>
            ///     使用 javascript HTML DOM 高亮显示页面特定字词.
            ///     实例:
            ///         keyWordHighlight(document.body, '纸伞|她'); 
            ///         这里的body是指高亮body里面的内容。
            ///         keyWordHighlight(document.body, '希望|愁怨', false, '/'); 
            ///         keyWordHighlight(document.getElementById('at_main'), '独自|飘过|悠长', true, 'search.asp?keyword='); 
            ///         这里的'at_main'是指高亮id='at_main'的div里面的内容。search.asp?keyword=指给关键字加的链接地址，
            ///         我这里加了一个参数，在后面要用到。可以是任意的地址。        
            /// </summary>
            /// <param name="o" type="Object">
            ///     对象, 要进行高亮显示的对象. 
            /// </param>
            /// <param name="flag" type="String">
            ///     字符串, 要进行高亮的词或多个词, 使用 竖杠(|) 分隔多个词 . 
            /// </param>
            /// <param name="rndColor" type="Boolean">
            ///     布尔值, 是否随机显示文字背景色与文字颜色, true 表示随机显示. 
            /// </param>
            /// <param name="url" type="String">
            ///     URI, 是否对高亮的词添加链接.
            /// </param>                        
            /// <return></return>
            var bgCor = fgCor = '';
            if (rndColor) {
                bgCor = fRndCor(10, 20);
                fgCor = fRndCor(230, 255);
            } else {
                bgCor = 'transparent'; //背景色
                fgCor = 'red'; //字体颜色
            }
            var re = new RegExp(flag, 'i');
            for (var i = 0; i < o.childNodes.length; i++) {
                var o_ = o.childNodes[i];
                var o_p = o_.parentNode;
                if (o_.nodeType == 1) {
                    this.keyWordHighlight(o_, flag, rndColor, url);
                } else if (o_.nodeType == 3) {
                    if (!(o_p.nodeName == 'A')) {
                        if (o_.data.search(re) == -1) continue;
                        var temp = fEleA(o_.data, flag);
                        o_p.replaceChild(temp, o_);
                    }
                }
            }
            //------------------------------------------------ 
            function fEleA(text, flag) {
                var style = ' style="background-color:' + bgCor + ';color:' + fgCor + ';" '
                var o = document.createElement('span');
                var str = '';
                var re = new RegExp('(' + flag + ')', 'gi');
                if (url) {
                    str = text.replace(re, '<a href="' + url +
                        '$1"' + style + '>$1</a>'); //这里是给关键字加链接，红色的$1是指上面链接地址后的具体参数。
                } else {
                    str = text.replace(re, '<span ' + style + '>$1</span>'); //不加链接时显示
                }
                o.innerHTML = str;
                return o;
            }
            //------------------------------------------------ 
            function fRndCor(under, over) {
                if (arguments.length == 1) {
                    var over = under;
                    under = 0;
                } else if (arguments.length == 0) {
                    var under = 0;
                    var over = 255;
                }
                var r = fRandomBy(under, over).toString(16);
                r = padNum(r, r, 2);
                var g = fRandomBy(under, over).toString(16);
                g = padNum(g, g, 2);
                var b = fRandomBy(under, over).toString(16);
                b = padNum(b, b, 2);
                //defaultStatus=r+' '+g+' '+b 
                return '#' + r + g + b;

                function fRandomBy(under, over) {
                    switch (arguments.length) {
                        case 1:
                            return parseInt(Math.random() * under + 1);
                        case 2:
                            return parseInt(Math.random() * (over - under + 1) + under);
                        default:
                            return 0;
                    }
                }

                function padNum(str, num, len) {
                    var temp = ''
                    for (var i = 0; i < len; temp += num, i++);
                    return temp = (temp += str).substr(temp.length - len);
                }
            }
        },
        drawProcess: function(){
        	// 选出页面上所有class为process的canvas元素,然后迭代每一个元素画图(这里用Jquery的选择器选的)  
            $('canvas.process').each(function() {
                // 第一部先拿到canvas标签中间的文字,就是那个61%(这里的stringTrim方法是我自己的方法,去前后空格的方法很多的,这里就不贴出来了)  
                var text = $(this).text();
                var process = text.substring(0, text.length - 1);

                // 一个canvas标签  
                var canvas = this;
                // 拿到绘图上下文,目前只支持"2d"  
                var context = canvas.getContext('2d');
                // 将绘图区域清空,如果是第一次在这个画布上画图,画布上没有东西,这步就不需要了  
                context.clearRect(0, 0, 120, 120);

                // ***开始画一个灰色的圆  
                context.beginPath();
                // 坐标移动到圆心  
                context.moveTo(60, 60);
                // 画圆,圆心是60,60,半径60,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
                context.arc(60, 60, 60, 0, Math.PI * 2, false);
                context.closePath();
                // 填充颜色  
                context.fillStyle = '#EBEAE6';
                context.fill();
                // ***灰色的圆画完  
                
                if(text !== '暂无'){
                	// 画进度  
                    context.beginPath();
                    // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
                    context.moveTo(60, 60);
                    // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
                    context.arc(60, 60, 60, -1 / 2 * Math.PI, Math.PI * 2 * process / 100 - 1 / 2 * Math.PI, false);
                    context.closePath();
                    context.fillStyle = '#094';
                    context.fill();
                }

                // 画内部空白  
                context.beginPath();
                context.moveTo(60, 60);
                context.arc(60, 60, 48, 0, Math.PI * 2, true);
                context.closePath();
                context.fillStyle = 'rgba(255,255,255,1)';
                context.fill();

                //在中间写字  
                if(text === '暂无'){
                	context.font = "bold 18px Arial";
                    context.fillStyle = '#C9CACA';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.moveTo(60, 60);
                    context.fillText(text, 60, 60);
                }else{
                	context.font = "bold 18px Arial";
                    context.fillStyle = '#094';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.moveTo(60, 60);
                    context.fillText(text, 60, 60);
                }
            });
        }
    };


    exports('utils', utils);
});