import { useState } from 'react';

export const useRate = props => {
    const { availabelratings, getRateOptionId } = props;
    const [rating, setRating] = useState(null);
    const [tempRating, setTempRating] = useState(null);
    const handleMouseOut = () => {
        setRating(tempRating)
    }
    const handleMouseOver = rating => {
        setTempRating(rating)
    }

    const rate = (rating) => {
        setRating(rating);
        setTempRating(rating);
        const curentoption = availabelratings[0].options.filter(option => rating === option.value);
        getRateOptionId(curentoption[0].option_id)
    }

    return {
        handleMouseOut,
        handleMouseOver,
        rate,
        rating
    }

}