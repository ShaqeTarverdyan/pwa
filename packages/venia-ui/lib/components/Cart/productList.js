import React, { useMemo } from 'react';
import { array, func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';

import Product from './product';
import defaultClasses from './productList.css';

const ProductList = props => {
    const {
        cartItems,
        currencyCode,
        removeItemFromCart,
        updateItemInCart
    } = props;

    const products = useMemo(
        () =>
            cartItems.map(product => {
                return (
                    <Product
                        currencyCode={currencyCode}
                        item={product}
                        key={product.item_id}
                        removeItemFromCart={removeItemFromCart}
                        updateItemInCart={updateItemInCart}
                    />
                );
            }),
        [cartItems, currencyCode, removeItemFromCart, updateItemInCart]
    );

    const classes = mergeClasses(defaultClasses, props.classes);

    return <tbody className={classes.root}>{products}</tbody>;
};

ProductList.propTypes = {
    cartItems: array,
    classes: shape({
        root: string
    }),
    currencyCode: string,
    removeItemFromCart: func
};

export default ProductList;
