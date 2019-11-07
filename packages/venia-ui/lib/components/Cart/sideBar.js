import React from 'react';
import defaultClasses from './sideBar.css';
import { mergeClasses } from '../../classify';

import Button from '../Button';
import CouponCode from './couponCode';
import TotalsSummary from './totalsSummary';

const SideBar = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { currencyCode, subtotal, cart, isMobile } = props;
    const { totals } = cart;
    const { total_segments, coupon_code } = totals;

    return (
        <div className={classes.root}>
            <CouponCode
                cartTotals={totals}
                couponCode={coupon_code}
                isMobile={isMobile}
            />
            <TotalsSummary
                currencyCode={currencyCode}
                subtotal={subtotal}
                totalSegments={total_segments}
            />
            <Button
                priority='high'
                type="submit"
                classes={{
                    root_highPriority: classes.checkout
                }}
            > Procced to checkout</Button>
        </div>
    );
}

export default SideBar;