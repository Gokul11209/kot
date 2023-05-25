odoo.define('ni_pos_customer_detail.models', function (require) {
"use strict";

    var models = require('point_of_sale.models');
    var _super_order = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({
        initialize: function(attr,options) {
            _super_order.initialize.apply(this,arguments);
            this.quan = 0;
        },
})
    return models;
});

