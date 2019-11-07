import React from 'react';
import defaultClasses from './couponCode.css';
import { mergeClasses } from '../../classify';
import { Form } from 'informed';
import Field from '../Field';
import TextInput from '../TextInput';
import { isRequired } from '../../util/formValidators';
import Button from '../Button';
import APPLY_COUPON_CODE from '../../queries/applyCouponToCart.graphql';
import REMOVE_COUPON_FROM_CART from '../../queries/removeCouponFromCart.graphql';
import { useCouponCode } from '@magento/peregrine/lib/talons/CouponCode/useCouponCode';

const CouponCode = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { cartTotals, couponCode, isMobile } = props;

    const {
        submitCoupon,
        removeCouponFromCart,
        isSubmitting,
        errorMessage,
        succesMessage,
        handleCouponCode,
        showCouponForm
    } = useCouponCode({
        applyCoupon: APPLY_COUPON_CODE,
        removeCoupon: REMOVE_COUPON_FROM_CART
    });
    const { grand_total, subtotal } = cartTotals;
    const showApplyCoupon = grand_total === subtotal;
    const couponFormRootStyle = showCouponForm ? classes.couponForm_open : classes.couponForm
    const form = (
        <Form 
            onSubmit={submitCoupon}
            className={couponFormRootStyle}
        >
            <Field>
            <p>Enter the coupon code if you have one.</p>
                <TextInput
                    field="couponCode"
                    autoComplete="couponCode"
                    validate={isRequired}
                    validateOnBlur
                />
            </Field>
            <Button
                priority='normal'
                type="submit"
                inProcess={isSubmitting}
                classes={{
                    root_normalPriority: classes.applyCoupon
                }}
            >Apply Coupon</Button>
        </Form>
    )
    const discardButton = (
        <div className={classes.disCard}>
        <p>{`Coupon Code already applied (${couponCode})`}</p>
        <Button
            priority='normal'
            type="submit"
            onClick={removeCouponFromCart}
            inProcess={isSubmitting}
            classes={{
                root_normalPriority: classes.discardCoupon
            }}
        >Discard</Button>
        </div>
    )
    return (
        <div className={classes.root}>
                <div className={classes.heading}>
                     <span>Discount Code</span>
                     <button className={classes.showCouponButton} onClick={handleCouponCode}>+</button>
                </div>
                {showApplyCoupon && form || !showApplyCoupon && discardButton}
                <p className={classes.message}>{errorMessage || succesMessage}</p>
        </div>
    )
}

export default CouponCode