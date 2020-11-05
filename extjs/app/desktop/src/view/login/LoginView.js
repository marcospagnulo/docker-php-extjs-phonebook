Ext.define('extjs.view.login.LoginView', {
    extend: 'Ext.Container',
    xtype: 'loginview',
    viewModel: {
        type: 'loginviewmodel'
    },

    requires: [
        'extjs.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items: [{
        xtype: 'formpanel',
        reference: 'form',
        layout: 'vbox',
        ui: 'auth',
        items: [{
            xtype: 'textfield',
            name: 'email',
            label: 'Email',
            required: true
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            label: 'Password',
            required: true
        }, {
            xtype: 'button',
            text: 'LOG IN',
            iconAlign: 'right',
            iconCls: 'x-fa fa-angle-right',
            handler: 'onLoginClick',
            ui: 'action',
            bind: {
                disabled: '{loading}'
            }
        }]
    }]
});