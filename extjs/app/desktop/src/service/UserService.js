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
                
                var message;
                switch(response.status){
                    case 0:
                        message = 'Service unavailable';
                        break;
                    case 401:
                        message = 'Wrong credentials';
                        break;
                    case 500:
                        message = 'Error during login';
                        break;
                }
                
                context.onLoginFailure(message);
            }
        });
    },

    save: function(user, onSuccess, onFailure, vm, currentPage){
        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/save?XDEBUG_SESSION_START=PHPSTORM',
            method: 'POST',
            params: user,
            success: function(response, opts) {
                onSuccess(vm, currentPage);
            },
            failure: function(response, opts) {
                onFailure(response, vm);
            }
        });
    },

    delete: function(id, onSuccess, onFailure, vm, currentPage){
        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/delete?id=' + id,
            method: 'DELETE',
            success: function(response, opts) {
                onSuccess(vm, currentPage);
            },
            failure: function(response, opts) {
                onFailure(response, vm, currentPage);
            }
        });
    }

});