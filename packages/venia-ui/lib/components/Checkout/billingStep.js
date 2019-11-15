import React from 'react';
import defaultClasses from './billingStep.css';
import { mergeClasses } from '../../classify';


const BillingStep = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return(
        <div className={classes.root}>
            BillingStep
        </div>
    );
}

export default  BillingStep;