import React from 'react';
import defaultClasses from './footer.css';
import { mergeClasses } from '../../classify';
import { Link } from '@magento/venia-drivers';

const Footer = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <Link to='/'>
            <span>{`< Continue Shoping`}</span>
            </Link>
        </div>
    );
}

export default Footer;