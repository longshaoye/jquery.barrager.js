/*!
 *@name     jquery.barrager.js
 *@author   yaseng@uauc.net
 *@url      https://github.com/yaseng/jquery.barrager.js
 */
(function($) {
	$.fn.barrager = function(barrage) {
		barrage = $.extend({
			bottom: 0,
			min: 0,
			max: 0,
			speed: 10,/*弹幕移动速度*/
			color: '#fff',/*字体颜色*/
			old_ie_color : '#000'/*字体颜色(<=IE6)*/
		}, barrage || {});

		var time = new Date().getTime();/*时间戳*/
		var barrager_id = 'barrage_' + time;/*弹幕标识*/
		var id = '#' + barrager_id;/*Jquery选择器标识*/
		var div_barrager = $("<div class='barrage' id='" + barrager_id + "'></div>").appendTo($(this));/*外围容器*/
		var window_height = $(window).height();/*窗口高度*/
		var min = 0;
		var max = 0;
		if(barrage.min){
			min = barrage.min;
		}else{
			min = window_height * 0.125;
		}
		if(barrage.max){
			max = barrage.max;
		}else{
			max = window_height * 0.75 + min;
		}
		
		var bottom = (barrage.bottom == 0) ? Math.round(Math.random() * (max - min) + min) : barrage.bottom;/*显示位置*/
		div_barrager.css("bottom", bottom + "px");/*设置DIV显示位置*/
		div_barrager_box = $("<div class='barrage_box'></div>").appendTo(div_barrager);/*内部容器*/
		//头像
		div_barrager_box.append("<a class='avatar float-left' href='javascript:void(0);'></a>");
		if(barrage.avatar){			
			var img = $("<img src='' >").appendTo(id + " .barrage_box .avatar");
			img.attr('src', barrage.avatar);
		}
		//内容
		div_barrager_box.append("<div class='info float-left'></div>");
		var title = $("<div class='title'></div>").appendTo(id + " .barrage_box .info");
		if(barrage.title){
			title.empty().append(barrage.title);
		}		
		var content = $("<a class='content' title='' href='' target='_blank'></a>").appendTo(id + " .barrage_box .info");
		if(barrage.content){
			content.empty().append(barrage.content);
		}
		if(barrage.href){
			content.attr({
				'href': barrage.href
			});
		}
		if(navigator.userAgent.indexOf("MSIE 6.0")>0  ||  navigator.userAgent.indexOf("MSIE 7.0")>0 ||  navigator.userAgent.indexOf("MSIE 8.0")>0  ){
			content.css('color', barrage.old_ie_color);
		}else{
			content.css('color', barrage.color);
		}
		
		div_barrager_box.append("<div class='thumb float-left'></div>");
		if(barrage.thumb){			
			var img = $("<img src='' >").appendTo(id + " .barrage_box .thumb");
			img.attr('src', barrage.thumb);
		}

		var i = -500;
		div_barrager.css('right', i);		
		var looper = setInterval(barrager, barrage.speed);
		function barrager() {
			var w_width = $(window).width();
			if (i < w_width) {
				i += 1;
				$(id).css('right', i);
			} else {
				$(id).remove();
 				return false;
			}
		}

		div_barrager_box.mouseover(function() {
			clearInterval(looper);
		});

		div_barrager_box.mouseout(function() {
			looper = setInterval(barrager, barrage.speed);
		});

		$(id+'.barrage .barrage_box .close').click(function(){
			$(id).remove();
		});
	}; 
	$.fn.barrager.removeAll=function(){
		 $('.barrage').remove();
	}
})(jQuery);