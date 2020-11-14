Ext.define('extjs.view.user.UserViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.userviewmodel',
	stores: { 
		user: {
			type: 'userviewstore'
		} 
	},
	data: {
		grid_width: '100%',
		loading: false,
		addBtnCls: 'white x-fa fa-plus',
		aaddUserOpen: false,
		userModel: null
	},
	formulas: {
		addBtnCls: function(get) {
			var cls = 'white x-fa';
			var addUserOpen = get('addUserOpen');
			if(addUserOpen){
				return cls + ' fa-times';
			} else {
				return cls + (get('userModel') != null ? ' fa-edit' : ' fa-plus');
			}
		}
	}
});
