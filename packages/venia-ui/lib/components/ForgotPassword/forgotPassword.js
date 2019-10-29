import React, { Fragment } from 'react';
import { func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import ForgotPasswordForm from './ForgotPasswordForm';
import FormSubmissionSuccessful from './FormSubmissionSuccessful';
import defaultClasses from './forgotPassword.css';
import Button from '../Button';
import { useForgotPassword } from '@magento/peregrine/lib/talons/ForgotPassword/useForgotPassword';

const INSTRUCTIONS = 'Enter your email below to receive a password reset link.';

const ForgotPassword = props => {
    const { initialValues, onClose, showCreateAccount } = props;

    const talonProps = useForgotPassword({
        onClose,
        showCreateAccount
    });

    const {
        forgotPasswordEmail,
        handleContinue,
        handleFormSubmit,
        inProgress,
        isResettingPassword,
        handleCreateAccount
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const children = inProgress ? (
        <FormSubmissionSuccessful
            email={forgotPasswordEmail}
            onContinue={handleContinue}
        />
    ) : (
            <Fragment>
                <p className={classes.instructions}>{INSTRUCTIONS}</p>
                <ForgotPasswordForm
                    initialValues={initialValues}
                    onSubmit={handleFormSubmit}
                    isResettingPassword={isResettingPassword}
                />
            </Fragment>
        );

    return <div className={classes.root}>
        {children}
        <div className={classes.createAccount}>
            <p>New Customer?</p>
            <Button
                onClick={handleCreateAccount}
                priority="high"
                type="button"
                classes={{
                    root_lowPriority: classes.createAccountButton
                }}
            >
                Create Account</Button>
        </div>
    </div>;
};

export default ForgotPassword;

ForgotPassword.propTypes = {
    classes: shape({
        instructions: string,
        root: string,
        createAccount: string,
        createAccountButton: string
    }),
    email: string,
    initialValues: shape({
        email: string
    }),
    onClose: func.isRequired
};
