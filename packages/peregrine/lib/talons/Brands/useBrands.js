import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

export const useBrands = props => {
    const { query } = props;
    const { error, data } = useQuery(query);

    useEffect(() => {
        if (error) {
            console.log('Error fetching topBar data.');
        }
    }, [error]);

    return {
        brands: data && data.brands
    };
};
