odoo.define("finalized_order.models", function (require) {
"use strict";
    console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGg")

    var utils = require('web.utils');
    var field_utils = require('web.field_utils');
    var round_pr = utils.round_precision;
    var core = require('web.core');
    var models = require('point_of_sale.models');
    var PosComponent = require('point_of_sale.PosComponent');
    var _super_payment = models.Paymentline.prototype;
    var _super_Orderline = models.Orderline.prototype;
    var { Gui } = require('point_of_sale.Gui');
    var _t = core._t;
    var round_di = utils.round_decimals;


    var _super_posmodel = models.PosModel.prototype;
    models.PosModel = models.PosModel.extend({
        set_order_on_table: function(order) {
        var orders = this.get_order_list();
                // do not mindlessly set the first order in the list.
//                orders = orders.filter(order => order.is_bill_final);
        if (orders.length) {
            this.set_order(orders[0]);
        } else {
            this.add_new_order();
        }
    },

    });

    var _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
         initialize: function(attr,options) {
            _super_order.initialize.apply(this,arguments);
        },

        init_from_JSON: function (json) {
            _super_order.init_from_JSON.apply(this, arguments);
            this.is_bill_final = this.pos_order_final_bill();
            this.bill_validation();
        },

        export_as_JSON: function () {
            return _.extend(_super_order.export_as_JSON.apply(this, arguments), {
                is_bill_final: this.is_bill_final ? this.is_bill_final : false,
            });
        },

        pos_order_final_bill: function(){
            var value = this.pos.rpc({
                model: 'pos.order',
                method: 'check_final_bill',
                args: [[],this.name],
            });
            console.log("value",value)
            return value
        },

        set_to_invoice: function(to_invoice) {
//            this.assert_editable();
            this.to_invoice = to_invoice;
        },
        bill_validation: function(){
            console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLlll",this.is_bill_final)
            if (this.is_bill_final == true) {
                this.finalized = true;
            }
        },
        save_to_db: function(){
            if (!this.temporary && !this.locked) {
//                this.assert_editable();
                this.pos.db.save_unpaid_order(this);
            }
        },


        add_paymentline: function(payment_method) {
            if (this.electronic_payment_in_progress()) {
                return false;
            } else {
                var newPaymentline = new models.Paymentline({},{order: this, payment_method:payment_method, pos: this.pos});
                newPaymentline.set_amount(this.get_due());
                this.paymentlines.add(newPaymentline);
                this.select_paymentline(newPaymentline);
                if(this.pos.config.cash_rounding){
                  this.selected_paymentline.set_amount(0);
                  this.selected_paymentline.set_amount(this.get_due());
                }

                if (payment_method.payment_terminal) {
                    newPaymentline.set_payment_status('pending');
                }
                return newPaymentline;
            }
        },
        remove_paymentline: function(line){
            if(this.selected_paymentline === line){
                this.select_paymentline(undefined);
            }
            this.paymentlines.remove(line);
        },


        export_for_printing: function () {
            var result = _super_order.export_for_printing.apply(this, arguments);
            result.is_bill_final = this.is_bill_final;
            return result;
        },

    });


    models.Paymentline = models.Paymentline.extend({
        set_amount: function(value){
            this.amount = round_di(parseFloat(value) || 0, this.pos.currency.decimals);
            if (this.pos.config.iface_customer_facing_display) this.pos.send_current_order_to_customer_facing_display();
            this.trigger('change',this);
        },

    });

});