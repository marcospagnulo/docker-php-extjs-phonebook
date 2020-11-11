Ext.define('extjs.view.user.UserStoreProxy', {
    extend: 'Ext.data.proxy.Ajax' ,
    alias: 'proxy.userproxy',
    model: 'User',
    startParam: '',
    reader: {
        type: 'json',
        rootProperty: 'data',
        totalProperty: 'count'
    }
});