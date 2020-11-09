Ext.define('extjs.view.user.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userviewcontroller',

	initViewModel: function(vm){
        var store = vm.getView().getStore();
        store.load();
    },

    onEditCancelled: function (editor, value, startValue, eOpts) {
        var user = Ext._find(value.record.store.config.data.items, { name: value.record.data.name });
        Ext.Msg.confirm('Confirm', value.record.data.name + ': ' + user.phone + ' is phone number', 'onConfirm', this);
    }
});
