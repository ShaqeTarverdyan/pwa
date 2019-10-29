import React from 'react';
import { array, bool, func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import LoadingIndicator from '../LoadingIndicator';

import defaultClasses from './body.css';
import EmptyMiniCartBody from './emptyMiniCartBody';
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
    } = props;

    if (isLoading) {
        return loadingIndicator;
    }

    if (isCartEmpty) {
        return <EmptyMiniCartBody closeDrawer={closeDrawer} />;
    }

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <ProductList
                cartItems={cartItems}
                currencyCode={currencyCode}
                removeItemFromCart={removeItemFromCart}
            />
        </div>
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
