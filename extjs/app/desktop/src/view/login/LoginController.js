Ext.define('extjs.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

	initViewModel: function(vm){
        vm.set('loading', false);
    },

    onLoginClick: function() {

        this.getViewModel().set('loading', true);
        var form = this.lookup('form').getValues();
        var controller = this;

        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/login?XDEBUG_SESSION_START=PHPSTORM',
            method: 'POST',
            params: form,
            success: function(response, opts) {
                
                controller.getViewModel().set('loading', false);

                var user = Ext.decode(response.responseText);

                // Set the localStorage value to true
                localStorage.setItem("user", Ext.encode(user));
        
                // Remove Login Window
                controller.getView().destroy();
        
                // Add the main view to the viewport
                Ext.Viewport.add([{xtype: 'mainview'}]);
            },
       
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                controller.getViewModel().set('loading', false);
            }
        });

    }
});