/**
 * @class ActivaStock.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('stock.controller.Main', {
    extend: 'Ext.app.Controller',
    /*requires: ['Ext.device.Device'],*/
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            main: '#mainCard',
            /*** general ***/
            closeMenu: '[action=close-menu]',
            back: '[action=back]',
            /*** navigation ***/
            menuMain: '[action=menu-main]',
            menuHisto: '[action=menu-histo]',
            menuParam: '[action=menu-param]',
            menuQrcode: '[action=menu-qrcode]',
            menuCar: '[action=menu-car]',
            menuSearch: '[action=menu-search]',
            menuBuy: '[action=menu-buy]',
            /*** login ***/
            loginbutton: '[action=loginbutton]',
            logintext: '[action=logintext]',
            passtext: '[action=passtext]',
            deconnexion: '[action=deconnexion]',
            /*** inscription ***/
            inscription: '[action=inscription]',
            validerinscription: '[action=validerinscription]',
            annulerinscription: '[action=annulerinscription]',
            forminscription: '[action=forminscription]',
            /*** Course commentaire ***/
            histocourse: '[action=HistoCourse]',
            histocoursesave: '[action=enregistrercomm]',
            /*** liste valet ***/
            listecourse: '[action=listecourse]',
            buttonlocation: '#test',
            /*** fiche valet ***/
            callphone: '[action=phone]',
            showmap: '[action=showmap]',
            adresse: '[action=adresse]',
            /*** liste pack ***/
            listepack: '[action=listepack]',
            /*** liste car ***/
            /*listecar: '[action=listecar]',
            buttonaddcar: '[action=add-car]',
            carsave: '[action=enregistrercar]',*/
            /*** heure ouverture ***/
            workingstart: '[action=workingStart]',
            workingend: '[action=workingEnd]',
            /*** online / offline ***/
            online: '[action=online]'
        },

        control: {
            closeMenu: {
                tap: 'onCloseMenu'  
            },
            loginbutton: {
                tap: 'onLoginTap'
            },
            deconnexion: {
                tap: 'onDeconnexion'
            },
            inscription: {
                tap: 'onInscriptionTap'
            },
            validerinscription: {
                tap: 'onValiderInscriptionTap'
            },
            annulerinscription: {
                tap: 'onAnnulerInscriptionTap'
            },
            histocourse: {
                itemtap: 'onHistocourseTap'
            },
            back: {
                tap: 'onBackTap'
            },
            histocoursesave: {
                tap: 'onHistoCourseSaveTap'
            },
            listecourse: {
                itemtap: 'onListeCourseTap'
            },
            showmap: {
                tap: 'onShowMap'
            },
            callphone: {
                tap: 'onCallPhone'
            },
            menuMain: {
                tap: function () {
                    this.redirectTo('main');
                }
            },
            menuQrcode: {
                tap: 'onShowQrCode'
            },
            menuParam: {
                tap: function () {
                    this.redirectTo('param');
                }
            },
            menuHisto: {
                tap: function () {
                    this.redirectTo('historique');
                }
            },
            /*menuCar: {
                tap: function () {
                    this.redirectTo('car');
                }
            },
            menuSearch: {
                tap: function () {
                    this.redirectTo('search');
                }
            },
            menuBuy: {
                tap: function () {
                    this.redirectTo('buy');
                }
            },
            buttonlocation: {
                tap: function () {
                    console.log ('tap');
                }
            },
            listepack: {
                itemtap: function (list, index, target, record, e, eOpts) {
                    console.log('open external payment',record.get('urlpayment'));
                    window.open(record.get('urlpayment'), '_system');
                    this.redirectTo('waiting');
                }
            },*/
            /** car gestion **/
            /*listecar: {
                itemtap: 'onListeCarTap'
            },
            buttonaddcar: {
                tap: function () {
                    this.redirectTo('car/add');
                }
            },
            carsave: {
                tap: 'onCarSaveTap'
            },*/
            online: {
                change: 'onStatusChange'
            },
            workingstart: {
                change: 'onWorkingChange'
            },
            workingend: {
                change: 'onWorkingChange'
            }
        },
        routes: {
            /** root cards **/
            'main': 'showMain',
            'historique': 'showHisto',
            'qrcode': 'showQrCode',
            'search': 'showSearch',
            'buy': 'showBuy',
            'waiting': 'showWaiting',
            'validated': 'showValidated',
            'paymentok': 'showPaymentOk',
            'login' : 'showLogin',
            'registration' : 'showRegistration',
            /** state card **/
            'valet/:id': 'showValet',
            'historiques/:id': 'showHistorique',
            'param' : 'showParametres'
            /** car list **/
            /*'car': 'showCar',
            'car/add': 'showCarAdd',
            'car/:id': 'showCarId'*/
        }
    },
    /**************
     *  QRCODE
     **************/
    onShowQrCode: function () {
        var me = this;
        stock.utils.Config.hideMenu();
        //if (Ext.device.Device.name!='not available') {
        Ext.device.Scanner.scan({
            success: function (result) {
                console.dir(result);
                console.log('AAAAAAAAAAAAAA ' + result.text)
                console.log('AAAAAAAAAAAAAA ' + result.format);
                if (!result.cancelled) {
                    /*if (result.format=="QR_CODE") {
                        if (result.success=="200") {*/
                            var url = result.text;
                            //var url = 'http://www.youpark.me/app_dev.php/qr/bitembois';
                            me.redirectTo('waiting');
                            me.afterShowQrCode(url);
                        /*}else Ext.Msg.alert('Impossible de lire ce QRCODE.');
                    }else Ext.Msg.alert('Le format est incorrect. Veuillez ressayer en vous assurant de scanner un QRCODE');*/
                } else Ext.Msg.alert('Erreur','Vous avez annulé le scan.');
            },
            failure: function (error) {
                console.dir(error);
                Ext.Msg.alert('Erreur','Une erreur est survenue bizarrement...');
            }
        });
    },
    afterShowQrCode: function (url) {
        var me = this;
        var data = {
            logkey: stock.utils.Config.getCurrentKey(),
            user_id: stock.utils.Config.getCurrentUser().user_id
        };
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.success&&obj.data){
                    //il y a des voitures à afficher
                    var carlist = me.manageView(1, 'stock.view.CarList');
                    //chargement des données
                    var cars = Ext.getStore('Cars');
                    var records = cars.getRange();
                    cars.remove(records);
                    cars.add(obj.data);
                    //ajout de l'evenement click sur une voiture
                    var test  = carlist.down('[action=listecar]');
                    test.clearListeners();
                    test.on({
                        itemtap: function (list, index, target, record, e, eOpts ) {
                            console.log('item tap voiture');
                            me.saveCourse(obj.client_id,record.get('id'));
                        }
                    });
                }else if (obj.success){
                    //refresh liste des courses
                    var opencourse = Ext.getStore('OpenCourses');
                    opencourse.load();

                    Ext.Msg.alert('Succès !',obj.msg);
                    //affichage de la fiche client
                    me.redirectTo('main');
                }else{
                    //affichage du message d'erreur
                    Ext.Msg.alert('Opération impossible',obj.msg);
                }
                /*var qrview = me.manageView(1, 'stock.view.CarList');
                //chargement du résultat
                qrview.setResult(response.responseText);*/
            },
            failure: function(response, opts) {
                //suppression du masque
                me.redirectTo('main');
                console.log('Set status petit problème ' + response.status);
                Ext.Msg.alert('Erreur', 'Impossible d\'identifier votre code. Veuillez réessayer.');
            }
        });
    },
    saveCourse: function (client,vehicule) {
        var data = {
            logkey: stock.utils.Config.getCurrentKey(),
            user_id: stock.utils.Config.getCurrentUser().user_id,
            vehicle_id: vehicule,
            client_id: client
        };
        var me = this;
        //redirection accueil
        me.redirectTo('main');

        //envoi de la requete
        Ext.Ajax.request({
            url: stock.utils.Config.getCourseWithVehiculeUrl(),
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    //refresh liste des courses
                    var opencourse = Ext.getStore('OpenCourses');
                    opencourse.load();

                    //affichage de la fiche client
                    Ext.Msg.alert('Succès !',obj.msg);
                }else{
                    //affichage du message d'erreur
                    Ext.Msg.alert('Opération impossible',obj.msg);
                }
            },
            failure: function(response, opts) {
                //suppression du masque
                console.log('Set status petit problème ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    },
    /**************
     *  WORKING HOURS
     **************/
    onWorkingChange: function () {
        console.log('wokring change');
        //recherche des champs hoaires
        var bstart = this.getWorkingstart();
        var bend = this.getWorkingend();
        var data = {
            logkey: stock.utils.Config.getCurrentKey(),
            user_id: stock.utils.Config.getCurrentUser().user_id,
            work_start_at: (new Date(bstart.getValue())).getHours()+':'+(new Date(bstart.getValue())).getMinutes(),
            work_end_at: (new Date(bend.getValue())).getHours()+':'+(new Date(bend.getValue())).getMinutes()
        };
        var url = stock.utils.Config.getWorkingUrl();
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                //modification de la position du curseur
                bstart.suspendEvents();
                var d = new Date();
                d.setHours(obj.work_start_at.split(':')[0]);
                d.setMinutes(obj.work_start_at.split(':')[1]);
                bstart.setValue(d);
                bstart.resumeEvents(true);

                var d2 = new Date();
                d2.setHours(obj.work_end_at.split(':')[0]);
                d2.setMinutes(obj.work_end_at.split(':')[1]);
                bend.suspendEvents();
                bend.setValue(d2);
                bend.resumeEvents(true);

                console.log ('retour working', obj);

            },
            failure: function(response, opts) {
                //suppression du masque
                console.log('Set status petit problème ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    },
    /**************
     *  ONLINE / OFFLINE
     **************/
    onStatusChange: function (toggle) {
        console.log('status change '+toggle.getValue());
        var data = {
            logkey: stock.utils.Config.getCurrentKey(),
            user_id: stock.utils.Config.getCurrentUser().user_id
        };

        var url = stock.utils.Config.getStatusUrl();
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                //modification de la position du curseur
                toggle.suspendEvents();
                toggle.setValue(obj.online);
                toggle.resumeEvents(true);

                console.log ('retour bouton', obj.online);

            },
            failure: function(response, opts) {
                //suppression du masque
                console.log('Set status petit problème ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    },
    /**************
     * COURSES EN COURS
     **************/
    _popupCancelClose: null,
    onListeCourseTap: function (list, index, target, record, e, eOpts) {
        //double click bug
        list.suspendEvents();
        Ext.Function.defer(function(){
            list.resumeEvents(true);
        }, 300);

        console.log('liste course tap '+record.get('id'));
        this._popupCancelClose = Ext.Viewport.getComponent('popupCancelClose');
        //create the form if it doesn't exists
        if(!this._popupCancelClose){
            //création du popup Annuler / Valider
            this._popupCancelClose = new Ext.Panel({

                // We give it a left and top property
                //to make it floating by default
                left: 0,
                top: 0,

                // Make it modal so you can click the mask to hide the overlay
                modal: true,
                hideOnMaskTap: true,

                cls: 'popupClosed',

                //id
                id: 'popupCancelClose',

                // Set the width and height of the panel
                width: '300',
                height: 150,
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    labelWidth: '0%'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'buttonAnnuler',
                        text: 'Annuler',
                        cls: 'ypm-button big'
                    },
                    {
                        xtype: 'button',
                        action: 'buttonCloturer',
                        text: 'Cloturer',
                        cls: 'ypm-button big green'
                    }

                ]
            });
        }
        var me = this;
        this._popupCancelClose.down('[action=buttonAnnuler]').setRecord(record);
        this._popupCancelClose.down('[action=buttonAnnuler]').clearListeners();
        this._popupCancelClose.down('[action=buttonAnnuler]').on ({
            tap: function (button) {
                me.onCancelCourse(button);
            }
        });
        this._popupCancelClose.down('[action=buttonCloturer]').setRecord(record);
        this._popupCancelClose.down('[action=buttonCloturer]').clearListeners();
        this._popupCancelClose.down('[action=buttonCloturer]').on ({
            tap: function (button) {
                me.onCloseCourse(button);
            }
        });
        this._popupCancelClose.showBy(target, "tl-bl?");
        console.log('creatio du popup',this._popupCancelClose);
    },
    onCancelCourse: function (button) {
        //fermeture du popit
        this._popupCancelClose.hide();
        /*this._popupCancelClose.on({
            hide: function (){
                this.destroy();
            }
        });*/

        var me = this;
        var url = stock.utils.Config.getCancelCourseUrl();
        var data = {
            logkey: stock.utils.Config.getCurrentKey(),
            user_id: stock.utils.Config.getCurrentUser().user_id,
            course_id: (button.getRecord())?button.getRecord().get('id'):''
        };
        Ext.Msg.confirm('Annulation','Etes vous sur de vouloir annuler cette course ?',function (e) {
            if (e == 'yes') {
                Ext.Ajax.request({
                    url: url,
                    useDefaultXhrHeader: false,
                    params: data,
                    method: 'POST',
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText);

                        if (obj.success){
                            Ext.Msg.alert('Succès', obj.msg);
                            console.log('retour bouton annuler', obj.online);

                            //refresh OpenCourse
                            var opencourse = Ext.getStore('OpenCourses');
                            opencourse.load();
                        }else{
                            Ext.Msg.alert('Erreur', obj.msg);
                        }
                    },
                    failure: function (response, opts) {
                        //suppression du masque
                        console.log('Set status petit problème ' + response.status);
                        Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
                    }
                });
                me._popupCancelClose.hide();
            }
        });
    },
    onCloseCourse: function (button) {
        //fermeture du popit
        this._popupCancelClose.hide();
        /*this._popupCancelClose.on({
            hide: function (){
                this.destroy();
            }
        });*/

        var url = stock.utils.Config.getCloseCourseUrl();
        var data = {
            logkey: stock.utils.Config.getCurrentKey(),
            user_id: stock.utils.Config.getCurrentUser().user_id,
            course_id: (button.getRecord())?button.getRecord().get('id'):''
        };
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                if (obj.success){
                    Ext.Msg.alert('Succès', obj.msg);
                    console.log ('retour bouton annuler', obj.online);

                    //refresh OpenCourse
                    var opencourse = Ext.getStore('OpenCourses');
                    opencourse.load();
                }else{
                    Ext.Msg.alert('Erreur', obj.msg);
                }
            },
            failure: function(response, opts) {
                //suppression du masque
                console.log('Set status petit problème ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
        this._popupCancelClose.hide();
    },
    /**************
     * COMMENTAIRES
     **************/
    showHistorique: function (id) {
        var commview = Ext.create('stock.view.CourseCommentaire');
        //_____________________________________________________________________________________________________________
        //                                                                                                  ANIMATIONS
        Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'left'});
        //_____________________________________________________________________________________________________________
        Ext.Viewport.setActiveItem(commview);
        this._currentLevel = 2;
        var histoStore = Ext.getStore('Courses');
        var record = histoStore.getById(id);
        commview.setRecord(record);
    },
    onHistocourseTap: function ( list, index, target, record, e, eOpts ) {
        //double click bug
        list.suspendEvents();
        Ext.Function.defer(function(){
            list.resumeEvents(true);
        }, 300);

        console.log('itemtap course '+record.get('id'));
        this.redirectTo('historiques/'+record.get('id'));
    },
    onHistoCourseSaveTap: function (button, e, eOpts) {
        var me = this;
        var curview = Ext.Viewport.getActiveItem();
        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false,
            message: 'Enregistrement en cours ...'
        });
        Ext.Ajax.request({
            url: stock.utils.Config.getCourseSetComment()+'/'+button.getRecord().get('id'),
            useDefaultXhrHeader: false,
            params: {
                logkey: stock.utils.Config.getCurrentKey(),
                user_id: stock.utils.Config.getCurrentUser().user_id,
                comment: Ext.Viewport.getActiveItem().down('textareafield[name=Commentaire]').getValue()
            },
            method: 'POST',
            success: function(response, opts) {

                //suppression du masque
                curview.setMasked(false);

                //enregistrement du commentaire en local
               console.log('comentaire envoyé avec succés course:'+button.getRecord().get('id'));
                var histoStore = Ext.getStore('Courses');
                var record = histoStore.getById(button.getRecord().get('id'));
                record.set('valet_comment',Ext.Viewport.getActiveItem().down('textareafield[name=Commentaire]').getValue());

                //redirection
                me.redirectTo('historique');

                //toast message
                //Ext.toast('Votre commentaire a été enregistré avec succès.');
            },
            failure: function(response, opts) {
                //suppression du masque
                curview.setMasked(false);
                console.log('Envoi de commentaire petit problème ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
         });
    },
    /**************
     * INSCRIPTION
     **************/
    onAnnulerInscriptionTap: function () {
        console.log('Annulation de l\'inscription');
        this.redirectTo('login');
    },
    onValiderInscriptionTap: function () {
        console.log('Validation de l\'inscription');
        this.getForminscription().submit({
            url: stock.utils.Config.getSubscribeUrl(),
            params: {
                logkey: stock.utils.Config.getCurrentKey()
            },
            method: 'POST',
            useDefaultXhrHeader: false,
            waitMsg: 'Veuillez patienter ...',
            success: function(form, obj){
                 console.log('envoi de l\'inscription avec succès ...',obj);
                 //connexion automatique
                 stock.utils.Config.setCurrentUser(obj);
                 console.log('utilisateur connecté',stock.utils.Config.getCurrentUser());
                 stock.utils.Config.getApp().fireEvent('onLoginSuccess',this);
            },
            failure: function(form, obj) {
                console.log('erreur dans l\'envoi des informations',obj);
                Ext.Msg.alert('Erreur de connexion', 'Veuillez corriger les erreurs suivantes: <br />'+obj.msg);
            }
        });
    },
    onInscriptionTap: function () {
        console.log('création de la fiche d\'inscription');
        this.redirectTo('registration');
        /*var form = Ext.create('stock.form.Registration', {id: 'forminscription'});
        Ext.Viewport.setActiveItem(form);*/
    },
    /***************************
     * CONNEXION / DECONNEXION
     ***************************/
    onDeconnexion: function () {
        console.log('deconnexion utilisateur');
        stock.utils.Config.getApp().disconnect();
        stock.utils.Config.hideMenu();
    },
    onLoginTap: function () {
        console.log('login en cours...');
        var curview = Ext.Viewport.getActiveItem();
        //masquage de la vue en cours pendant le chargement
        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false/*
            message: 'Vérification des données utilisateurs ...'*/
        });
        var me = this;
        //verification des champs
        var user = this.getLogintext().getValue();
        var pass = this.getPasstext().getValue();
        if (user.length&&pass.length) {
            Ext.Ajax.request({
                url: stock.utils.Config.getLoginUrl()+user+'/'+pass+'/'+stock.utils.Config.getCurrentKey(),
                useDefaultXhrHeader: false,
                success: function(response, opts) {
                   var obj = Ext.decode(response.responseText);
                   console.log('Récupération de la donnée utilisateur');

                   //suppresion de la page de chargement
                   curview.setMasked(null);

                   //test de la réponse
                   if (obj.success) {
                        console.log('Utilisateur connecté', obj);
                        stock.utils.Config.setCurrentUser(obj);
                        stock.utils.Config.getApp().fireEvent('onLoginSuccess',this);
                   }else{
                        var popup = Ext.Msg.alert('Erreur', obj.msg);
                   }

                },
                failure: function(response, opts) {
                    console.log('Petit problème ' + response.status);

                    //suppresion de la page de chargement
                    curview.setMasked(null);

                    // Basic alert:
                    var popup = Ext.Msg.alert('Erreur de connexion', 'Vous ne semblez pas connecté à internet. Si il s\'agit d\'un problème temporaire, pressez "OK" pour réessayer.', function(){
                        return true;
                    });
                }
            });
        }else{
            //un des champs est vide
            var popup = Ext.Msg.alert('Erreur de saisie', 'Veuillez saisir un identifiant et un mot de passe.', function(){
                return true;
            });
            curview.setMasked(null);
        }
    },

    /***********************************
     * PHONE
     * *********************************/
    onCallPhone: function (button) {
        console.log('CALLPhone',button.getRecord());
        window.open('tel:'+button.getRecord().get('phone'), '_system');
    },
    /***********************************
     * ITINERAIRE
     * *********************************/
    onShowMap: function (){
        var adresse = this.getAdresse().getHtml();
        var destination = adresse.replace('<br />',', ');
        var googleDirectionsURL = "http://maps.google.com/?saddr=" + stock.utils.Config.getCurrentLat() + "," + stock.utils.Config.getCurrentLng() + "&daddr="+destination;
            window.open(googleDirectionsURL, '_system');
    },
    /********************************
     * NAVIGATION
     * ******************************/
    onCloseMenu: function () {
        stock.utils.Config.hideMenu();
        console.log('close menu');
    },
    /***
     * onBackTap
     * On presse le bouton back
     */
    onBackTap: function ( button, e, eOpts ) {
        console.log('itemtap back');
        var appHistory = this.getApplication().getHistory();

        // fire previous route
        appHistory.back();

        // prevent the default navigation view
        // back button behavior from firing
        return false;
    },
    _indexViews: [],
    _currentLevel: 0,
    manageView: function (level,name_view) {
        console.log('---- show view ----', name_view,'level',level);

        //redirection accueil si pas de clef
        if (!stock.utils.Config.getCurrentKey()&& name_view!='stock.view.Login') {
            console.log('perte de clef... attente...');
            //_____________________________________________________________________________________________________________
            //                                                                                                  ANIMATIONS
            //Ext.Viewport.getLayout().setAnimation({type: 'fade', direction: 'right'});
            //_____________________________________________________________________________________________________________
            //stock.utils.Config.getApp().disconnect();
            return;
        }else if (stock.utils.Config.getCurrentKey()&&(name_view=='stock.view.Login'||name_view=='stock.form.Registration')&&stock.utils.Config.getCurrentUser()){
            console.log('interdit ya une clef mais la vue est login ou registration et connecté');
            return;
        }else if (stock.utils.Config.getCurrentKey()&&(name_view!='stock.view.Login'&&name_view!='stock.form.Registration')&&!stock.utils.Config.getCurrentUser()){
            console.log('interdit ya une clef mais la vue est login ou registration et pas de user');
            return;
        }

        var commview;

        //gestion des effets
        switch (this._currentLevel-level){
            case 1:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'right'});
                //_____________________________________________________________________________________________________________
            break;
            case -1:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'left'});
                //_____________________________________________________________________________________________________________
            break;
            default:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'fade', direction: 'left'});
                //____________________________________________________________________________________________________________
            break;
        }

        //maintenance de l'index des vues chargées
        if (this._indexViews[name_view]){
            console.log();
            commview = this._indexViews[name_view];
        }else{
            this._indexViews[name_view] = commview = Ext.create(name_view);
        }
        Ext.Viewport.setActiveItem(commview);
        this._currentLevel=level;

        return commview;
    },
    /********************************
     * ROUTING
     * ******************************/
    showMain: function () {
        stock.utils.Config.hideMenu();
        var curview  = this.manageView(0,'stock.view.Main');
        if (curview)
            curview.setMasked(false);
    },
    showHisto: function () {
        stock.utils.Config.hideMenu();
        this.manageView(1,'stock.view.Historique');
        
    },
    showQrCode: function () {
        stock.utils.Config.hideMenu();
        this.manageView(1,'stock.view.Qrcode');
    },
    showCar: function () {
        stock.utils.Config.hideMenu();
        this.manageView(1,'stock.view.CarList');
    },
    showCarAdd: function () {
        stock.utils.Config.hideMenu();
        this.manageView(2,'stock.view.CarAdd');
    },
    showBuy: function () {
        stock.utils.Config.hideMenu();
        this.manageView(1,'stock.view.Buy');
    },
    showWaiting: function () {
        stock.utils.Config.hideMenu();
        this.manageView(1,'stock.view.Waiting');
    },
    showValidated: function () {
        stock.utils.Config.hideMenu();
        this.manageView(1,'stock.view.Validated');
    },
    showSearch: function () {
        stock.utils.Config.hideMenu();
        this.manageView(1,'stock.view.Recherche');
    },
    showPaymentOk: function () {
        this.manageView(1,'stock.view.PaymentSuccess');
    },
    showLogin: function () {
        stock.utils.Config.hideMenu();
        this.manageView(0,'stock.view.Login');
    },
    showRegistration: function () {
        stock.utils.Config.hideMenu();
        this.manageView(0,'stock.form.Registration');
    },
    showParametres: function () {
        stock.utils.Config.hideMenu();
        this.manageView(0,'stock.view.Parametres');
    }
 });
