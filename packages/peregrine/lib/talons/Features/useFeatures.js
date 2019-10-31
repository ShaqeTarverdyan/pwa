import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';


export const useFeatures = props => {
    const { query } = props;
    const { error, data } = useQuery(query);

    useEffect(() => {
        if (error) {
            console.log('Error fetching topBar data.');
        }
    }, [error]);
    
    return {
        features: data.features
    };
};
