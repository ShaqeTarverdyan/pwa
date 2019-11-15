import React from 'react';
import { array, bool, func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import defaultClasses from './shippingForm.css';
import { useShippingForm } from '@magento/peregrine/lib/talons/Checkout/useShippingForm';
import { Form, RadioGroup, Radio } from 'informed';
import { Price } from '@magento/peregrine';

const ShippingForm = props => {
    const {
        availableShippingMethods,
        isSubmitting,
        onSubmit,
        shippingMethod,
        currencyCode
    } = props;

    const talonProps = useShippingForm({
        availableShippingMethods,
        onSubmit,
        initialValue: shippingMethod
    });

    const {
        handleCancel,
        handleSubmit,
        initialValue,
        selectableShippingMethods
    } = talonProps;
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Form className={classes.root} onSubmit={handleSubmit} onValueChange={handleSubmit}>
            <RadioGroup field="shippingMethod" initialValue={initialValue}>
                {
                    availableShippingMethods.length > 0 &&
                    availableShippingMethods.map(({ method_code, title, method_title, amount }) =>
                        <div key={method_code} className={classes.method}>
                            <h2 className={classes.title}>{title}</h2>
                            <div className={classes.content}>
                                <label htmlFor={method_code}>
                                    <Radio
                                        label={method_title}
                                        id={method_code}
                                        value={method_code}
                                    />
                                    {method_title}
                                </label>
                                <span>
                                    <Price currencyCode={currencyCode} value={amount} />
                                </span>
                            </div>

                        </div>
                    )
                }
            </RadioGroup>
        </Form>
    );
};

ShippingForm.propTypes = {
    availableShippingMethods: array.isRequired,
    onCancel: func.isRequired,
    classes: shape({
        body: string,
        button: string,
        footer: string,
        heading: string,
        shippingMethod: string
    }),
    isSubmitting: bool,
    shippingMethod: string,
    onSubmit: func.isRequired,
    submitting: bool
};

ShippingForm.defaultProps = {
    availableShippingMethods: [{}]
};

export default ShippingForm;
