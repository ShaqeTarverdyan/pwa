import React from 'react';
import { shape, string, func } from 'prop-types';
import { Form } from 'informed';

import { mergeClasses } from '../../classify';
import Button from '../Button';
import Field from '../Field';
import LoadingIndicator from '../LoadingIndicator';
import TextInput from '../TextInput';
import { isRequired } from '../../util/formValidators';

import defaultClasses from './signIn.css';
import { useSignIn } from '@magento/peregrine/lib/talons/SignIn/useSignIn';

const SignIn = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        errorMessage,
        formRef,
        handleCreateAccount,
        handleForgotPassword,
        handleSubmit,
        isBusy
    } = useSignIn(props);

    if (isBusy) {
        return (
            <div className={classes.modal_active}>
                <LoadingIndicator>{'Signing In'}</LoadingIndicator>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <p className={classes.title}>Sign in to your account</p>
            <Form
                ref={formRef}
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <Field label="Login or Email" required={true}>
                    <TextInput
                        autoComplete="email"
                        field="email"
                        validate={isRequired}
                    />
                </Field>
                <Field label="Password" required={true}>
                    <TextInput
                        autoComplete="current-password"
                        field="password"
                        type="password"
                        validate={isRequired}
                    />
                </Field>
                <div className={classes.signInError}>{errorMessage}</div>
                <div>
                    <Button priority="high" type="submit" classes={{root_highPriority: classes.signinButton}}>
                        {'Sign In'}
                    </Button>
                </div>
            </Form>
            <div className={classes.forgotPassword}>
                <Button
                    priority="low"
                    type="button"
                    onClick={handleForgotPassword}
                    classes={{
                        root_lowPriority: classes.forgotPasswordButton
                    }}
                >
                    {'Forgot Password?'}
                </Button>
            </div>
            <div className={classes.createAccount}>
                <p>new Customer?</p>
                <Button
                    priority="high"
                    type="button"
                    onClick={handleCreateAccount}
                    classes={{
                        root_highPriority: classes.createAccountButton
                    }}
                >
                    {'Create an Account'}
                </Button>
            </div>
        </div>
    );
};

export default SignIn;

SignIn.propTypes = {
    classes: shape({
        createAccountButton: string,
        form: string,
        forgotPassword: string,
        forgotPasswordButton: string,
        createAccount: string,
        root: string,
        signInButton: string,
        signInDivider: string,
        signInError: string,
        modal_active: string
    }),
    setDefaultUsername: func.isRequired,
    showCreateAccount: func.isRequired,
    showForgotPassword: func.isRequired
};
