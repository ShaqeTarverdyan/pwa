import React from 'react';
import { shape, string } from 'prop-types';


import { mergeClasses } from '../../classify';
import defaultClasses from './cartTrigger.css';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { useWindowSize } from '@magento/peregrine';



const CartTrigger = props => {
    const { handleClick, itemCount } = useCartTrigger();
    const classes = mergeClasses(defaultClasses, props.classes);
    const buttonAriaLabel = `Toggle mini cart. You have ${itemCount} items in your cart.`;
    const itemCounterStyle = itemCount ? classes.itemCounter : classes.itemCounter_close;
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;

    return (
        <div className={classes.root}>
            <button
                disabled={!isMobile}
                aria-label={buttonAriaLabel}
                onClick={handleClick}
            >
                 <span className={classes.iconCart} />
            </button>
            <span className={itemCounterStyle}> {itemCount }</span>
        </div>

    );
};

CartTrigger.propTypes = {
    classes: shape({
        root: string
    })
};

export default CartTrigger;
