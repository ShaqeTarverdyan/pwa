import React from 'react';
import { useTopBar } from '@magento/peregrine/lib/talons/Header/useTopBar';
import { shape, string } from 'prop-types';
import GET_STORE_CONFIG_DATA from '../../queries/getStoreConfigData.graphql';

import defaultClasses from './topBar.css';
import { mergeClasses } from '../../classify';

const TopBar = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    
    const talonProps = useTopBar({
        query: GET_STORE_CONFIG_DATA
    });
    const { telephone, promotion } = talonProps;

    return (
        <div className={classes.root}>
            <span>{telephone}</span>
            <span className={classes.promotion}>{promotion}</span>
        </div>
    );
}

TopBar.propTypes = {
    classes: shape({
        root: string,
        promotion: string,
    })
};

export default TopBar;

