Ext.define('stock.view.CarList', {
    extend: 'Ext.Container',
    xtype: 'carlist',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'stock.form.Course'
    ],
    config: {
        cls: 'car-list-page',
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Choisissez un véhicules',
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
                    }/*,
                    {
                       xtype: 'button',
                       text: '',
                       iconCls: 'fa fa-plus',
                       cls: 'open-socials',
                       action: 'add-car'
                   }*/
               ]
           },
           {
                style: 'margin: 10px 30px',
                align: 'center',
                items:[
                     {
                        title: 'Véhicules',
                        iconCls: 'bookmarks',
                        style: 'overflow:hidden',
                        width: '100%',
                        action:'listecar',
                        height: '100%',
                        xtype: 'list',
                        store: 'Cars',
                        cls: 'car-list',
                         itemTpl: '<div class="car-item">'+
                         '<img src="{photo}" class="float-left valet-avatar" alt="img">'+
                         '<span class="valet-dist valet-near" style="background-color: {color};">{name}</span>'+
                         '<h2>{brand} {model}</h2>'+
                         '<span class="valet-address">{description}</span>'+
                         '</div>',
                        grouped: false,
                        pinHeaders: false,
                        plugins: [
                            {
                                xclass: 'Ext.plugin.ListPaging',
                                autoPaging: true,
                                loadMoreText: 'Chargement...',
                                noMoreRecordsText: 'Pas plus d\'enregistrements'
                            },
                            {
                                xclass: 'Ext.plugin.PullRefresh',
                                pullText: 'Glissez vers le bas pour rafraichir.',
                                releaseText:'Relachez pour rafraichir.',
                                loadingText: 'Chargement en cours ...',
                                loadedText: 'Chargement reussi.',
                                lastUpdatedText: 'Mise à jour:  '
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
