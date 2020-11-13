Ext.define('App.service.UserService', {

    singleton: true,

    save: function(user, onSuccess, onFailure, store){
        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/save',
            method: 'POST',
            params: user,
            success: function(response, opts) {
                onSuccess(store);
            },
            failure: function(response, opts) {
                onFailure(response, store);
            }
        });
    },

    delete: function(id, onSuccess, onFailure, store){
        Ext.Ajax.request({
            url: 'http://localhost:8080/rest/users/delete?id=' + id,
            method: 'DELETE',
            success: function(response, opts) {
                onSuccess(store);
            },
            failure: function(response, opts) {
                onFailure(response, store);
            }
        });
    }

});