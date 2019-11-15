import React from 'react';
import { bool, number, object, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import { Link } from '@magento/venia-drivers';
import Button from '../Button';

import defaultClasses from './footer.css';
import TotalsSummary from './totalsSummary';

const Footer = props => {
    const {
        currencyCode,
        isMiniCartMaskOpen,
        numItems,
        subtotal
    } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    const footerClassName = isMiniCartMaskOpen
        ? classes.root_open
        : classes.root;

    return (
        <div className={footerClassName}>
            <TotalsSummary
                currencyCode={currencyCode}
                numItems={numItems}
                subtotal={subtotal}
            />
            <div className={classes.buttonGroup}>
                <Link to="/cart"><Button priority='normal' classes={{root_normalPriority: classes.cartButton}}>View Cart</Button></Link>
                <Link to="/checkout"><Button priority='high'  classes={{root_highPriority: classes.checkoutButton}}>Checkout</Button></Link>
            </div>
        </div>
    );
};

Footer.propTypes = {
    cart: object,
    classes: shape({
        placeholderButton: string,
        root: string,
        root_open: string,
        summary: string
    }),
    currencyCode: string,
    isMiniCartMaskOpen: bool,
    numItems: number,
    subtotal: number
};

export default Footer;
