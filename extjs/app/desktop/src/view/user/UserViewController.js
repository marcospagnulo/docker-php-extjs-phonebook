Ext.define('extjs.view.user.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userviewcontroller',

    onAddClick: function(btn){

        var vm = this.getViewModel();
        var addUserOpen = vm.get('addUserOpen');

        vm.set('addUserOpen', !addUserOpen)
        vm.set('grid_width', addUserOpen ? '100%' : '60%');
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

    onItemTap: function (grid, index, target, record, e) {
        
        var controller = this;
        var vm = controller.getViewModel();
        vm.set('userModel', record.data);
        vm.set('addBtnCls', 'white x-fa fa-edit');

        if (e.target.classList.contains("fa-trash") || e.target.children[0] && e.target.children[0].classList.contains("fa-trash")) {

            Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function (btn) {
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
        }
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
