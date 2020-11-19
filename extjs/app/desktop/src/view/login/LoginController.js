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

        App.service.UserService.login(
            this,
            form
        );
    },

    onLoginSuccess: function(response){

        var controller = this;
        
        // Enble login button
        controller.getViewModel().set('loading', false);
        
        // Set the localStorage value to true
        var user = Ext.decode(response.responseText);
        App.util.State.set('user', user);

        // Remove Login Window
        controller.getView().destroy();

        // Add the main view to the viewport
        Ext.Viewport.add([{xtype: 'mainview'}]);
    },

    onLoginFailure: function(message){
        // Show error and reactivate login button
        this.getViewModel().set('loading', false);
        Ext.toast({message: message, timeout: 2000})
    }
});