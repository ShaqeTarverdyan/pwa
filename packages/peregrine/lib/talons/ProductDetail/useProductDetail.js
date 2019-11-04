import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

export const useProductDetail = props => {
    const { query, id, pageSize, currentPage,onServer, idString } = props;
    const [runQuery, queryResponse] = useLazyQuery(query);
    const { error, data } = queryResponse;

    useEffect(() => {
        runQuery({ variables: { id, pageSize, currentPage, onServer, idString } });
    }, [id, pageSize, currentPage, runQuery, onServer, idString]);

    useEffect(() => {
        if (error) {
            console.log('Error fetching topBar data.');
        }
    }, [error]);

    return {
        items: data && data.products && data.products.items
    };
};
