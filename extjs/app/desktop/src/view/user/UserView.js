Ext.define('extjs.view.user.UserView', {
    extend: 'Ext.Container',
    xtype: 'userview',
    cls: 'userview',
    layout: 'hbox',
    fullscreen: true,
    controller: { type: 'userviewcontroller' },
    viewModel: { type: 'userviewmodel' },
    requires: ['Ext.grid.rowedit.Plugin'],
    items: [
        // Grid
        {
            xtype: 'grid',
            reference: 'usergrid',
            docked: 'left',
            bind: {
                store: '{user}',
                width: '{userGridWidth}'
            },
            plugins: {
                rowedit: {
                    autoConfirm: false,
                    clicksToEdit: 1
                },
                pagingtoolbar: true
            },
            columns: [
                {
                    text: 'Id',
                    dataIndex: 'id',
                    editable: true,
                    width: 50,
                },
                {
                    text: 'Name',
                    dataIndex: 'name',
                    editable: true,
                    width: 100,
                },
                {
                    text: 'Surname',
                    dataIndex: 'surname',
                    editable: true,
                    width: 100,
                },
                {
                    text: 'Email',
                    dataIndex: 'email',
                    editable: true,
                    width: 230
                },
                {
                    text: 'Phone',
                    dataIndex: 'phone',
                    editable: true,
                    width: 230
                },
                {
                    text: 'Address',
                    dataIndex: 'address',
                    editable: true,
                    width: 230
                },
                {
                    text: 'Role',
                    dataIndex: 'role',
                    editable: true,
                    width: 100,
                    renderer: function(value){
                        return value == 1 ? 'Admin' : 'User';
                    },
                    editor: {
                        xtype: 'selectfield',
                        options: [
                            { text: 'Admin', value: '1' },
                            { text: 'User', value: '2' }
                        ]
                    }
                },
                {
                    cell: {
                        xtype: 'widgetcell',
                        widget: {
                            xtype: 'panel',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-trash',
                                    handler: 'onDeleteClick'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-edit',
                                    handler: 'onEditClick'
                                }
                            ]
                        }
                    },
                    width: 64
                },
            ],
            listeners: {
                edit: 'onEditComplete'
            }
        },
        // Floating action
        {
            xtype: 'button',
            docked: 'right',
            cls: 'floating',
            ui: 'round',
            handler: 'onAddClick',
            bind: {
                iconCls: '{addBtnCls}'
            }
        },
        // Add user form
        {
            xtype: 'formpanel',
            reference: 'form',
            layout: 'vbox',
            docked: 'right',
            width: '20%',
            modelValidation: true,
            items: [
                {
                    xtype: 'textfield',
                    bind: '{userModel.id}',
                    name: 'id',
                    label: 'Id',
                    editable: false,
                    clearable: false

                },
                {
                    xtype: 'textfield',
                    bind: '{userModel.name}',
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
                {
                    xtype: 'textfield',
                    bind: '{userModel.surname}',
                    name: 'surname',
                    label: 'Surname',
                    required: true,
                },
                {
                    xtype: 'textfield',
                    bind: '{userModel.email}',
                    name: 'email',
                    label: 'Email',
                    required: true,
                },
                {
                    xtype: 'textfield',
                    bind: '{userModel.phone}',
                    name: 'phone',
                    label: 'Phone'
                },
                {
                    xtype: 'textfield',
                    bind: '{userModel.address}',
                    name: 'address',
                    label: 'Address',
                },
                {
                    xtype: 'selectfield',
                    label: 'Select a role',
                    bind: '{userModel.role}',
                    name: 'role',
                    label: 'Role',
                    required: true,
                    options: [
                        { text: 'Admin', value: '1' },
                        { text: 'User', value: '2' }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'SUBMIT',
                    iconAlign: 'right',
                    handler: 'onSubmitUser',
                    ui: 'action',
                    bind: { disabled: '{loading}' }
                }
            ]
        }
    ]
});
