Ext.define('stock.view.CarAdd', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'stock.form.Car'
    ],
    config: {
        cls: 'car-list-page',
        fullscreen: true,
        width: '100%',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [
           {
                docked: 'top',
                xtype: 'toolbar',
                action: 'valettitle',
                title: 'Nouveau véhicule',
                cls: 'header',
                items: [
                    {
                        xtype: 'button',
                        text: '',
                        iconCls: 'fa fa-navicon',
                        cls: 'open-socials',
                        handler: function(){
                            stock.utils.Config.toggleMenu();
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype : 'button',
                        hidden: false,
                        ui    : 'decline',
                        action: 'back',
                        iconCls: 'fa fa-arrow-left',
                        cls: 'open-socials',
                        text  : ''
                    }
                ]
            },
            {
                style: 'padding: 10px 30px',
                align: 'center',
                action: 'affiche-fiche-valet',
                width: '100%'
            },
            {
                xtype: 'formCar',
                width: '100%',
                height: '100%'
            }
        ]
    },
    setRecord: function (record) {
        if (this.down('[action=enregistrercar]')) {
             this.down('[action=enregistrercar]').setRecord(record);
        }
        if (this.down('[xtype=formCar]'))
            this.down('[xtype=formCar]').setRecord(record);
    }
});
