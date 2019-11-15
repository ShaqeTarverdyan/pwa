import React, { useCallback, useEffect } from 'react';
import { func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import CheckoutButton from './checkoutButton';
import Form from './form';
import Receipt from './Receipt';
import defaultClasses from './flow.css';
import isObjectEmpty from '../../util/isObjectEmpty';
import { useToasts } from '@magento/peregrine';
import Icon from '../Icon';

import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { useFlow } from '@magento/peregrine/lib/talons/Checkout/useFlow';
const ErrorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;
import BillingStep from './billingStep';
import ShippingStep from './shippingStep';
import LoadingIndicator from '../LoadingIndicator/indicator';

/**
 * This Flow component's primary purpose is to take relevant state and actions
 * and pass them to the current checkout step.
 */
const Flow = props => {
    // const { step } = props;
    useEffect(() => {
            handleBeginCheckout()
    }, []);

    const [, { addToast }] = useToasts();
    const onSubmitError = useCallback(() => {
        addToast({
            type: 'error',
            icon: ErrorIcon,
            message:
                'Something went wrong submitting your order! Try again later.',
            timeout: 7000
        });
    }, [addToast]);

    const talonProps = useFlow({
        onSubmitError,
        setStep: props.setStep
    });

    const {
        availableShippingMethods,
        isSubmitting,
        billingAddress,
        shippingAddressError,
        shippingTitle,
        cartState,
        checkoutDisabled,
        checkoutState,
        isReady,
        submitPaymentMethodAndBillingAddress,
        submitShippingAddress,
        submitShippingMethod,
        handleBeginCheckout,
        handleCancelCheckout,
        handleCloseReceipt,
        handleSubmitOrder,
        step,
        setStep,
        handlesubmitShippingAddress,
        handlesubmitShippingForm
    } = talonProps;

    const {
        paymentData,
        shippingMethod,
        shippingAddress,
    } = checkoutState;
    const classes = mergeClasses(defaultClasses, props.classes);

    useEffect(() => {
       if(!isObjectEmpty(cartState.details && step == 'loading'))  {
           setStep('shippingStep')
        }
    },[]);

    let child;
    switch (step) {
        case 'loading': {
            child = <LoadingIndicator/>;
            break;
        }
        case 'shippingStep': {
            const stepProps = {
                        availableShippingMethods,
                        billingAddress,
                        cancelCheckout: handleCancelCheckout,
                        cart: cartState,
                        checkout: checkoutState,
                        hasPaymentMethod: !!paymentData && !isObjectEmpty(paymentData),
                        hasShippingAddress:
                            !!shippingAddress && !isObjectEmpty(shippingAddress),
                        hasShippingMethod:
                            !!shippingMethod && !isObjectEmpty(shippingMethod),
                        isSubmitting,
                        paymentData,
                        ready: isReady,
                        shippingAddress,
                        shippingAddressError,
                        shippingMethod,
                        shippingTitle,
                        submitShippingAddress,
                        submitPaymentMethodAndBillingAddress,
                        submitShippingMethod,
                        setStep        
            };
            child = <ShippingStep {...stepProps}/>;
            break;
        }
       
        case 'receipt': {
            child = <Receipt onClose={handleCloseReceipt} />;
            break;
        }
        default: {
            child = null;
        }
    }

    return <div className={classes.root}>
        <h1 className={classes.title}>Secure Checkout</h1>
        {child}
    </div>;
};

Flow.propTypes = {
    classes: shape({
        root: string
    }),
    setStep: func,
    step: string
};

export default Flow;
