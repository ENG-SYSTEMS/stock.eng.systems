Ext.define('stock.view.FicheValet', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'stock.form.Course'
    ],
    config: {
        cls: 'valet-fiche-page',
        scrollable: true,
        fullscreen: true,
        width: '100%',
        height: '100%',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                action: 'valettitle',
                title: 'Stéphanie Delaporta',
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
                    }/*,
                    {
                        xtype: 'button',
                        text: '',
                        iconCls: 'fa fa-share-alt',
                        cls: 'open-socials',
                        handler: function(){
                            if(Ext.Viewport.getMenus().right.isHidden()){
                                Ext.Viewport.showMenu('right');
                            }
                            else
                            {
                                Ext.Viewport.hideMenu('right');
                            }
                        }
                    }*/
                ]
            },
            {
                cls: 'container no-bottom valet-profile',
                style: 'margin: 10px 30px;overflow:hidden;position: relative;',
                width: 'calc( 100% - 60px )',
                layout: {
                    type: 'hbox',
                    align: 'top'
                },
                items:[
                    {
                        cls: 'one-half-responsive half-bottom',
                        items: [
                            {
                                action: 'FicheValetImg',
                                html: '<img src="http://www.unilim.fr/suaps/files/2013/02/profil-FEM.png" class="float-left valet-avatar"/>'
                            }
                        ]
                    },
                    {
                        cls: 'valet-labels',
                        width: 'calc(100% - 160px)',
                        layout: {
                            type: 'vbox',
                            align: 'center'
                        },
                        items:[

                            {
                                cls: 'valet-address-big',
                                action:'name',
                                html: 'Tahar Tempion'
                            },
                            {
                                cls: 'valet-name-big',
                                width: '100%',
                                action:'adresse',
                                html: '1250, Avenue de la république <br /> 75001 Paris'
                            },
                            {
                                width: '100%',
                                layout: 'hbox',
                                items :[
                                    {
                                        cls: 'valet-fiche valet-near last',
                                        action:'distance',
                                        html: '200 m'
                                    },
                                    {
                                        cls: 'valet-fiche valet-hours m-bluegrey-bg-400',
                                        action:'heureouverture',
                                        html: '9h - 16h'
                                    }
                                ]
                            },
                            {
                                width: '100%',
                                layout: {
                                    type: 'hbox',
                                    align: 'center'
                                },
                                items :[
                                    {
                                        xtype: 'button',
                                        flex:1,
                                        layout: {
                                            type: 'hbox',
                                            align: 'center'
                                        },
                                        cls: 'button-call-dialer',
                                        action: 'phone',
                                        html: '<span class="fa-stack"><i class="fa fa-square fa-stack-1x"></i><i class="fa fa-phone fa-stack-1x fa-inverse"></i></span>'
                                    },
                                    {
                                        flex:1,
                                        layout: {
                                            type: 'hbox',
                                            align: 'center'
                                        },
                                        xtype: 'button',
                                        action: 'showmap',
                                        cls: 'button-call-map',
                                        html: '<span class="fa-stack"><i class="fa fa-square fa-stack-1x"></i><i class="fa fa-map-marker fa-stack-1x fa-inverse"></i></span>'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                html: '<h1>Historique</h1>'
            },
            {
                width: '80%',
                html: '<hr>'
            },
            {
                title: 'Historique',
                iconCls: 'bookmarks',
                width: '100%',
                height: '400',
                scrollable: false,
                xtype: 'list',
                action: 'valet-histo',
                store: 'Courses',
                itemTpl:  '<div class="histo-item">'+
                '<span class="valet-dist valet-near">{amount} crédits</span>'+
                '<h2>{app_time}</h2>'+
                '<span class="valet-address">{user_comment}<br /></span>'+
                '<span class="valet-hours">Avec {firstname} {lastname}</span>'+
                '</div>',
                grouped: false,
                pinHeaders: false
            }
        ]
    },
    setRecord: function (record){
        if (!record) return;
        console.log(record);
        //title
        this.down('[action=valettitle]').setTitle(record.get('firstname')+' '+record.get('lastname'));
        this.down('[action=name]').setHtml(record.get('firstname')+' '+record.get('lastname'));

        //image
        this.down('[action=FicheValetImg]').setHtml('<img src="'+record.get('avatar')+'" class="float-left valet-avatar"/>');

        //phone
//        this.down('[action=phone]').setHtml('<i class="fa fa-phone-square"></i>&nbsp;&nbsp;<a href="tel:'+obj.phone+'">'+obj.phone+'</a>');
        this.down('[action=phone]').setRecord(record);
        this.down('[action=heureouverture]').setHtml(record.get('workStartAt')+' à '+record.get('workEndAt'));
        this.down('[action=distance]').setHtml(record.get('distance'));
        this.down('[action=adresse]').setHtml(record.get('street')+'<br />'+record.get('postalCode')+' '+record.get('city'));

        //show valet histo
        var me = this;
        /*this.down('[action=show-valet-histo]').addListener('tap',function () {*/
            var url  = stock.utils.Config.getHistoValetUrl();
            console.log('show valet histo',me.down('[action=valet-histo]'));
            var store = new Ext.data.Store({
                model: 'stock.model.Course',
                proxy: {
                    method: 'POST',
                    actionMethods: {
                        create : 'POST',
                        read   : 'POST', // by default GET
                        update : 'POST',
                        destroy: 'POST'
                    },
                    useDefaultXhrHeader: false,
                    type: 'ajax',
                    url: url,
                    reader: {
                        type: 'json',
                        rootProperty: 'courses'
                    }
                }
            });
            store.getProxy().setExtraParams({
                user_id: stock.utils.Config.getCurrentUser().user_id,
                valet_id: record.get('id'),
                logkey: stock.utils.Config.getCurrentKey()
            });            store.load();
            me.down('[action=valet-histo]').setStore(store);
            me.down('[action=valet-histo]').setStyle('height: 750px; overflow:hidden');
        /*});*/
    },
    listeners: {
        painted: function () {
        }
    }
});
