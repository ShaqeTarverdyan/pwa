import React from 'react';
import { number, shape, string } from 'prop-types';

import { Price } from '@magento/peregrine';

import { mergeClasses } from '../../classify';

import defaultClasses from './totalsSummary.css';

const TotalsSummary = props => {
    // Props.
    const { currencyCode, subtotal } = props;

    // Members.
    const classes = mergeClasses(defaultClasses, props.classes);
    const hasSubtotal = Boolean(subtotal);

    return (
        <div className={classes.root}>
            {hasSubtotal && (
                <div className={classes.totals}>
                    <span>Cart SubTotal</span>
                    <span>
                        <Price
                            currencyCode={currencyCode}
                            value={subtotal}
                        />
                    </span>
                </div>
            )}
        </div>
    );
};

TotalsSummary.propTypes = {
    classes: shape({
        root: string,
        subtotalLabel: string,
        subtotalValue: string,
        totals: string
    }),
    currencyCode: string,
    numItems: number,
    subtotal: number
};

export default TotalsSummary;
