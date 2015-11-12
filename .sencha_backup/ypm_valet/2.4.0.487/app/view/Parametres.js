Ext.define('stock.view.Parametres', {
    extend: 'Ext.Panel',
    xtype: 'params',
    requires: [
        'Ext.TitleBar',
        'stock.form.Parametres'
    ],
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
        ]
    },
    setRecord: function (record) {
        /*if (this.down('[action=enregistrercar]')) {
             this.down('[action=enregistrercar]').setRecord(record);
        }
        if (this.down('[xtype=formCar]'))
            this.down('[xtype=formCar]').setRecord(record);*/
    }
});
