Ext.define('stock.utils.Config', {
    singleton : true,
    mixins: ['Ext.mixin.Observable'],
    alias : 'utils.Config',
    config : {
        
        facebookAppId: '287656321430567',
        googleAppId: '131653046040-q9bdcp6b1447abh3h2k3biu6eu2n36u8.apps.googleusercontent.com',
        
        /*logkeyUrl: 'http://admin.youpark.me/app/client/security/get/logtoken',
        checkAlreadyLoggedUrl: 'http://admin.youpark.me/app/client/security/is/logged',
        loginUrl: 'http://admin.youpark.me/app/client/security/login/',*/

        logkeyUrl: 'http://admin.youpark.me/app/valet/security/get/logtoken',
        checkAlreadyLoggedUrl: 'http://admin.youpark.me/app/valet/security/is/logged',
        loginUrl: 'http://admin.youpark.me/app/valet/security/login/',
        storeOpenCourse: 'http://admin.youpark.me/app/valet/course/get/opened',
        storeCourse: 'http://admin.youpark.me/app/valet/course/list',
        courseSetComment: 'http://admin.youpark.me/app/valet/course/set/comment', //ajouter "/id_course" pour envoyer le commentaire

        courseWithVehiculeUrl: 'http://admin.youpark.me/app/valet/course/create/with/vehicle',

        cancelCourseUrl: 'http://admin.youpark.me/app/valet/course/cancel',
        closeCourseUrl: 'http://admin.youpark.me/app/valet/course/validate',

        /*subscribeUrl: 'http://admin.youpark.me/app/client/security/subscribe',*/
        storeValet: 'http://admin.youpark.me/app/client/valet/list',
        storePack: 'http://admin.youpark.me/app/client/credit/get/prices',
        storeCar: 'http://admin.youpark.me/app/client/vehicle/list',
        qrcodeUrl: 'http://admin.youpark.me/app/client/client/qrcode/show',
        ficheValetUrl: 'http://admin.youpark.me/app/client/valet/show', //ajouter "/id_valet" pour rfécupérer les détails du valet
        histoValetUrl: 'http://admin.youpark.me/app/client/course/get/by/valet',
        /*checkPayment: 'http://admin.youpark.me/app/client/credit/is/payment/done',*/
        /*addCarUrl: 'http://admin.youpark.me/app/client/vehicle/add',*/

        statusUrl: 'http://admin.youpark.me/app/valet/valet/set/online',
        workingUrl: 'http://admin.youpark.me/app/valet/valet/set/workingtime',

        /**
         * user login definition
         */
        currentKey: '',
        nbCredits: 0,
        address: 'Adresse en cupdatecreditours d\'acquisition...',
        currentUser: null,
        /**
         * views
         */
        mainView:null,
        /**
         * Root app
         */
        app:null,
        /**
         * Geoloc object
         */
        geo: null,
        currentLat: null,
        currentLng: null,
        altitude: null,
        speed: null,
        heading: null
    },
    constructor: function(config) {
        this.initConfig(config);
        this.callParent([config]);
    },
    /**
     * setCurrentUser
     * Initialisation de l'utilisateur courrant
     */
    updateCurrentUser: function (o){
        if (o)
            this.setNbCredits(o.credit);
        else this.setNbCredits(0);
    },
    /**
     * setCredits
     * Définition des credits pour l'utilisateur connecté
     */
    updateNbCredits: function (nb){
        this.fireEvent('creditupdate')
    },
    /***
     * initLocation
     * Initialisation de l'objet de localisation
     */
    initLocation: function () {
        var me = this;
        if (!this.getGeo()){
            console.log('creation de l objet geoloc');
            this.setGeo(Ext.create('Ext.util.Geolocation', {
                autoUpdate: false,
                listeners: {
                    locationupdate: function(geo) {
                        me.setCurrentLat(geo.getLatitude());
                        me.setCurrentLng(geo.getLongitude());
                        me.setAltitude(geo.getAltitude());
                        me.setSpeed(geo.getSpeed());
                        me.setHeading(geo.getHeading());
                        console.log('location update '+me.getCurrentLat()+' '+me.getCurrentLng());
                        stock.utils.Config.getCurrentAddressFromLocation(me.getCurrentLat(), me.getCurrentLng());
                    },
                    locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                        if(bTimeout)
                            console.log('Timeout occurred',"Could not get current position");
                        else
                            console.log('Error occurred.');
                        }
                    }
                })
            );
        }
        
        //mise à jour de la localisation
        this.getGeo().updateLocation();
    },
    /***
     * getCurrentAddressFromLocation
     * Recuperation de l'adresse depuis l API GOOGLE PLACE
     */
    getCurrentAddressFromLocation: function (lat,lng) {
        var geocoder = new google.maps.Geocoder(),
            latlng   = new google.maps.LatLng(lat, lng);

        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    console.log(results[0].formatted_address);
                    stock.utils.Config.setAddress(results[0].formatted_address);
                    Ext.getStore('Valets').getProxy().setExtraParams({
                        user_id: (stock.utils.Config.getCurrentUser())?stock.utils.Config.getCurrentUser().user_id:0,
                        logkey: stock.utils.Config.getCurrentKey(),
                        latitude: lat,
                        longitude:  lng
                    });
                    stock.utils.Config.fireEvent('locationUpdate',stock.utils.Config);
                } else {
                    console.info("No results found");
                }
            } else {
                console.info("Geocoder failed due to: " + status);
            }
        });
    },
    updateLocation: function () {
        this.getGeo().updateLocation();
    },
    resetKey: function () {
        this.setCurrentKey(null);
        this.setCurrentUser(null);
        localStorage.removeItem('key');
        localStorage.removeItem('user_id');
    },
    /********************************
     * MENU ANIMATION
     * ******************************/
    showMenu: function () {
        var menu = Ext.select('#sidemenu');
        if(menu){
            var cont = Ext.get('ext-viewport');
            //start animation
            cont.addCls('body-animated');
            menu.addCls('menu-animated');
            setTimeout(function() {
                cont.on({
                    tap: function (e) {
                        e.stopEvent();
                        stock.utils.Config.hideMenu();
                    }/*,
                    swipe: function(e, node, options) {
                        if(e.direction == "left") {
                            //alert("Hey! I swipe left");
                            stock.utils.Config.hideMenu();
                        } else {
                            //alert("Hey! I swipe right");
                        }
                    }*/
                });
            }, 400);
        }
    },
    hideMenu: function () {
        console.log('--> hide menu');
        var menu = Ext.select('#sidemenu');
        if(menu){
            var cont = Ext.get('ext-viewport');
            cont.clearListeners();
            //start animation
            cont.removeCls('body-animated');
            menu.removeCls('menu-animated');
        }
    },
    toggleMenu: function () {
        console.log('togglemenu');
        var menu = Ext.select('#sidemenu.menu-animated');
        if(menu.elements.length){
            stock.utils.Config.hideMenu();
        }else{
            stock.utils.Config.showMenu();
        }
    },
    getCreditString: function () {
        if (this.getCurrentUser())
            if (this.getCurrentUser().credit > 0){
                return 'Il vous reste '+this.getNbCredits()+' crédits.';
            }else{
                return 'Aucun crédit. Cliquez ici pour acheter des crédits';
            }
        else return 'Nombre de crédits en cours d\'acquisition ...';
    },
    _elementMenu: null,
    setElementMenu: function (el) {
        this._elementMenu = el;
    },
    resetElementMenu: function () {
        if (this._elementMenu) {
            console.log('destruction du menu',this._elementMenu);
            Ext.getBody().removeChild(this._elementMenu);
        }
    },
    restoreElementMenu: function (el) {
        if (this._elementMenu)
            Ext.getBody().insertFirst(this._elementMenu);
    },
    setSwipe: function () {
        if (this._elementMenu){
            //swipe menu
            this._elementMenu.on('swipe', this.onSwipe);
            //swipe bpdy
            Ext.Viewport.bodyElement.on('swipe', this.onSwipe);
        }
    },
    unsetSwipe: function () {
        if (this._elementMenu) {
            console.log('unswipe ',this._elementMenu);
            this._elementMenu.removeListener('swipe',this.onSwipe);
            Ext.Viewport.bodyElement.clearListeners();
        }
    },
    onSwipe: function (event, node, options) {
        console.log('swipe');
        if (event.direction == "right") {
            stock.utils.Config.showMenu();
        } else {
            stock.utils.Config.hideMenu();
        }
    }
});
