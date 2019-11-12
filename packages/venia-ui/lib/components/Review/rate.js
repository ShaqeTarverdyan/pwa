import React from 'react';
import defaultClasses from './rate.css';
import { mergeClasses } from '../../classify';
import { useRate } from '@magento/peregrine/lib/talons/Review/useRate';

const Rate = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { available_ratings, getRateOptionId } = props;

    const {
        handleMouseOut,
        handleMouseOver,
        rate,
        rating
    } = useRate({
        availabelratings: available_ratings,
        getRateOptionId
    })
    const stars = [];
    for ( let i = 1; i <= 5; i++) {
        let starClass = classes.ratingEmpty;
        if(rating >= i && rating !==null) {
            starClass = classes.ratingFilled;
        }
        stars.push(
            <i
            key={i}
            className={starClass}
            onMouseOver={() => handleMouseOver(i)}
            onClick={() => rate(i)}
            onMouseOut={() => handleMouseOut()}
            />
        )
    }
    return (
        <div className={classes.root}>{stars}</div>
    );
}

export default Rate;