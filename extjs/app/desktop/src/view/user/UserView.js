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
            autoConfirm: false
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
            text: 'Email',dataIndex: 'email',editable: true, width: 230
        },
        {
            text: 'Role',
            dataIndex: 'role',
            editable: true,
            width: 150
        }
    ],
    listeners: {
        edit: 'onEditComplete'
    }
});
