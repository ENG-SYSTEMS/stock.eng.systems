Ext.define('stock.view.Waiting', {
    extend: 'Ext.Panel',
    xtype: 'buy',
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
               title: 'Identification du scan.',
               cls: 'header'
           },
           {
                style: 'margin: 10px 30px',
                align: 'center',
               html: '<h1 class="msg-buy">Veuillez patienter, nous procédons l\'identification du client ...</h1>'
            }
        ]
    }
});
