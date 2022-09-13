odoo.define('kot_module.DemoButton', function(require) {
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

        is_kot () {
            console.log("11111111111111")

//            var self = this;
//            var order = this.get_order();
//
//            // If we're using an external device like the IoT Box, we
//            // cannot get /web/image?model=product.product because the
//            // IoT Box is not logged in and thus doesn't have the access
//            // rights to access product.product. So instead we'll base64
//            // encode it and embed it in the HTML.
//            var get_image_promises = [];
//
//            if (order) {
//                order.get_orderlines().forEach(function (orderline) {
//                    var product = orderline.product;
//                    console.log("22222222222222")
//    //                var image_url = "/web/image?model=product.product&field=image_128&id=${product.id}&write_date=${product.write_date}&unique=1";
//    //
//    //                // only download and convert image if we haven't done it before
//                    if (! product.image_base64) {
//                        get_image_promises.push(self._convert_product_img_to_base64(product));
//                    }
//                });
//            }
//
//            return Promise.all(get_image_promises).then(function () {
//                return QWeb.render('CustomerFacingDisplayOrder', {
//                    pos: self.env.pos,
//                    origin: window.location.origin,
//                    order: order,
//                    });
//                });
            }


        onClick() {
            const orderline = this.env.pos.get_order().get_selected_orderline();
            if (orderline) {
                const product = orderline.get_product();
                const quantity = orderline.get_quantity();
                this.showPopup('KotPopup', { product, quantity });
            }
        }
   }


    CustomDemoButtons.template = 'CustomDemoButtons';
    ProductScreen.addControlButton({
        component: CustomDemoButtons,
        condition: function() {
        return this.env.pos;
        },
   });
    Registries.Component.add(CustomDemoButtons);
    return CustomDemoButtons;
});