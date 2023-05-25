from odoo import models, fields ,api


class PosConfig(models.Model):
    _inherit = 'pos.config'

    kot = fields.Boolean(string='Enable Kitchen Order Print')
    kot_category = fields.Many2many('pos.category','kot_print_pos_category', string='Kot Category',)
    another_kot_categ = fields.Many2many('pos.category','another_kot_print_pos_category', string='Another Kot Category',)
    duplicate_receipt = fields.Boolean(string='Kot Duplicate Receipt')

    bill_with_kot = fields.Boolean(string='Enable Receipt With Kitchen Order Print')
