Ext.define('stock.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'Ext.tab.Panel',
        'Ext.Menu',
        'Ext.Anim',
        'Ext.util.Geolocation',
        'stock.form.Profil'
    ],
    id: 'mainCard',
    config: {
        cls: 'valet-list-page',
        fullscreen: true,
        scrollable : {
            direction     : 'vertical',
            directionLock : true
        },
        width: '100%',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                action: 'paramtitle',
                title: 'Paramètres',
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
                     xtype : 'button',
                     hidden: false,
                     ui    : 'decline',
                     action: 'back',
                     iconCls: 'fa fa-arrow-left',
                     cls: 'open-socials',
                     text  : ''
                     }*/
                ]
            },
            {
                cls: 'histo-item',
                width: '80%',
                style: 'overflow: hidden',
                items: [
                    {
                        html: '<h2>Lieu de travail</h2><p>Sélectionnez votre lieu de prise en charge. Il est utilisé afin que vos clients puissent vous géolocaliser et vous trouver depuis leur application.</p>'
                    },
                    {
                        xtype: 'selectfield',
                        name: 'lieu',
                        label: '',
                        cls: 'ypm-input-pink large',
                        labelWidth: '0%',
                        clearIcon: false,
                        autoCapitalize: false,
                        required      : 1,
                        options: [
                            {text: 'Lieu de travail', value: ''},
                            {text: 'Blanc', value: '#ffffff'},
                            {text: 'Gris clair', value: '#cdcdcd'},
                            {text: 'Gris foncé', value: '#6d6d6d'},
                            {text: 'Noir', value: '#000000'},
                            {text: 'Rouge', value: '#ff0000'},
                            {text: 'Vert', value: '#00ff00'},
                            {text: 'Bleu', value: '#0000ff'},
                            {text: 'Orange', value: '#ff4000'}
                        ]
                    },
                    {
                        xtype: 'button',
                        action: 'validelieubutton',
                        text: 'Valider',
                        cls: 'ypm-button large'
                    }
                ]
            },
            {
                cls: 'histo-item',
                width: '80%',
                style: 'overflow: hidden',
                items: [
                    {
                        html: '<h2>Horaires de travail</h2><p>Ces informations sont saisie afin d\'informer vos clients de vos horaires. Ils n\'ont aucune influence sur votre disponibilité dasn l\'application qui est gérée depuis le bouton "En ligne" du menu.</p>'
                    },
                    {
                        items: [
                            {
                                html: '<b>Le matin</b>'

                            },
                            {
                                xtype: 'timepickerfield',
                                name: 'workingHourMorningStart',
                                label: 'De',
                                labelWidth: '30%',
                                cls: 'ypm-input-pink',
                                clearIcon: false,
                                action: 'workingMorningStart',
                                required      : 0
                            },
                            {
                                xtype: 'timepickerfield',
                                name: 'workingHourMorningEnd',
                                label: 'A',
                                labelWidth: '30%',
                                cls: 'ypm-input-pink',
                                action: 'workingMorningEnd',
                                clearIcon: false,
                                required      : 0
                            }
                        ]
                    },
                    {
                        items: [
                            {
                                html: '<b>L\'après-midi</b>',

                            },
                            {
                                xtype: 'timepickerfield',
                                name: 'workingHour',
                                label: 'De',
                                labelWidth: '30%',
                                cls: 'ypm-input-pink',
                                clearIcon: false,
                                action: 'workingStart',
                                required      : 0
                            },
                            {
                                xtype: 'timepickerfield',
                                name: 'workingHour',
                                label: 'A',
                                labelWidth: '30%',
                                cls: 'ypm-input-pink',
                                action: 'workingEnd',
                                clearIcon: false,
                                required      : 0
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        action: 'validelieubutton',
                        text: 'Valider',
                        cls: 'ypm-button large'
                    }
                ]
            }
        ],
        listeners: {
            initialize: function(item){
                //initialisation de l'ecouteur pour les adresses
                /*var me = this;
                stock.utils.Config.addListener('locationUpdate',function () {
                    console.log('location update ',stock.utils.Config.getAddress());
                    me.updateAddress(stock.utils.Config.getAddress());
                });
                me.updateAddress(stock.utils.Config.getAddress());*/

                //ecouteur nombre de crédits
                /*stock.utils.Config.addListener('creditupdate',function () {
                    console.log('credit update ',stock.utils.Config.getCreditString());
                    me.updateCredit(stock.utils.Config.getCreditString());
                });
                me.updateCredit(stock.utils.Config.getCreditString());*/


                //initialisation du menu
                var leftmenu = Ext.create('Ext.Panel', {
                    id: 'sidemenu',
                    scrollable: false,
                    height: '100%',
                    width: '100%',
                    items: [
                        {
                            xtype: 'menu',
                            width: 265,
                            scrollable: false,
                            style: 'top: -100px;',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            cls: 'snap-drawer snap-drawer-left',
                            items: [
                                {
                                    action: 'close-menu',
                                    cls: 'sidebar-header',
                                    html: '<a href="#" class="sidebar-logo"></a>'
                                    /*'<a href="#" class="sidebar-close"><i class="fa fa-times"></i></a>'*/
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-main',
                                    html: '<i class="fa fa-crosshairs"></i>' +
                                    '<strong>Courses en cours</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-qrcode',
                                    html: '<i class="fa fa-qrcode"></i>' +
                                    '<strong>Scanner</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-histo',
                                    html: '<i class="fa fa-list"></i>' +
                                    '<strong>Historique</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-param',
                                    html: '<i class="fa fa-cogs"></i>' +
                                    '<strong>Paramètres</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'deconnexion',
                                    html: '<i class="fa fa-sign-out"></i>' +
                                    '<strong>Déconnexion</strong>'
                                }

                            ]
                        },
                        {
                            width: 235,
                            scrollable: false,
                            xtype: 'formProfil',
                            style: 'position: absolute; bottom: -20px;z-index:9',
                            height: 200
                        }
                    ]
                });

                //set menu left
                /*Ext.Viewport.setMenu(leftmenu,{
                    side: 'left',
                    reveal: true
                });*/
                Ext.getBody().insertFirst(leftmenu.element);

                stock.utils.Config.setElementMenu(leftmenu.element);

                //swipe menu
                stock.utils.Config.setSwipe();

                //ouverture du menu à l'initialisation
                stock.utils.Config.showMenu();
            }
        }
    }/*,
    updateAddress: function (address){

        //mise à jour de l'adresse
        var addr =
            '<div class="valet-search m-bluegrey-bg-100 m-bluegrey-borderb-400">'+
            '<span class="valet-search-address">'+stock.utils.Config.getAddress()+'</span>'+
            '</div>';
        this.down('[action=address-display]').setHtml(addr);
    },
    updateCredit: function (address){

        //mise à jour du nombre de crédits
        this.down('[action=credit-display]').setTitle(address);
    }*/
});
