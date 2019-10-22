import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

/**
 *
 * @param {*} props.query the Logo_src data query
 */
export const useLogo = props => {
    const { query } = props;
    const { error, data } = useQuery(query);

    useEffect(() => {
        if (error) {
            console.log('Error fetching logo_src data.');
        }
    }, [error]);

    return {
        logo_src: data && data.storeConfig && data.storeConfig.header_logo_src,
        logo_alt: data && data.storeConfig && data.storeConfig.logo_alt,
        logo_height: data && data.storeConfig && data.storeConfig.logo_height,
        logo_width: data && data.storeConfig && data.storeConfig.logo_width,
    };
};