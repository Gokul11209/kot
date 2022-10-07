odoo.define('EasyERPS_pos_auto_print_kitchen_receipt.ReceiptScreen', function (require) {
    'use strict';

    const ReceiptScreen = require('point_of_sale.ReceiptScreen');
    const Registries = require('point_of_sale.Registries');

    const customReceiptScreen = ReceiptScreen =>
        class extends ReceiptScreen {

            async printReceipt() {
                var order = this.env.pos.get_order();
                const isPrinted = await this._printReceipt();
                if (isPrinted) {
                    order.printChanges()
                    this.currentOrder._printed = true;
                }
            }

        };

    Registries.Component.extend(ReceiptScreen, customReceiptScreen);

    return ReceiptScreen;
});