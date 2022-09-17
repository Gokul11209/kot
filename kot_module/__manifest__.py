# -*- coding: utf-8 -*-
{
    'name': "POS KOT Current Order Print",

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

    'author': "Appscomp",
    'website': "http://www.appscomp.com",

    
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'point_of_sale'],
    'assets': {
        'point_of_sale.assets': [
            'kot_module/static/src/js/kot_btn_ info.js',
            'kot_module/static/src/js/Kot_order.js',
        ],

        'web.assets_backend': [
            'kot_module/static/src/js/kot.js',
        ],
        'web.assets_qweb': [
            'kot_module/static/src/views/kot_screen.xml',
            'kot_module/static/src/views/view.xml',
            'kot_module/static/src/views/kot_order.xml',

        ],

    },

    

}
