Ext.define('extjs.view.user.UserView',{
    extend: 'Ext.Container',
    xtype: 'userview',
    cls: 'userview',
    layout: 'fit',
    controller: {type: 'userviewcontroller'},
    viewModel: {type: 'userviewmodel'},
    requires: ['Ext.grid.rowedit.Plugin'],
    items: [
        {
            xtype: 'panel',
            layout: 'fit',
            docked: 'left',
            bind: { width: '{grid_width}' },
            items: [
                {
                  xtype: 'grid',
                  bind: {
                      store: '{user}'
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
                          text: 'Role',
                          dataIndex: 'role',
                          editable: true,
                          width: 70
                      },
                      {
                          cell: {
                              xtype: 'gridcell',
                              encodeHtml: false
                          },
                          tpl: '<i class="fa fa-trash" style="cursor: pointer;"></i>',
                          width: 20,
                      }
                  ],
                  listeners: {
                      edit: 'onEditComplete',
                      itemtap: 'onItemTap'
                  }
                },
                {
                    xtype: 'button',
                    ui: 'round',
                    handler: 'onAddClick',
                    cls: 'floating',
                    bind: { 
                        iconCls: '{addBtnCls}'
                    }
                }
            ]
        },
        {
            xtype: 'formpanel',
            reference: 'form',
            layout: 'vbox',
            width: '40%',
            docked: 'right',
            modelValidation: true,
            items: [
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
                    bind: '{userModel.role}',
                    name: 'role',
                    label: 'Role',
                    required: true,
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
