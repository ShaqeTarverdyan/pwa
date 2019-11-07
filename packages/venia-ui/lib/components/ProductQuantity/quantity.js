import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import Button from '../Button';
import defaultClasses from './quantity.css';

const Quantity = props => {
    const { classes: propClasses, handleDecrement, handleIncrement, productQuantity } = props;
    const classes = mergeClasses(defaultClasses, propClasses);

    return (
        <div className={classes.root}>
            <Button
                priority="low"
                type="submit"
                classes={{ root_lowPriority: classes.actionButton }}
                onClick={handleDecrement}
            >
                <span>-</span>
            </Button>
            <span>{productQuantity}</span>
            <Button
                priority="low"
                type="submit"
                classes={{ root_lowPriority: classes.actionButton }}
                onClick={handleIncrement}
            >
                <span>+</span>
            </Button>
        </div>
    );
};
Quantity.propTypes = {
    classes: shape({
        root: string
    }),
    items: arrayOf(
        shape({
            value: number
        })
    )
};

Quantity.defaultProps = {
    selectLabel: "product's quantity"
};

export default Quantity;
