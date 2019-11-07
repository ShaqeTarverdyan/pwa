import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

export const useCouponCode = props => {
    const { applyCoupon, removeCoupon } = props
    const [cartState, { getCartDetails }] = useCartContext();
    const { cartId } = cartState;


    const [succesMessage, setSuccesMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCouponForm, setShowCouponForm] = useState(false)

    const [applyCouponCode, {error: applyCouponError}] = useMutation(applyCoupon);
    const [removeCouponCode, {error: removeCouponError}] = useMutation(removeCoupon);

    const handleCouponCode = () => {
        setShowCouponForm(!showCouponForm)
    }
    const submitCoupon =useCallback(
       async  ({ couponCode }) => {
            setIsSubmitting(true);
           const response = await applyCouponCode({
                variables: {
                    cart_id: String(cartId),
                    coupon_code: String(couponCode)
                }
            });
            if(response &&  response.data.applyCouponToCart.cart.applied_coupon.code ) {
                setSuccesMessage('Successfully Applied the coupon');
                setIsSubmitting(false);
                getCartDetails();
            }
            if(applyCouponError) {
                setErrorMessage(applyCouponError.graphQLErrors[0])
            }
        },[cartId]);


    const removeCouponFromCart = useCallback(
       async () => { 
        setIsSubmitting(true);
        const response =  await removeCouponCode({
             variables: {
                 cart_id: String(cartId)
             }
         });
         if(response && response.data.removeCouponFromCart) {
            setSuccesMessage('Successfully Discarded the coupon');
            setIsSubmitting(false);
            getCartDetails();
         }
         if(removeCouponError) {
            setErrorMessage(removeCouponError.graphQLErrors[0])
         }
       }, [cartId]);

    return {
        submitCoupon,
        removeCouponFromCart,
        cart: cartState,
        isSubmitting,
        errorMessage : applyCouponError,
        succesMessage,
        handleCouponCode,
        showCouponForm
    }
}