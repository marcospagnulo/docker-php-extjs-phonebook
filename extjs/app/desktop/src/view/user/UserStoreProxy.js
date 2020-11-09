Ext.define('extjs.view.user.UserStoreProxy', {
    extend: 'Ext.data.proxy.Ajax' ,
    alias: 'proxy.userstore',
    model: 'User',
    reader: 'json'
});