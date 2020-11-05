Ext.define('extjs.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires: ['Ext.Toast'],

	initViewModel: function(vm){
        vm.set('loading', false);
        vm.set('remember', App.util.State.get('remember'));
        var lastLogin = App.util.State.get('lastLogin');
        if(lastLogin){
            vm.set('email', lastLogin.email);
            vm.set('password', lastLogin.password);
        }
    },

    onLoginClick: function() {
        
        var controller = this;
        var form = this.lookup('form').getValues();
        if(form.remember){
            App.util.State.set('lastLogin', {email: form.email, password: form.password});
            App.util.State.set('remember', true);
        } else {
            App.util.State.clear('lastLogin');
            App.util.State.clear('remember');
        }

        // Disable login button
        this.getViewModel().set('loading', true);

        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/login?XDEBUG_SESSION_START=PHPSTORM',
            method: 'POST',
            params: form,
            success: function(response, opts) {
                
                // Enble login button
                controller.getViewModel().set('loading', false);
                
                // Set the localStorage value to true
                var user = Ext.decode(response.responseText);
                localStorage.setItem("user", Ext.encode(user));
        
                // Remove Login Window
                controller.getView().destroy();
        
                // Add the main view to the viewport
                Ext.Viewport.add([{xtype: 'mainview'}]);
            },
       
            failure: function(response, opts) {
                // Show error and reactivate lògin button
                controller.getViewModel().set('loading', false);
                Ext.toast({message: 'Wrong credentials', timeout: 2000})
            }
        });

    }
});