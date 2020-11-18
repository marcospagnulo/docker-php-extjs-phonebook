Ext.define('extjs.view.user.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userviewcontroller',

    onAddClick: function(btn){

        var vm = this.getViewModel();
        var addUserOpen = !vm.get('addUserOpen');

        vm.set('addUserOpen', addUserOpen);
        if(!addUserOpen){
            vm.set('userModel', null);
        }
    },

    onSubmitUser: function(){

        var vm = this.getViewModel();
        var form = this.lookup('form');
        
        form.validate();
        if(form.isValid()){
            vm.set('loading', true);
            App.service.UserService.save(
                form.getValues(), 
                this.onSuccess, 
                this.onFailure, 
                vm
            );
        } else {
            Ext.Msg.show({
               title: "Save user",
               message: "Please fill all fields.",
               buttons: Ext.MessageBox.OK,
               icon: Ext.MessageBox.WARNING
           });
        }
    },

    onEditClick: function (btn) {
        
        var record = btn.up().up()._record;
        var vm = this.getViewModel();

        vm.set('addUserOpen', true);
        vm.set('userModel', record.data);
    },

    onDeleteClick: function (btn) {

        var record = btn.up().up()._record;

        Ext.Msg.confirm("Confirmation", "Confirm to delete user id " + record.data.id + "?", function (btn) {
            if (btn == 'yes') {
                App.service.UserService.delete(
                    record.data.id, 
                    controller.onSuccess, 
                    controller.onFailure,
                    controller.getViewModel(),
                    grid.store.currentPage
                );
            }
        });
    },

    onEditComplete: function (grid, location) {
        App.service.UserService.save(
            location.record.data, 
            this.onSuccess, 
            this.onFailure,
            this.getViewModel(),
            grid.store.currentPage
        );
    },

    onSuccess: function(vm, currentPage){
        vm.set('loading', false);
        var store = vm.getStore('user');
        store.load({ page: currentPage, limit: 25});
        Ext.toast({message: 'Operation completed', timeout: 2000})
    },

    onFailure: function(response, vm){
        vm.set('loading', false);
        Ext.toast({message: 'Unable to complete operation', timeout: 2000})
    }
});
