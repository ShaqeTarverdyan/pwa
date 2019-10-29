import { useMemo,useCallback } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';

/**
 * Returns props necessary to render CreateAccount component.
 *
 * @param {Object} props.initialValues initial values to sanitize and seed the form
 * @returns {{
 *   hasError: boolean,
 *   isDisabled: boolean,
 *   isSignedIn: boolean,
 *   initialValues: object
 * }}
 */
export const useCreateAccount = props => {
    const { initialValues = {}, showSignIn } = props;
    const [
        { createAccountError, isCreatingAccount, isSignedIn }
    ] = useUserContext();
    const hasError = !!createAccountError;

    const sanitizedInitialValues = useMemo(() => {
        const { email, firstName, lastName, ...rest } = initialValues;

        return {
            customer: { email, firstname: firstName, lastname: lastName },
            ...rest
        };
    }, [initialValues]);

    const handleShowSignIn = useCallback(() => {
        showSignIn();
    }, [ showSignIn]);

    return {
        hasError,
        isDisabled: isCreatingAccount,
        isSignedIn,
        initialValues: sanitizedInitialValues,
        handleShowSignIn
    };
};
