# -*- coding: utf-8 -*-
{
    'name': "POS KOT Order Print",

    'summary': """
        KOT is an abbreviation for Kitchen Order Tickets. 
        It is a note which is forwarded to the kitchen, billing division, 
        and one copy is retained in the system for future reference.
         The KOT application primarily contains details related to the table number, 
         items ordered, and their quantity.""",

    'description': """

    Food orders from different ordering platforms are accepted directly on one POS system,
    and a ticket (KOT) is generated immediately in the kitchen. 
    This ensures that any orders aren't missed or delayed and minimizes discrepancies.
    """,

    'author': "Appscomp Widgets Pvt Ltd",
    'website': "http://www.appscomp.com",

    'images': ['static/description/banner.gif'],
    'category': 'Pos',
    'version': '0.1',
    'license': 'LGPL-3',
    'currency': 'EUR',
    'price': '10',
    # any module necessary for this one to work correctly
    'depends': ['base', 'point_of_sale'],
    'data': [
        'views/kot_config.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'vap_pos_kot/static/src/js/orderlinekot.js',
            'vap_pos_kot/static/src/js/kot_btn_ info.js',
            'vap_pos_kot/static/src/js/kot_not_seclet_categ.js',
            'vap_pos_kot/static/src/js/Kot_order.js',
            'vap_pos_kot/static/src/js/models.js',
        ],

        'web.assets_backend': [
            'vap_pos_kot/static/src/js/kot.js',
        ],
        'web.assets_qweb': [
            'vap_pos_kot/static/src/views/kot_screen.xml',
            'vap_pos_kot/static/src/views/view.xml',
            'vap_pos_kot/static/src/views/kot_order.xml',
            'vap_pos_kot/static/src/views/kot_not_seclet_categ.xml',
            'vap_pos_kot/static/src/views/bill_in_receipt.xml',
            'vap_pos_kot/static/src/views/kot_in_receipt.xml',
            'vap_pos_kot/static/src/views/kot_in_receipt_2.xml',

        ],

    },

}
