import React from 'react';
import PropTypes from 'prop-types';
import { mergeClasses } from '../../classify';
import defaultLogo from './logo.svg';
import { useLogo } from '@magento/peregrine/lib/talons/Logo/useLogo';
import GET_STORE_CONFIG_DATA from '../../queries/getStoreConfigData.graphql';
import { resourceUrl } from '@magento/venia-drivers';
import LoadingIndicator from '../LoadingIndicator';
/**
 * A component that renders a logo in the header.
 *
 * @typedef Logo
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const Logo = props => {
    const { height } = props;
    const classes = mergeClasses({}, props.classes);

    const talonProps = useLogo({
        query: GET_STORE_CONFIG_DATA
    });
    const {
        logo_src,
        logo_alt,
        logo_height,
        logo_width
    } = talonProps;

    if(typeof logo_src === 'undefined') {
        return <LoadingIndicator />;
    }
    
    return logo_src ? (
        <img
            className={classes.logo}
            src={resourceUrl('logo/' + logo_src, {
                type: 'image-wysiwyg',
                height: height
            })}
            alt={logo_alt}
            title={logo_alt}
            height={logo_height}
            width={logo_width}
        />
    ) : <img
            className={classes.logo}
            src={defaultLogo}
            height={height}
            alt="Venia"
            title="Venia"
        />;
};

/**
 * Props for {@link Logo}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * Logo component.
 * @property {string} classes.logo classes for logo
 * @property {number} height the height of the logo.
 */
Logo.propTypes = {
    classes: PropTypes.shape({
        logo: PropTypes.string
    }),
    height: PropTypes.number
};

Logo.defaultProps = {
    height: 24
};

export default Logo;
