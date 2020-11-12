Ext.define('extjs.view.user.UserView',{
    extend: 'Ext.grid.Grid',
    xtype: 'userview',
    cls: 'userview',
    requires: ['Ext.grid.rowedit.Plugin'],
    controller: {type: 'userviewcontroller'},
    viewModel: {type: 'userviewmodel'},
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
            width: 50
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
});
