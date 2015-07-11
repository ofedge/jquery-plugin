(function($){
	// add node click function (private)
	var clickBtn = function(){
		if (isClickBtn) return;
		var icons = $.fn.bootstrapTree.settings.icons;
		var openedNodeIcon = icons.openedNodeIcon;
		var closedNodeIcon = icons.closedNodeIcon;
		$('.tree li.parent_li > span').on('click', function(e) {
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
		isClickBtn = true;
	};
	// functions
	var method = {
			closeAll: function() {
				$('.tree li.parent_li > span').each(function(){
					if($(this).parent('li.parent_li').find(' > ul > li').is(':visible'))
						$(this).trigger('click', $.fn.bootstrapTree.settings.icons);
				});
			},
			openAll: function() {
				$('.tree li.parent_li > span').each(function(){
					if($(this).parent('li.parent_li').find(' > ul > li').is(':hidden'))
						$(this).trigger('click', $.fn.bootstrapTree.settings.icons);
				});
			},
			init: function() {
				isClickBtn = false;
				clickBtn();
			},
			destroy: function() {
				$('.tree li.parent_li > span').off('click');
			}
	};
	
	// init mark (private)
	var isInit = false;
	// click button mark (private)
	var isClickBtn = false;
	
	// init (private)
	var init = function(options){
		var icons = $.fn.bootstrapTree.settings.icons;
		var openedNodeIcon = icons.openedNodeIcon;
		var leafNodeIcon = icons.leafNodeIcon;
		$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('node-status', 'open');
		$('.tree li:has(ul)').find(' > span').prepend('<span class="glyphicon ' + openedNodeIcon + '" aria-hidden="true"></span>');
		$('.tree li[class!=parent_li]').find(' > span').prepend('<span class="glyphicon ' + leafNodeIcon + '" aria-hidden="true"></span>');
		isInit = true;
	};
	
	$.fn.bootstrapTree = function(options) {
		if (!isInit) {
			$.fn.bootstrapTree.settings = (typeof options == 'object') ? $.extend(true, {}, $.fn.bootstrapTree.defaults, options) : $.fn.bootstrapTree.defaults;
			$(this).addClass('tree');
			init();
		};
		clickBtn();
		var settings = $.fn.bootstrapTree.settings;
		return this.each(function(){
			var $this = $(this);
			// when event
			if (typeof options == 'string') {
				if (options == 'closeAll') { method.closeAll(); };
				if (options == 'openAll') { method.openAll(); };
				if (options == 'destroy') { method.destroy(); };
				if (options == 'init') { method.init(); };
			};
			// when parameter
			if (typeof options == 'object') {
				//icon
				var openedNodeIcon = settings.icons.openedNodeIcon;
				var closedNodeIcon = settings.icons.closedNodeIcon;
				var leafNodeIcon = settings.icons.leafNodeIcon;
				// openOnLoad
				if(!settings.openOnLoad) {
					$('.tree li.parent_li > span').attr('node-status', 'closed').find(' > span').removeClass(openedNodeIcon).addClass(closedNodeIcon);
					$('.tree li.parent_li').find(' > ul > li').hide();
				};
				
			};
		});
	};
	// default parameter
	$.fn.bootstrapTree.defaults = {
			bootstrapversion: 3,
			openOnLoad: true,
			icons: {
				openedNodeIcon: 'glyphicon-minus',
				closedNodeIcon: 'glyphicon-plus',
				leafNodeIcon: 'glyphicon-leaf'
			}
	};
})(window.jQuery);