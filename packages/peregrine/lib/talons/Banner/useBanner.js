import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

export const useBanner = props => {
    const { query, id  } = props;
    const [runQuery, queryResponse] = useLazyQuery(query);
    const { error, data } = queryResponse;

    // Run the query immediately and every time id changes.
    useEffect(() => {
        runQuery({ variables: { id } });
    }, [id, runQuery]);

    useEffect(() => {
        if (error) {
            console.log('Error fetching topBar data.');
        }
    }, [error]);
    return {
        banner: data && data.banner
    };
};