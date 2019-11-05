import React from 'react';
import PropTypes from 'prop-types';
import { mergeClasses } from '../../classify';
import Image from '../Image';
import defaultLogo from './logo.svg';
import { useLogo } from '@magento/peregrine/lib/talons/Logo/useLogo';
import GET_STORE_CONFIG_DATA from '../../queries/getStoreConfigData.graphql';
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
    const { height, width } = props;
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
    
    const imageSizes = new Map();
    imageSizes.set('small', logo_width || width);
    return (
        <Image
            alt="Venia"
            classes={{image: classes.logo}}
            height={height}
            src={!logo_src ? defaultLogo : null}
            resource={'logo/' + logo_src}
            resourceSizes={imageSizes}
            resourceHeight={logo_height || height || null}
            resourceWidth={logo_width ? logo_width : width}
            titlle={logo_alt}
            width={width}
            type={'image-wysiwyg'}
        />
    );
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
    height: PropTypes.number,
    width: PropTypes.number
};

Logo.defaultProps = {
    width: 48
};

export default Logo;
