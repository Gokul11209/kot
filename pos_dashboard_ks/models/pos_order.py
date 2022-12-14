#############################################################################
#
#    Cybrosys Technologies Pvt. Ltd.
#
#    Copyright (C) 2020-TODAY Cybrosys Technologies(<https://www.cybrosys.com>)
#    Author: Cybrosys Techno Solutions(<https://www.cybrosys.com>)
#
#    You can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
#############################################################################

from odoo import models, fields, api
import logging

_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = "pos.order"

    start_date = fields.Datetime(string="Start date")
    end_date = fields.Datetime(string="End date")
    dashboard_state = fields.Char(compute="compute_dashboard_state", store=True, default="pending")

    def get_kot_order_report(self):
        print('******************')
        return self.env.ref('pos_dashboard_ks.dashboard_kot_order_report').report_action(self, data={})

    @api.depends('lines.dashboard_state')
    def compute_dashboard_state(self):
        for order in self:
            order.dashboard_state = 'pending'
            if len(order.lines.filtered(lambda r: r.dashboard_state == 'in_progress')) > 0:
                order.dashboard_state = 'in_progress'
            if len(order.lines.filtered(lambda r: r.dashboard_state == 'done')) == len(order.lines):
                order.dashboard_state = 'done'


class PosOrderLine(models.Model):
    _inherit = "pos.order.line"

    start_date = fields.Datetime(string="Start date")
    end_date = fields.Datetime(string="End date")
    dashboard_state = fields.Selection(compute="compute_dashboard_state", store=True,
                                       selection=[('pending', 'Pending'), ('in_progress', 'In progres'),
                                                  ('done', 'Done')], default="pending")

    @api.depends('start_date', 'end_date')
    def compute_dashboard_state(self):
        for line in self:
            line.dashboard_state = 'pending'
            if line.start_date:
                line.dashboard_state = 'in_progress'
            if line.end_date:
                line.dashboard_state = 'done'
            if line.start_date and line.end_date:
                time_delta = (line.end_date - line.start_date)

    def state_change(self, state):
        if 'start_date' in state:
            self.start_date = state['start_date']
        if 'end_date' in state:
            self.end_date = state['end_date']

    def kot_function(self, id):
        item = []
        item_2 = []
        print("=======================================================111111111111",id)
        orders = self.env["pos.order.line"].search([('id', '=', id)])
        for i in orders:
            for j in i.order_id.lines:
                values = {
                    'product': j.full_product_name,
                    'qty': j.qty,
                }
                item_2.append(values)
            item_9 = {
                'company_name': i.order_id.company_id.name,
                'table': i.order_id.table_id.name,
                'date': i.order_id.create_date,
                'ref_num': i.order_id.pos_reference,
                'waiter': i.order_id.create_uid.name,
                'order': item_2,
            }
        item.append(item_9)
        # print('+++++++', item_9['order'])
        items_2 = []
        n = 0
        # for i in orders:
        #     order = i.order_id
        #         # print('======================================',
        #         #       j.full_product_name, j.qty, i.order_id.table_id.name)
        #     values = {
        #         'id': order,
        #     }
        #         # if n == 0:
        #         #     values["table"] = i.order_id.table_id.name
        #         #     values["ref_num"] = i.order_id.pos_reference
        #         #     values["company_id"] = i.order_id.company_id
        #         #     values['waiter'] = i.order_id.create_uid.name
        #         #     values['date'] = i.order_id.create_date
        #     items.append(values)
        #         # n += 1
        #     print('======================================', len(orders))
        return item


