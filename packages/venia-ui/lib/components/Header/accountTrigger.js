import React from 'react';
import { func, shape, string } from 'prop-types';
import defaultClasses from './accountTrigger.css';
import { mergeClasses } from '../../classify';
import { useAccountTrigger } from '@magento/peregrine/lib/talons/Header/useAccountTrigger';

const AccountTrigger = props => {

    const classes = mergeClasses(defaultClasses, props.classes);
    const { handleOpenAccount } = useAccountTrigger();
    return (
        <button 
            type='button'
            onClick={handleOpenAccount}
        >
            <span className={classes.iconUser} />
        </button>
       
    );
}

export default AccountTrigger;

AccountTrigger.propTypes = {
    classes: shape({
        iconUser: string.isRequired
    }),
    handleOpenAccount: func
}