import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

/**
 *
 * @param {*} props.query the topBar data query
 */
export const useTopBar = props => {
    const { query } = props;
    const { error, data } = useQuery(query);

    useEffect(() => {
        if (error) {
            console.log('Error fetching topBar data.');
        }
    }, [error]);

    return {
        telephone: data && data.storeConfig && data.storeConfig.pwa_header_telephone,
        promotion: data && data.storeConfig && data.storeConfig.pwa_header_promotion
    };
};
