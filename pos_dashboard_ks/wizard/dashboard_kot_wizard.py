from odoo import fields, models
from datetime import datetime, timedelta, date


class TableOrderCancel(models.TransientModel):
    _name = 'kot.screen.wizard'
    _description = 'Kot Screen Wizard'
    _inherit = ['mail.thread']

    def tick_ok(self):
        pass
