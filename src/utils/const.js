module.exports.CATEGORY_PRODUCT_SORT_OPTIONS = {
    LOW_HIGH :{ price : 1},
    HIGH_LOW :{ price : -1},
    A_Z : { name : 1 },
    Z_A : { name : -1 }
};


module.exports.ADMIN_PRODUCTS_SORT_OPTIONS = {
    ...this.CATEGORY_PRODUCT_SORT_OPTIONS,
    STOCK_LOW_HIGH:  { stock : 1 },
    STOCK_HIGH_LOW : { stock : -1 }
};


module.exports.PRODUCT_ACTIVE_OPTIONS = {
    ACTIVE:{ active: true },
    INACTIVE: { active : false}
};