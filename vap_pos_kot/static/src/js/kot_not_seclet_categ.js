odoo.define('vap_pos_kot.KotOrderReceipt_1', function(require) {
    'use strict';
    console.log("HHHHHHHHHHHHHhhhhhhh")

    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');

    class KotOrderReceipt_1 extends PosComponent {
        constructor() {
            super(...arguments);
            this._receiptEnv = this.props.order.getOrderReceiptEnv();
        }
        willUpdateProps(nextProps) {
            this._receiptEnv = nextProps.order.getOrderReceiptEnv();
        }
        get receipt() {
            return this.receiptEnv.receipt;
        }
        get orderlines() {
            return this.receiptEnv.orderlines;
        }
        get paymentlines() {
            return this.receiptEnv.paymentlines;
        }
        get isTaxIncluded() {
            return Math.abs(this.receipt.subtotal - this.receipt.total_with_tax) <= 0.000001;
        }
        get receiptEnv () {
          return this._receiptEnv;
        }
        isSimple(line) {
            return (
                line.discount === 0 &&
                line.is_in_unit &&
                line.quantity === 0 &&
                !(
                    line.display_discount_policy == 'without_discount' &&
                    line.price < line.price_lst
                )
            );
        }
    }
    KotOrderReceipt_1.template = 'KotOrderReceipt_1';

    Registries.Component.add(KotOrderReceipt_1);

    return KotOrderReceipt_1;
});
