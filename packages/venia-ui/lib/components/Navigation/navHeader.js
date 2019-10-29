import React, { Fragment } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { X as CloseIcon } from 'react-feather';

import { mergeClasses } from '../../classify';
import Icon from '../Icon';
import Trigger from '../Trigger';
import AccountTrigger from '../Header/accountTrigger';
import defaultClasses from './navHeader.css';
import { useNavigationHeader } from '@magento/peregrine/lib/talons/Navigation/useNavigationHeader';

const NavHeader = props => {
    const { isTopLevel, onBack, onClose, view } = props;

    const talonProps = useNavigationHeader({
        isTopLevel,
        onBack,
        onClose,
        view
    });

    const { handleClose } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <Fragment>
            <div>
                <AccountTrigger />
            </div>
            <Trigger key="closeButton" action={handleClose}>
                <Icon src={CloseIcon} />
            </Trigger>
        </Fragment>
    );
};

export default NavHeader;

NavHeader.propTypes = {
    classes: shape({
        title: string
    }),
    isTopLevel: bool,
    onBack: func,
    onClose: func.isRequired,
    view: string
};
