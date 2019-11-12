import  { useState, useCallback, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';


export const useReviewForm = props => {
    const { submitReviewMutation, productId } = props
    const [optionId, setOptionId] = useState(null);
    const [resultMessege, setresultMessege] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getRateOptionId = useCallback((value) => {
        setOptionId(value);
    },[optionId]);
    const refForm = useRef(null)
    const [ submitReviewData, {error: submitReviewError}] = useMutation(submitReviewMutation);

    const submitReview = useCallback(
        async (title, nickname, message, ) => {
            setIsSubmitting(true);
            const response = await submitReviewData({
                variables: {
                    product_id: Number(productId),
                    title: String(title),
                    nickname: String(nickname),
                    detail: String(message),
                    ratings: [{ rating_id: 4, option_id: optionId }]
                }
            })
            if(response && response.data.submitReview.review_id) {
                setresultMessege('Thank you for your review ;)');
                setIsSubmitting(false);
            } 
            if(submitReviewError) {
                setresultMessege(submitReviewError.graphQLErrors[0])
            }

    },[ productId, optionId, submitReviewData]);

    return {
        getRateOptionId,
        submitReview,
        resultMessege,
        isSubmitting,
        refForm
    }
}