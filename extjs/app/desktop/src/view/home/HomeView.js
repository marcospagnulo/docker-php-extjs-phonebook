Ext.define('extjs.view.home.HomeView', {
	xtype: 'homeview',
	cls: 'homeview',
	controller: { type: 'homeviewcontroller' },
	viewModel: { type: 'homeviewmodel' },
	requires: [],
	extend: 'Ext.Container',
	scrollable: true,
	html: `<div style="user-select: text !important;">Welcome to PhoneBook application!</div>`,
});