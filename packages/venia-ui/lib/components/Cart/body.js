import React from 'react';
import { array, bool, func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import LoadingIndicator from '../LoadingIndicator';

import defaultClasses from './body.css';
import EmptyCartBody from './emptyCartBody';
import ProductList from './productList';


const loadingIndicator = (
    <LoadingIndicator>{`Fetching Cart...`}</LoadingIndicator>
);

const Body = props => {
    const {
        cartItems,
        closeDrawer,
        currencyCode,
        isCartEmpty,
        isLoading,
        removeItemFromCart,
        updateItemInCart
    } = props;

    if (isLoading) {
        return loadingIndicator;
    }

    if (isCartEmpty) {
        return <EmptyCartBody closeDrawer={closeDrawer} />;
    }

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>product</th>
                    <th>name</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>total</th>
                    <th>remove</th>
                </tr>
            </thead>
            <ProductList
                cartItems={cartItems}
                currencyCode={currencyCode}
                removeItemFromCart={removeItemFromCart}
                updateItemInCart={updateItemInCart}
            />
        </table>
    );
};

Body.propTypes = {
    cartItems: array,
    classes: shape({
        root: string
    }),
    closeDrawer: func,
    currencyCode: string,
    isCartEmpty: bool,
    isLoading: bool,
    removeItemFromCart: func,
};

export default Body;
