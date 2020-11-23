Ext.define('extjs.view.main.center.CenterView', {
	extend: 'Ext.Container',
    requires: [
        'extjs.view.user.UserView',
        'extjs.view.home.HomeView',
        'extjs.view.calendar.CalendarView'
    ],
	xtype: 'centerview',
	cls: 'centerview',
	layout: 'card',
	items: [
        {
            xclass: 'extjs.view.home.HomeView',
            reference: 'homeview'
        },
        {
            xclass: 'extjs.view.user.UserView',
            reference: 'userview'
        },
        {
            xclass: 'extjs.view.calendar.CalendarView',
            reference: 'calendarview'
        }
	]
});
