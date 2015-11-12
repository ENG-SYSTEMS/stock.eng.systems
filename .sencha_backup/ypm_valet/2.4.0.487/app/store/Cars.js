Ext.define("stock.store.Cars", {
    extend: 'Ext.data.Store',
    alias: 'store.Cars',
    config: {
        model: 'stock.model.Car',
        clearOnPageLoad: true,
        pageSize: 10,
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            url: stock.utils.Config.getStoreCar(),
            method: 'POST',
            actionMethods: {
                create : 'POST',
                read   : 'POST', // by default GET
                update : 'POST',
                destroy: 'POST'
            },
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }
});
