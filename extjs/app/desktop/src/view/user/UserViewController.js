Ext.define('extjs.view.user.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userviewcontroller',

    onAddClick: function(btn){

        var vm = this.getViewModel();
        var addUserOpen = !vm.get('addUserOpen');
        var form = this.lookup('form');
        form.clearErrors();

        vm.set('addUserOpen', addUserOpen);
        if(!addUserOpen){
            vm.set('userModel', null);
        }
    },

    onEditClick: function (btn) {
        
        var record = btn.up().up()._record;
        var vm = this.getViewModel();

        vm.set('addUserOpen', true);
        vm.set('userModel', record.data);
    },

    onSubmitUser: function(){

        var vm = this.getViewModel();
        var form = this.lookup('form');
        
        form.validate();
        if(form.isValid()){
            vm.set('loading', true);
            App.service.UserService.save(
                form.getValues(), 
                this
            );
        }
    },

    onDeleteClick: function (btn) {

        var record = btn.up().up()._record;
        var controller = this;

        Ext.Msg.confirm("Confirmation", "Confirm to delete user id " + record.data.id + "?", function (btn) {
            if (btn == 'yes') {
                App.service.UserService.delete(
                    record.data.id, 
                    controller
                );
            }
        });
    },

    onEditComplete: function (grid, location) {
        App.service.UserService.save(
            location.record.data, 
            this
        );
    },

    onSuccess: function(){
        
        var vm = this.getViewModel();
        vm.set('loading', false);

        var store = vm.getStore('user');
        store.load({ page: store.currentPage, limit: 25});
        
        Ext.toast({message: 'Operation completed', timeout: 2000})
    },

    onFailure: function(message){
        this.getViewModel().set('loading', false);
        Ext.toast({message: message, timeout: 2000})
    }
});
