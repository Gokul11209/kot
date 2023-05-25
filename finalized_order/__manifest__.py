# -*- coding: utf-8 -*-
{
    'name': "Finalized Order",
    'category': 'Pos',
    'version': '0.1',
    'license': 'LGPL-3',
    'currency': 'EUR',
    'price': '10',
    # any module necessary for this one to work correctly
    'depends': ['base', 'point_of_sale', 'pos_restaurant'],
    'data': [
        'views/pos_order.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'finalized_order/static/js/bill_btn_etc.js',
            'finalized_order/static/js/models.js',
        ],
        'web.assets_backend': [],
        'web.assets_qweb': [],

    },

}
