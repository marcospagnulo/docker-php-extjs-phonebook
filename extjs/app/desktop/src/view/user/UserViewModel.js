Ext.define('extjs.view.user.UserViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.userviewmodel',
	stores: {
		user: {
			type: 'userviewstore'
		}
	},
	data: {
		userGridWidth: '100%',
		loading: false,
		addBtnCls: 'white x-fa fa-plus',
		addUserOpen: false,
		userModel: null
	},
	formulas: {
		addBtnCls: function (get) {
			var cls = 'white x-fa';
			var addUserOpen = get('addUserOpen');
			return cls + (addUserOpen ? ' fa-times' : ' fa-plus');
		},
		userGridWidth: function (get) {
			return get('addUserOpen') ? '80%' : '100%';
		}
	}
});
