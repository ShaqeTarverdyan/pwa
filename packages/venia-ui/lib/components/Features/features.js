import React from 'react';
import { useFeatures } from '@magento/peregrine/lib/talons/Features/useFeatures';
import GET_FEATURES from '../../queries/getFeatures.graphql';
import Feature from './feature';


const Features = () => {
    const talonProps = useFeatures({
        query: GET_FEATURES
    });
    const { features } = talonProps;
    return (
        features.map(feature =>
            <Feature feature={feature} key={feature.id} />
        )
    );
}

export default Features;