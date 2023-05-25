odoo.define('vap_pos_kot.DemoButton', function(require) {
'use strict';
    const { Gui } = require('point_of_sale.Gui');
    const PosComponent = require('point_of_sale.PosComponent');
    const { posbus } = require('point_of_sale.utils');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');
    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const KotOrders = require('point_of_sale.ProductScreen')
    var core = require('web.core');
    var QWeb = core.qweb;

    class CustomDemoButtons extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }
        is_available() {
            const order = this.env.pos.get_order();
            return order
        }

         async onClick() {
            const order = this.env.pos.get_order();
            order.food_categ = false;
            order.liq_categ = false;
            var liq_kot_categ = this.env.pos.config.kot_category;
            var food_kot_categ = this.env.pos.config.another_kot_categ;
            if (order.get_orderlines().length > 0) {
                order.get_orderlines().forEach(function (orderline) {
                    var product = orderline.product;
                    orderline.categ = product.pos_categ_id[0]
                })

                order.get_orderlines().forEach(function (orderline) {
                    var product = orderline.product;
                    liq_kot_categ.forEach(function (lkc) {
                        if (product.pos_categ_id[0] === lkc){
                            order.liq_categ = true;
                        }

                    })
                    food_kot_categ.forEach(function (fkc) {
                        if (product.pos_categ_id[0] === fkc){
                            order.food_categ = true;
                        }

                    })
                })
                console.log("FFFFFFFFFFFFFFFF",order)
                this.trigger('close-popup');
                await this.showTempScreen('Kot_Screen');
            } else {
                await this.showPopup('ErrorPopup', {
                    title: this.env._t('Nothing to Print'),
                    body: this.env._t('There are no order lines'),
                });
            }
        }
   }


    CustomDemoButtons.template = 'CustomDemoButtons';
    ProductScreen.addControlButton({
        component: CustomDemoButtons,
        condition: function() {
        return this.env.pos.config.kot;
        },
   });
    Registries.Component.add(CustomDemoButtons);
    return CustomDemoButtons;
});
