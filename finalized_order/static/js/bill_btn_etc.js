odoo.define('finalized_order.FinalOrder', function (require) {
    'use strict';

    const BillButton = require('pos_restaurant.PrintBillButton');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');

    const PosBillBtn = (BillButton) =>
        class extends BillButton {
            async onClick() {
                const order = this.env.pos.get_order();
                if (order.get_orderlines().length > 0) {
                    this.rpc({
                        model: 'pos.order',
                        method: 'action_to_bill_final',
                        args: [[], order.name],
                    })
                    order.finalized = true;
                    order.initialize_validation_date();
                    this.trigger('close-popup');
                    await this.showTempScreen('BillScreen');
                } else {
                    await this.showPopup('ErrorPopup', {
                        title: this.env._t('Nothing to Print'),
                        body: this.env._t('There are no order lines'),
                    });
                }
            }

        };

    Registries.Component.extend(BillButton, PosBillBtn);

    return BillButton;
});
