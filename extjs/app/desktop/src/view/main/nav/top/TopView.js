Ext.define('extjs.view.main.nav.top.TopView', {
    extend: 'Ext.Toolbar',
    xtype: 'topview',
    cls: 'topview',
    viewModel: {},
    shadow: false,
    items: {
        xtype: 'container',
        layout: 'vbox',
        width: '100%',
        items: [
            {
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                items: [
                    {
                        xtype: 'container', 
                        cls: 'topviewtext',
                        bind: { 
                            html: '{name}',
                            hidden: '{navCollapsed}' 
                        }
                    },
                    {
                        xtype: 'button',
                        ui: 'topviewbutton',
                        reference: 'navtoggle',
                        handler: 'onTopViewNavToggle',
                        bind: {
                            iconCls: '{navToggleIcon}',
                            cls: '{navToggleCls}',
                        }
                    }
                ]
            },
            {
                cls: 'welcome',
                bind: {
                    html: '{welcomeText}',
                    hidden: '{navCollapsed}'
                }
            }
        ]
    }
});