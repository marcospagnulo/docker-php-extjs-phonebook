Ext.define('extjs.view.login.LoginViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.loginviewmodel',
	data: {
		loading: false,
		remember: false,
		email: null,
		password: null
	}
});
