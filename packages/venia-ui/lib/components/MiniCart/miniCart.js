import React from 'react';
import { shape, string, bool } from 'prop-types';

import Body from './body';
import Footer from './footer';
import Mask from './mask';
import Header from './header';
import defaultClasses from './miniCart.css';
import { useWindowSize } from '@magento/peregrine';

import { mergeClasses } from '../../classify';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';

const MiniCart = props => {
    const {
        cartItems,
        cartState,
        currencyCode,
        handleBeginEditItem,
        handleDismiss,
        handleEndEditItem,
        handleClose,
        handleUpdateItemInCart,
        isEditingItem,
        isLoading,
        isMiniCartMaskOpen,
        isOpen,
        isUpdatingItem,
        numItems,
        removeItemFromCart,
        setStep,
        shouldShowFooter,
        step,
        subtotal
    } = useMiniCart();
    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;
    const mobileRootClass = isOpen ? classes.root_open : classes.root_mobile;
    const rootClassName = isMobile ? mobileRootClass : classes.root_desktop;

    const footer = shouldShowFooter ? (
        <Footer
            currencyCode={currencyCode}
            isMiniCartMaskOpen={isMiniCartMaskOpen}
            numItems={numItems}
            setStep={setStep}
            step={step}
            subtotal={subtotal}
        />
    ) : null;

    return (
        <aside className={rootClassName}>
            {isMobile && <Header closeDrawer={handleClose} isEditingItem={isEditingItem} />}
            <Body
                beginEditItem={handleBeginEditItem}
                cartItems={cartItems}
                closeDrawer={handleClose}
                currencyCode={currencyCode}
                endEditItem={handleEndEditItem}
                isCartEmpty={cartState.isEmpty}
                isEditingItem={isEditingItem}
                isLoading={isLoading}
                isUpdatingItem={isUpdatingItem}
                removeItemFromCart={removeItemFromCart}
                updateItemInCart={handleUpdateItemInCart}
            />
            {isMobile && <Mask isActive={isMiniCartMaskOpen} dismiss={handleDismiss} />}
            {footer}
        </aside>
    );
};

MiniCart.propTypes = {
    classes: shape({
        header: string,
        root: string,
        root_open: string,
        title: string
    }),
    isOpen: bool
};

export default MiniCart;
