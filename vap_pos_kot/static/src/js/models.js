odoo.define("vap_pos_kot.models", function (require) {
"use strict";

    var models = require('point_of_sale.models');

    var _super_orderline = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({
         export_for_printing: function () {
            var res = _super_orderline.export_for_printing.apply(this, arguments);
            res.categ = this.categ;
            res.quan = this.quan;
            return res;
     },
    });

    var _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
    export_for_printing: function () {
        var result = _super_order.export_for_printing.apply(this, arguments);
        result.bill = this.bill;
        return result;
    },

    });
});