Ext.define('extjs.Application', {
	extend: 'Ext.app.Application',
	name: 'extjs',
	requires: ['extjs.*'],
	defaultToken: 'homeview',

	removeSplash: function () {
		Ext.getBody().removeCls('launching')
		var elem = document.getElementById("splash")
		elem.parentNode.removeChild(elem)
	},

	launch: function () {
		
		var remember = App.util.State.get('remember')
		if(remember){
			var lastLogin = App.util.State.get('lastLogin');
			App.service.UserService.login(
				this,
				lastLogin
			);
		}
	},

	onLoginSuccess: function(response){
		this.removeSplash();
		Ext.Viewport.add([{xtype: 'mainview'}])
	},

	onLoginFailure: function(message){
		this.removeSplash();
		Ext.Viewport.add([{xtype: 'loginview'}])
        Ext.toast({message: message, timeout: 2000})
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
