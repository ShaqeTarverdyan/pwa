import React from 'react';

import defaultClasses from './indicator.css';
import { mergeClasses } from '../../classify';
import Image from '../Image';

import preloader from './preloader.gif';

const LoadingIndicator = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const className = props.global ? classes.global : classes.root;

    return (
        <div className={className}>
            <img
                className={classes.indicator}
                src={preloader}
                alt='logo'
                width="64"
            />
            <span className={classes.message}>{props.children}</span>
        </div>
    );
};

export default LoadingIndicator;
