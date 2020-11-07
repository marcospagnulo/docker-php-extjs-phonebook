Ext.define('extjs.view.main.nav.NavView', {
    extend: 'Ext.Panel',
    xtype: 'navview',
    controller: "navviewcontroller",
    cls: 'navview',
    viewModel: {},
    layout: 'fit',
    tbar: {xtype: 'topview'},
    items: [ 
        {
            xtype: 'menuview', 
            reference: 'menuview', 
            bind: {width: '{menuview_width}'}, 
            listeners: { 
                selectionchange: "onMenuViewSelectionChange"
            }
        }
    ],
    bbar: {
        xtype: 'bottomview', 
        bind: {height: '{bottomview_height}'},
        items : [
            {
                xtype: 'button',
                bind: {width: '100%'}, 
                iconAlign: 'right',
                iconCls: 'x-fa fa-sign-out-alt',
                handler: 'onLogoutClick',
                ui: 'normal',
                bind: {
                    text: '{logoutText}',
                    cls: '{logoutCls}'
                }
            }
        ]
    }
});
