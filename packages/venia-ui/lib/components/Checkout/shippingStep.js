import React, { useEffect } from 'react';
import defaultClasses from './shippingStep.css';
import { mergeClasses } from '../../classify';
import AddressForm from './addressForm';
import ShippingForm from './shippingForm';
import { useShippingStep } from '@magento/peregrine/lib/talons/Checkout/useShippingStep';
import TotalsSummary from '../Cart/totalsSummary';


const ShippingStep = props => {
    const { checkout,submitShippingMethod,submitShippingAddress, cart, setStep } = props;
    const { totals } = cart;
    const { total_segments } = totals;
    const classes = mergeClasses(defaultClasses, props.classes);


    const {
        countries,
        availableShippingMethods,
        shippingMethod,
        shippingAddress,
        isSubmitting, 
        isGettingShippingMethods, 
        isGettingTotals 
    } = checkout;

    const {
        currencyCode,
        subtotal,
        handleSubmitShippingMethod,
        handleSubmitShippingAddress
    } = useShippingStep({
        submitShippingMethod,
        submitShippingAddress,
        cart
    });

    return (
        <div className={classes.root}>
            <div>
                <h1>Shipping Addres</h1>
                <AddressForm 
                    countries={countries}
                    onSubmit={handleSubmitShippingAddress}
                    isSubmitting={isSubmitting}
                    initialValues={shippingAddress}
                />
            </div>
            <div>
            <h1>Shipping Information</h1>
                <ShippingForm
                    availableShippingMethods={availableShippingMethods}
                    isSubmitting={isSubmitting}
                    shippingMethod={shippingMethod}
                    onSubmit={handleSubmitShippingForm}
                    currencyCode={currencyCode}
                />
            </div>
            <div>
                <TotalsSummary
                    currencyCode={currencyCode}
                    subtotal={subtotal}
                    totalSegments={total_segments}
                />
            </div>
        </div>
    );
}

export default ShippingStep;