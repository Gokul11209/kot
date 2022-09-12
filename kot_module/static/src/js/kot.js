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


   class CustomDemoButtons extends PosComponent {
   	constructor() {
       	super(...arguments);
       	useListener('click', this.onClick);
   	}
   	is_available() {
       	const order = this.env.pos.get_order();
       	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1", order.get_orderlines())
       	return order
   	}
    get order() {
        return this.env.pos.get_order();
    }
    get orderlineArray() {
        return this.order ? this.order.get_orderlines() : [];
    }
   	onClick() {
//   	    console.log("====================",orderlineArray)
//   	    const customer = this.env.pos.get_order().get_client();
//            const searchDetails = customer ? { fieldName: 'CUSTOMER', searchTerm: customer.name } : {};
//            this.trigger('close-popup');
//            this.showScreen('TicketScreen', {
//                ui: { filter: 'SYNCED', searchDetails },
//                destinationOrder: this.env.pos.get_order(),
//            });
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