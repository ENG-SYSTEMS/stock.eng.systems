Ext.define('stock.view.Validated', {
    extend: 'Ext.Panel',
    xtype: 'validated',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List'
    ],
    config: {
        cls: 'buy-page',
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Course validée.',
               cls: 'header'
           },
            {
                style: 'margin: 10px 30px',
                align: 'center',
                html: '<h1 class="msg-buy">La course a été validée avec succés</h1>'
            },
            {
                align: 'center',
                xtype: 'button',
                action: 'back',
                text: 'Retour à mes courses en cours.',
                badgeText: '2'
            }
        ]
    }
});
