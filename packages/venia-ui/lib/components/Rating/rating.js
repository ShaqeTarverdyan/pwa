import React from 'react';
import defaultClasses from './rating.css';
import { mergeClasses } from '../../classify';


const Rating = props => {
    const { rating } = props;
    const classes = mergeClasses(defaultClasses, props.classes);\
    
    return rating && typeof rating != 'undefined' ? (
        <div className = { classes.root }>
            <div className={classes.ratingEmpty}>
                <div
                    className={classes.ratingFilled}
                    style={{ width: `${rating}%` }}
                />
            </div>
        </div>
    ) : null
}

export default Rating