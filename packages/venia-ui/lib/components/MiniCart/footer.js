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
                <Button priority='normal'><Link to="/cart">View Cart</Link></Button>
                <Button priority='high'>Checkout</Button>
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
