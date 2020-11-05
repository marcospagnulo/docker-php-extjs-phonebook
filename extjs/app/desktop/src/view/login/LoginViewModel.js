Ext.define('extjs.view.main.MainViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.loginviewmodel',
	data: {
		loading: false,
		remember: false,
		email: null,
		password: null
	}
});
