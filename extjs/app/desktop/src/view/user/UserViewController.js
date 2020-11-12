Ext.define('extjs.view.user.UserViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userviewcontroller',

    launch: function(){
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    },

    onItemTap: function (grid, index, target, record, e) {
        
        var controller = this;

        if (e.target.classList.contains("fa-trash") || e.target.children[0] && e.target.children[0].classList.contains("fa-trash")) {
            Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function (btn) {
                if (btn == 'yes') {
                    App.service.UserService.delete(
                        record.data.id, 
                        controller.onSuccess, 
                        controller.onFailure, 
                        grid.store.currentPage, 
                        controller.getViewModel()
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
            grid.store.currentPage, 
            this.getViewModel()
        );
    },

    onSuccess: function(page, limit, vm){
        vm.getView().getStore().load({ page: page, limit: limit});
        Ext.toast({message: 'Operation completed', timeout: 2000})
    },

    onFailure: function(response, vm){
        Ext.toast({message: 'Unable to complete operation', timeout: 2000})
    }
});
