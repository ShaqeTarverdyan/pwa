import { useCallback, useState, useMemo } from 'react';

export const useProduct = props => {
    const { item, removeItemFromCart, updateItemInCart } = props;
    const { image, name, options, price, qty } = item;
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveItem = useCallback(() => {
        setIsLoading(true);
        removeItemFromCart({ item });
    }, [item, removeItemFromCart]);

    const subTotal = useMemo(() => {
        const total = qty * price;
        return total;
    }, [qty, price]);

    const updateQuantity = useCallback((qty) => {
        const payload = {
            item: item,
            productType: item.__typename,
            quantity: qty
        };
        updateItemInCart(payload, item.item_id);
    }, []);
    
    const handleDecrement = useCallback(() => {
        updateQuantity(qty - 1);
    }, []);

    const handleIncrement = useCallback(() => {
        updateQuantity(qty + 1);
    }, []);

    return {
            handleRemoveItem,
            hasImage: image && image.file,
            productName: name,
            productOptions: options,
            productPrice: price,
            productQuantity: qty,
            subTotal,
            handleDecrement,
            handleIncrement
    };
};
