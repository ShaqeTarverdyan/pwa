import { useCallback } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import getCurrencyCode from '@magento/peregrine/lib/util/getCurrencyCode';

export const useCart = () => {
    const [
        cartState,
        { updateItemInCart, removeItemFromCart }
    ] = useCartContext();

    const { isLoading } = cartState;

    const currencyCode = getCurrencyCode(cartState);
    const cartItems = cartState.details.items;
    const subtotal = cartState.totals.subtotal;

    const handleUpdateItemInCart = useCallback(
        async (...args) => {
            try {
                await updateItemInCart(...args);
            } catch (error) {
                console.log('Unable to update item:', error.message);
            } finally {
                setIsEditingItem(false);
            }
        },
        [updateItemInCart]
    );

    return {
        cartItems,
        cartState,
        currencyCode,
        handleUpdateItemInCart,
        isLoading,
        removeItemFromCart,
        subtotal
    };
};
