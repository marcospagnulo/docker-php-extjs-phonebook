Ext.define('App.service.UserService', {

    singleton: true,

    save: function(user, onSuccess, onFailure, vm, currentPage){
        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/save?XDEBUG_SESSION_START=PHPSTORM',
            method: 'POST',
            params: user,
            success: function(response, opts) {
                onSuccess(vm);
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