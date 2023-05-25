from odoo import models, fields, api
from re import search
from functools import partial


class PosOrder(models.Model):
    _inherit = "pos.order"

    is_bill_final = fields.Boolean(string='Final Bill', default=False)

    def action_to_bill_final(self, id):
        value = False
        order = self.env['pos.order'].search([('pos_reference', '=', id)])
        if order:
            order.is_bill_final = True
            value = order.is_bill_final
            return value
        return value

    def check_final_bill(self, id):
        print("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",id)
        id = self.search([('pos_reference', '=', id)])
        if id:
            value = id.is_bill_final
            return value
        else:
            return False
