import React from 'react';
import defaultClasses from './features.css';
import { mergeClasses } from '../../classify';
import getFeature from '../../queries/getFeatures.graphql';


const Features = props => {
    const classes = mergeClasses(defaultClasses, props.classes)
    return (
        <div className={classes.root}>features</div>
    );
}

export default Features;