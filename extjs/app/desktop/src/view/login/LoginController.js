Ext.define('extjs.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    bind: {
        email: '{email}',
        password: '{password}'
    },
    onLoginClick: function() {

        var form = this.lookup('form').getValues();
        var controller = this;

        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/login?XDEBUG_SESSION_START=PHPSTORM',
            method: 'POST',
            params: form,
            success: function(response, opts) {
                
                var obj = Ext.decode(response.responseText);
                console.dir(obj);

                // Set the localStorage value to true
                localStorage.setItem("logged", true);
        
                // Remove Login Window
                controller.getView().destroy();
        
                // Add the main view to the viewport
                Ext.Viewport.add([{xtype: 'mainview'}]);
            },
       
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    }
});