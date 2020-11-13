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
                  store: {type: 'userviewstore'},
                  plugins: {
                      rowedit: {
                          autoConfirm: false,
                          clicksToEdit: 1
                      },
                      pagingtoolbar: true
                  },
                  columns: [
                      {
                          text: 'Name',
                          dataIndex: 'name',
                          editable: true,
                          width: 100,
                          cell: {userCls: 'bold'}
                      },
                      {
                          text: 'Surname',
                          dataIndex: 'surname',
                          editable: true,
                          width: 100,
                          cell: {userCls: 'bold'}
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
        }
    ]
});
