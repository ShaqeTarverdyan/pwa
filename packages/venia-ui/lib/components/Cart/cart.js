import React from 'react';
import { shape, string, bool } from 'prop-types';

import Body from './body';
import SideBar from './sideBar';
import defaultClasses from './cart.css';
import { useWindowSize } from '@magento/peregrine';
import Footer from './footer';

import { mergeClasses } from '../../classify';
import { useCart } from '@magento/peregrine/lib/talons/Cart/useCart';

const Cart = props => {
    const {
        cartItems,
        cartState,
        currencyCode,
        handleUpdateItemInCart,
        isLoading,
        removeItemFromCart,
        subtotal
    } = useCart();
    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;
    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Cart</h1>
            <div className={classes.content}>
                <div>
                    <Body
                        cartItems={cartItems}
                        currencyCode={currencyCode}
                        isCartEmpty={cartState.isEmpty}
                        isLoading={isLoading}
                        removeItemFromCart={removeItemFromCart}
                        updateItemInCart={handleUpdateItemInCart}
                    />
                    <Footer />
                </div>
                <SideBar
                    currencyCode={currencyCode}
                    subtotal={subtotal}
                    cart={cartState}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
};

Cart.propTypes = {
    classes: shape({
        header: string,
        root: string,
        root_open: string,
        title: string
    }),
    isOpen: bool
};

export default Cart;
