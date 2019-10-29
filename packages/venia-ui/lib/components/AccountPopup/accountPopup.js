import React from 'react';
import { shape, string, func, bool } from 'prop-types';
import defaultClasses from './accountPopup.css';
import { mergeClasses } from '../../classify';
import { useAccountPopup } from '@magento/peregrine/lib/talons/AccountPopup/useAccountPopup';
import AuthModal from '../AuthModal';


const AccountPopup = props => {
    const {
        isOpen,
        handleClose,
        showCreateAccount,
        showForgotPassword,
        showMyAccount,
        showSignIn,
        view
    } = useAccountPopup();

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isOpen ? classes.root_open : classes.root;
    
    return (
        <aside className={rootClass}>
            <div className={classes.buttonGroup}>
                <button
                    onClick={showSignIn}
                    className={classes[view === 'SIGN_IN' || 'FORGOT_PASSWORD' ? 'active' : 'common']}
                >Sign in</button>
                <button
                    onClick={showCreateAccount}
                    className={classes[view === 'CREATE_ACCOUNT' ? 'active' : 'common']}
                >Register</button>
            </div>
            <span className={classes.iconUser } />
            <div className={classes.autModal}>
                <AuthModal
                    closeDrawer={handleClose}
                    showCreateAccount={showCreateAccount}
                    showForgotPassword={showForgotPassword}
                    showMyAccount={showMyAccount}
                    showSignIn={showSignIn}
                    view={view}
                />
            </div>
        </aside>
    );
}


AccountPopup.propTypes = {
    classes: shape({
        rootClass: string,
        buttonGroup: string,
        autModal: string,
    }),
    view: string,
    showSignIn: func,
    showForgotPassword: func,
    showCreateAccount: func,
    handleClose: func,
    isOpen: bool
};

export default AccountPopup;

