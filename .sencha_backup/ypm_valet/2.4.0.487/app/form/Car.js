Ext.define('stock.form.Car', {
    xtype: 'formCar',
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.form.Toggle',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Spinner',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden',
        'Ext.field.Radio',
        'Ext.field.Hidden'
    ],
    config: {
        iconCls: 'comment',
        items: [
            
            {
                xtype: 'fieldset',
                instructions: '',
                action: 'fieldsetCar',
                defaults: {
                    labelWidth: '0%'
                },
                layout: {
                    align: 'middle'
                },
                items: [
                    {
                        width: '80%',
                        style: 'margin:0 10% 10px 10%',
                        layout: {
                            type: 'hbox'

                        },
                        items: [
                            {
                                xtype: 'image',
                                width: '100px',
                                action: 'carImage',
                                height: '100px',
                                src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'photo',
                                action: 'photo',
                                value: ''
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                text: 'Prendre une photo',
                                action: 'take-photo',
                                cls: 'ypm-button',
                                handler: function () {
                                    navigator.camera.getPicture(onSuccess, onFail, {
                                        quality : 90,
                                        destinationType : Camera.DestinationType.DATA_URL,
                                        sourceType : Camera.PictureSourceType.CAMERA,
                                        allowEdit : true,
                                        encodingType: Camera.EncodingType.JPEG,
                                        targetWidth: 800,
                                        targetHeight: 600,
                                        popoverOptions: CameraPopoverOptions,
                                        saveToPhotoAlbum: false
                                    });

                                    function onSuccess(imageData) {
                                        var image = Ext.Viewport.getActiveItem().down('[action=carImage]');
                                        image.setSrc("data:image/jpeg;base64," + imageData);
                                        var hi = Ext.Viewport.getActiveItem().down('[action=photo]');
                                        hi.setValue(imageData);
                                    }

                                    function onFail(message) {
                                        alert('Failed because: ' + message);
                                    }
                                }
                            }                        ]
                    },
                    {
                        xtype: 'selectfield',
                        name: 'brand',
                        label: 'Marque',
                        cls: 'ypm-input-pink',
                        labelWidth: '0%',
                        clearIcon: false,
                        placeHolder: 'Nom',
                        autoCapitalize: false,
                        required      : 1,
                        options: [
                            {text: 'Marque', value: ''},
                            {text: 'Abarth', value: 'Abarth'},
                            {text: 'Acura', value: 'Acura'},
                            {text: 'Alfa Romeo', value: 'Alfa Romeo'},
                            {text: 'AMG', value: 'AMG'},
                            {text: 'Aston Martin', value: 'Aston Martin'},
                            {text: 'Audi', value: 'Audi'},
                            {text: 'Bentley', value: 'Bentley'},
                            {text: 'BMW', value: 'BMW'},
                            {text: 'Buick', value: 'Buick'},
                            {text: 'Bugatti', value: 'Bugatti'},
                            {text: 'Cadillac', value: 'Cadillac'},
                            {text: 'Caterham', value: 'Caterham'},
                            {text: 'Chevrolet', value: 'Chevrolet'},
                            {text: 'Chrysler', value: 'Chrysler'},
                            {text: 'Citroën', value: 'Citroën'},
                            {text: 'Dacia', value: 'Dacia'},
                            {text: 'Daewoo', value: 'Daewoo'},
                            {text: 'Daihatsu', value: 'Daihatsu'},
                            {text: 'Dodge', value: 'Dodge'},
                            {text: 'Ferrari', value: 'Ferrari'},
                            {text: 'Fiat', value: 'Fiat'},
                            {text: 'Fisker', value: 'Fisker'},
                            {text: 'Ford', value: 'Ford'},
                            {text: 'General Motors', value: 'General Motors'},
                            {text: 'Honda', value: 'Honda'},
                            {text: 'Hummer', value: 'Hummer'},
                            {text: 'Hyundai', value: 'Hyundai'},
                            {text: 'Infiniti', value: 'Infiniti'},
                            {text: 'Italcar', value: 'Italcar'},
                            {text: 'Isuzu', value: 'Isuzu'},
                            {text: 'Jaguar', value: 'Jaguar'},
                            {text: 'Jeep', value: 'Jeep'},
                            {text: 'Kia', value: 'Kia'},
                            {text: 'Koenigsegg', value: 'Koenigsegg'},
                            {text: 'Lada', value: 'Lada'},
                            {text: 'Lamborghini', value: 'Lamborghini'},
                            {text: 'Lancia', value: 'Lancia'},
                            {text: 'Land-Rover', value: 'Land-Rover'},
                            {text: 'Lexus', value: 'Lexus'},
                            {text: 'Lotus', value: 'Lotus'},
                            {text: 'Lincoln', value: 'Lincoln'},
                            {text: 'Maserati', value: 'Maserati'},
                            {text: 'Mastretta', value: 'Mastretta'},
                            {text: 'Matra', value: 'Matra'},
                            {text: 'Mazda', value: 'Mazda'},
                            {text: 'Maybach', value: 'Maybach'},
                            {text: 'McLaren', value: 'McLaren'},
                            {text: 'Mercedes', value: 'Mercedes'},
                            {text: 'Mercury', value: 'Mercury'},
                            {text: 'MG', value: 'MG'},
                            {text: 'Mini', value: 'Mini'},
                            {text: 'Mitsubishi', value: 'Mitsubishi'},
                            {text: 'Morgan', value: 'Morgan'},
                            {text: 'Nissan', value: 'Nissan'},
                            {text: 'Nismo', value: 'Nismo'},
                            {text: 'Oldsmobile', value: 'Oldsmobile'},
                            {text: 'Opel', value: 'Opel'},
                            {text: 'Pagani', value: 'Pagani'},
                            {text: 'Peugeot', value: 'Peugeot'},
                            {text: 'PGO', value: 'PGO'},
                            {text: 'Pontiac', value: 'Pontiac'},
                            {text: 'Porsche', value: 'Porsche'},
                            {text: 'Proton', value: 'Proton'},
                            {text: 'Renault', value: 'Renault'},
                            {text: 'Rolls Royce', value: 'Rolls Royce'},
                            {text: 'Rover', value: 'Rover'},
                            {text: 'Saab', value: 'Saab'},
                            {text: 'Ssangyong', value: 'Ssangyong'},
                            {text: 'Saturn', value: 'Saturn'},
                            {text: 'Seat', value: 'Seat'},
                            {text: 'Skoda', value: 'Skoda'},
                            {text: 'Smart', value: 'Smart'},
                            {text: 'Subaru', value: 'Subaru'},
                            {text: 'Suzuki', value: 'Suzuki'},
                            {text: 'Tata', value: 'Tata'},
                            {text: 'Tesla', value: 'Tesla'},
                            {text: 'Toyota', value: 'Toyota'},
                            {text: 'Vauxhall', value: 'Vauxhall'},
                            {text: 'Venturi', value: 'Venturi'},
                            {text: 'Volvo', value: 'Volvo'},
                            {text: 'Volkswagen', value: 'Volkswagen'}
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        name: 'color',
                        label: 'Couleur',
                        cls: 'ypm-input-pink',
                        labelWidth: '0%',
                        clearIcon: false,
                        placeHolder: 'Couleur',
                        autoCapitalize: false,
                        required      : 1,
                        options: [
                            {text: 'Couleur', value: ''},
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
                        xtype: 'textfield',
                        name: 'model',
                        label: 'Modèle',
                        cls: 'ypm-input-pink',
                        labelWidth: '0%',
                        clearIcon: false,
                        placeHolder: 'Modèle',
                        autoCapitalize: false,
                        required      : 1
                    },
                    {
                        xtype: 'textfield',
                        name: 'registration',
                        label: 'Numéro de plaque d\'immatriculation',
                        cls: 'ypm-input-pink',
                        labelWidth: '0%',
                        clearIcon: false,
                        placeHolder: 'Plaque d\'immatriculation',
                        autoCapitalize: false,
                        required      : 1
                    },
                    {
                        xtype: 'textfield',
                        name: 'name',
                        label: 'Nom',
                        cls: 'ypm-input-pink',
                        labelWidth: '0%',
                        clearIcon: false,
                        placeHolder: 'Nom',
                        autoCapitalize: false,
                        required      : 1
                    },
                    {
                        xtype         : 'textareafield',
                        name : 'description',
                        label: 'Description',
                        cls: 'ypm-input-pink',
                        placeHolder   : 'Saisissez une description ...',
                        maxRows: 4,
                        autoCapitalize: false,
                        required      : 0,
                        clearIcon     : false
                    },
                    {
                        xtype: 'button',
                        cls: 'ypm-button block',
                        action: 'enregistrercar',
                        text: 'Enregistrer'
                    },
                    {
                        xtype: 'button',
                        cls: 'ypm-button block',
                        action: 'back',
                        text: 'Annuler'
                    }
                ]
            },
            
        ]
    },
    setRecord: function (record){
        if (this.down('[name=model]'))
            this.down('[name=model]').setValue(record.get('model'));
        if (this.down('[name=registration]'))
            this.down('[name=registration]').setValue(record.get('registration'));
        if (this.down('[name=name]'))
            this.down('[name=name]').setValue(record.get('name'));
        if (this.down('[name=description]'))
            this.down('[name=description]').setValue(record.get('description'));
        if (this.down('[name=brand]'))
            this.down('[name=brand]').setValue(record.get('brand'));
        if (this.down('[name=color]'))
            this.down('[name=color]').setValue(record.get('color'));
        if (this.down('[name=photo]'))
            this.down('[name=photo]').setValue(record.get('photo'));

        this.down('[action=enregistrercar]').setRecord(record);
        var image = this.down('[action=carImage]');
        image.setSrc(record.get('photo'));

    }
});
