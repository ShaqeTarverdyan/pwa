import React from 'react';
import defaultClasses from './reviewForm.css';
import { mergeClasses } from '../../classify';
import { Form } from 'informed';
import Field from '../Field';
import TextInput from '../TextInput';
import { isRequired } from '../../util/formValidators';
import Button from '../Button';
import TextArea from '../TextArea';
import { useReviewForm } from '@magento/peregrine/lib/talons/Review/useReviewForm';
import SUBMIT_REVIEW from '../../queries/submitReview.graphql';

import Rate from './rate';


const ReviewForm = props => {
    const classes = mergeClasses(defaultClasses, defaultClasses);
    const { available_ratings, productId } = props;
    const {
        getRateOptionId,
        submitReview,
        resultMessege,
        isSubmitting,
        refForm
    } = useReviewForm({
        submitReviewMutation: SUBMIT_REVIEW,
        productId
    });

    return (
        <Form
            onSubmit={submitReview}
            className={classes.root}
            ref={refForm}
        >
            <Field
                label='Your rating'
                required={true}
                classes={{ root: classes.rate }}
            >
                <Rate getRateOptionId={getRateOptionId} available_ratings={available_ratings} />
            </Field>
            <div className={classes.formGroup}>
                <Field label="Name" required={true}>
                    <TextInput
                        field="name"
                        autoComplete="name"
                        validate={isRequired}
                        validateOnBlur
                    />
                </Field>
                <Field label="Email" required={true}>
                    <TextInput
                        field="email"
                        autoComplete="emial"
                        validate={isRequired}
                        validateOnBlur
                    />
                </Field>
            </div>

            <Field label="Your review" required={true}>
                <TextArea
                    autoComplete="message"
                    field="message"
                    validate={isRequired}
                />
            </Field>
            <Button
                priority='high'
                type="submit"
                inProcess={isSubmitting}
                classes={{ root_highPriority: classes.submitButton }}
            >Submit</Button>
            <div className={classes.message}>{resultMessege}</div>
        </Form>
    );

}

export default ReviewForm;