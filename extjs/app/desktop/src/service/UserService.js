Ext.define('App.service.UserService', {

    singleton: true,

    login: function(context, loginData){
        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/login',
            method: 'POST',
            params: loginData,
            success: function(response, opts) {
                context.onLoginSuccess(response);
            },
            failure: function(response, opts) {
                var message = this.messageFromResponseStatus(response.status);
                context.onLoginFailure(message);
            }
        });
    },

    save: function(user, context){
        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/save?XDEBUG_SESSION_START=PHPSTORM',
            method: 'POST',
            params: user,
            success: function(response, opts) {
                context.onSuccess(response);
            },
            failure: function(response, opts) {
                var message = this.messageFromResponseStatus(response.status);
                context.onFailure(message);
            }
        });
    },

    delete: function(id, context){
        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/delete?id=' + id,
            method: 'DELETE',
            success: function(response, opts) {
                context.onSuccess(response);
            },
            failure: function(response, opts) {
                var message = this.messageFromResponseStatus(response.status);
                context.onFailure(message);
            }
        });
    },

    messageFromResponseStatus: function(status){
        switch(status){
            case 0:
                return 'Service unavailable';
            case 401:
                return 'Wrong credentials';
            case 500:
                return 'Error during login';
        }
    }
});