Ext.define('extjs.view.user.UserViewStore', {
    extend: 'Ext.data.Store',
    alias: 'store.userviewstore',
    model: 'User',
    proxy: {
        url: 'http://localhost:8080/rest/users',
        type: 'userstore'
    }
});