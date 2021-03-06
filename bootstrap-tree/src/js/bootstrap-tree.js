(function($){
	// 定义 BootstrapTree 构造函数
	var BootstrapTree = function(element, options) {
		this.element = element;
		this.defaults = {
			openOnLoad: false,
			icons: {
				openedNodeIcon: 'glyphicon-minus',
				closedNodeIcon: 'glyphicon-plus',
				leafNodeIcon: 'glyphicon-leaf'
			}
		};
		this.settings = $.extend(true, {}, this.defaults, options); // 初始化设置
		this.initialize(); // 调用开始
	};
	// 定义原型方法 prototype function
	BootstrapTree.prototype = {
			initialize: function() {
				this.$element = $(this.element);
				this.$element.addClass('tree');
				var icons = this.settings.icons;
				var openedNodeIcon = icons.openedNodeIcon;
				var leafNodeIcon = icons.leafNodeIcon;
				this.$element.find('li:has(ul)').addClass('parent_li').find(' > span').attr('node-status', 'open');
				this.$element.find('li:has(ul)').find(' > span').prepend('<span class="glyphicon ' + openedNodeIcon + '" aria-hidden="true"></span>');
				this.$element.find('li[class!=parent_li]').find(' > span').prepend('<span class="glyphicon ' + leafNodeIcon + '" aria-hidden="true"></span>');
				this.bindClick();
			},
			bindClick: function() {
				var icons = this.settings.icons;
				var openedNodeIcon = icons.openedNodeIcon;
				var closedNodeIcon = icons.closedNodeIcon;
				this.$element.find('li.parent_li > span').off('click').on('click', function(e) {
					var children = $(this).parent('li.parent_li').find(' > ul > li');
					if (children.is(":visible")) {
						children.hide('fast');
						$(this).attr('node-status', 'closed').find(' > span').removeClass(openedNodeIcon).addClass(closedNodeIcon);
					} else {
						children.show('fast');
						$(this).attr('node-status', 'open').find(' > span').removeClass(closedNodeIcon).addClass(openedNodeIcon);
					};
					e.stopPropagation();
				});
				this.$element.data('bindClick', true);
			},
			setOptions: function(options){ // 设置参数
				var settings = this.settings;
				if(!settings.openOnLoad) {
					this.$element.find('li.parent_li > span').attr('node-status', 'closed').find(' > span').removeClass(settings.icons.openedNodeIcon).addClass(settings.icons.closedNodeIcon);
					this.$element.find('li.parent_li').find(' > ul > li').hide();
				};
				return this.$element;
			},
			closeAll: function() {
				var settings = this.settings;
				return this.$element.find('li.parent_li > span').each(function(){
					if($(this).parent('li.parent_li').find(' > ul > li').is(':visible'))
						$(this).trigger('click', settings.icons);
				});
			},
			openAll: function() {
				var settings = this.settings;
				return this.$element.find('li.parent_li > span').each(function(){
					if($(this).parent('li.parent_li').find(' > ul > li').is(':hidden'))
						$(this).trigger('click', settings.icons);
				});
			},
			init: function() {
				if(!this.$element.data('bindClick')){
					this.bindClick();
				}
				return this.$element;
			},
			destroy: function() {
				this.$element.removeData('bindClick');
				return this.$element.find('li.parent_li > span').off('click');
			}
	};
	$.fn.bootstrapTree = function(options) {
		var args = arguments;
		result = null;
		return $(this).each(function(index, dom){
			var $this = $(dom);
			data = $this.data('bootstrapTree'); // 通过 data 来判断是否已初始化
			if(!data){
				data = new BootstrapTree(dom, options);
				$(data.$element).data('bootstrapTree', data);
			};
			if(typeof options == 'string'){
				if(data[options]){
					result = data[options].apply(data, Array.prototype.slice.call(args, 1));
				}else{
					throw 'Method "' + options + '" does not exists.';
				}
			}else{
				result = data.setOptions(options);
			}
			return result;
		});
	};
	$.fn.bootstrapTree.Constructor = BootstrapTree;
})(window.jQuery);