import { useCallback } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import getCurrencyCode from '@magento/peregrine/lib/util/getCurrencyCode';

export const useShippingStep = props => {
    const {  submitShippingMethod, submitShippingAddress, cart } = props;
    // const [
    //     cartState, { getCartDetails }
    // ] = useCartContext();
    const currencyCode = getCurrencyCode(cart);
    const subtotal = cartState.totals.subtotal;

    const handleSubmitShippingMethod = useCallback(
        async formValues => {
            await submitShippingMethod({
                formValues
            });
        },
        [submitShippingMethod]
    );

    const handleSubmitShippingAddress = useCallback(
        async formValues => {
            await submitShippingAddress({
                formValues
            });
        }, 
        [submitShippingAddress]
    )
    return {
        currencyCode,
        subtotal,
        handleSubmitShippingMethod,
        handleSubmitShippingAddress
    }
}