import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useUserContext } from '@magento/peregrine/lib/context/user';


export const useAccountPopup = () => {
    // retrieve app state from context
    const [appState, { closeDrawer }] = useAppContext();
    const [, { getUserDetails }] = useUserContext();

    // request data from server
    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);

    // extract relevant data from app state
    const { drawer } = appState;
    const isOpen = drawer === 'account';

    //local State
    const [view, setView] = useState('SIGN_IN');

    const handleClose = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);


    // create callbacks for local state
    const showCreateAccount = useCallback(() => {
        setView('CREATE_ACCOUNT');
    }, [setView]);
    const showForgotPassword = useCallback(() => {
        setView('FORGOT_PASSWORD');
    }, [setView]);
    const showMyAccount = useCallback(() => {
        setView('MY_ACCOUNT');
    }, [setView]);
    const showSignIn = useCallback(() => {
        setView('SIGN_IN');
    }, [setView]);

    return {
        isOpen,
        handleClose,
        showCreateAccount,
        showForgotPassword,
        showMyAccount,
        showSignIn,
        view,
    };
};




