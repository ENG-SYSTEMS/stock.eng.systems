Ext.define('stock.view.CourseCommentaire', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'stock.form.Course'
    ],
    config: {
        cls: 'histo-commentaire',
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
                title: 'Laisser un commentaire',
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
                xtype: 'formCourse',
                width: '100%',
                height: '100%',
                scrollable: false            }
        ]
    },
    setRecord: function (record) {
        console.log('commenetaire setrecord', record)
        if (!record) return;
        if (this.down('[action=enregistrercomm]')) {
             this.down('[action=enregistrercomm]').setRecord(record);
        }
        if (this.down('[xtype=formCourse]'))
            this.down('[xtype=formCourse]').setRecord(record);
        if (record)
            var fiche  = '<div class="histo-item">'+
            '<img src="'+record.get('vehicule_photo')+'" class="float-left valet-avatar" alt="img">'+
            '<span class="valet-dist valet-near">'+record.get('amount')+' crédits</span>'+
            '<h2>'+record.get('client')+'</h2>'+
            '<span class="valet-hours">'+record.get('vehicule_detail')+'</span>'+
            '<span class="valet-hours">'+record.get('app_time')+'</span>'+
            '</div>';
        if (this.down('[action=affiche-fiche-valet]'))
            this.down('[action=affiche-fiche-valet]').setHtml(fiche);
    }
});
