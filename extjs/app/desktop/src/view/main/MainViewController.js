Ext.define('extjs.view.main.MainViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.mainviewcontroller',

	routes: { 
		':xtype': {action: 'mainRoute'}
	},

	initViewModel: function(vm){
		var user = App.util.State.get('user');
		vm.set('user', user);
		this.getViewModel().getStore('menu').on({
			load: 'onMenuDataLoad',
			single: true,
			scope: this
		});
	},
	
	init: function() {
	},

	onMenuDataLoad: function(store){
		this.mainRoute(Ext.util.History.getHash());
	},
	
	lastView: null,

	mainRoute:function(xtype) {

		var navview = this.lookup('navview'),
			menuview = navview.lookup('menuview'),
			centerview = this.lookup('centerview'),
			exists = Ext.ClassManager.getByAlias('widget.' + xtype),
			node, vm;

		node = this.getViewModel().getStore('menu').findNode('xtype', xtype);
		
		centerview.setActiveItem(this.lookup(xtype));
		menuview.setSelection(node);
		vm = this.getViewModel(); 
		vm.set('heading', node.get('text'));
	},

	onMenuViewSelectionChange: function (tree, node) {
		if (node == null) { return }

		var vm = this.getViewModel();

		if (node.get('xtype') != undefined) {
			this.redirectTo( node.get('xtype') );
		}
	},

	onTopViewNavToggle: function () {
		var vm = this.getViewModel();
		vm.set('navCollapsed', !vm.get('navCollapsed'));
	},

	onHeaderViewDetailToggle: function (button) {
		
		var vm = this.getViewModel();

		vm.set('detailCollapsed', !vm.get('detailCollapsed'));

		if(vm.get('detailCollapsed')===true) {
			button.setIconCls('x-fa fa-arrow-left');
		}
		else {
			button.setIconCls('x-fa fa-arrow-right');
		}
	},

	onLogout: function () {
		App.util.State.clear('user')
		this.getView().destroy();
		Ext.Viewport.add([{ xtype: 'loginview'}]);
	}
});
