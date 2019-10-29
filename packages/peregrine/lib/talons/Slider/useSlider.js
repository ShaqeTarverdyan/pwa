import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

/**
 * Returns props necessary to render a Slider component.
 *
 * @param {object} props
 * @param {object} props.query - slider data
 * @param {string} props.id - slider id
 * @return {{ sliderData: object, error: object }}
 */

export const useSlider = props => {
    const { query, id } = props;
    // const { error, data } = useQuery(query, variables);
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
        homePage_top_slides: data && data.slider && data.slider.slides,
    };
};