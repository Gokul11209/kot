# -*- coding: utf-8 -*-
from odoo import models, fields, api


class PosOrder(models.Model):
    _inherit = "pos.order"

    ni_customer_contact = fields.Char(string="Customer")
    ni_customer_flat = fields.Char(string="Vehicle No")
    ni_customer_bldg = fields.Char(string="Mobile No")
    ni_customer_street = fields.Char(string="Street")
    ni_customer_area = fields.Char(string="Area")

    @api.model
    def _order_fields(self, ui_order):
        print("===============================================11111111111111111111111")
        res_partner = self.env["res.partner"]
        res_partner.create(
            {
                "name": ui_order['ni_customer_contact'] if ui_order.get('ni_customer_contact') else '',
                'Vehicle_no': ui_order['ni_customer_flat'] if ui_order.get('ni_customer_flat') else '',
                'phone': ui_order['ni_customer_bldg'] if ui_order.get('ni_customer_bldg') else '',
                'customer_rank': 1,
            }
        )

        res = super(PosOrder, self)._order_fields(ui_order)
        res.update({
            'ni_customer_contact': ui_order['ni_customer_contact'] if ui_order.get('ni_customer_contact') else '',
            'ni_customer_flat': ui_order['ni_customer_flat'] if ui_order.get('ni_customer_flat') else '',
            'ni_customer_bldg': ui_order['ni_customer_bldg'] if ui_order.get('ni_customer_bldg') else '',
            'ni_customer_street': ui_order['ni_customer_street'] if ui_order.get('ni_customer_street') else '',
            'ni_customer_area': ui_order['ni_customer_area'] if ui_order.get('ni_customer_area') else '',

        })
        return res


class PosConfig(models.Model):
    _inherit = "pos.config"

    ni_enable_customer = fields.Boolean(string="Enable Contact for order?")


class ResPartner(models.Model):
    _inherit = "res.partner"

    Vehicle_no = fields.Char(string="Vehicle No")



