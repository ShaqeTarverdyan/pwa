import React from 'react';
import { shape, string } from 'prop-types';
import { useFeatures } from '@magento/peregrine/lib/talons/Features/useFeatures';
import GET_FEATURES from '../../queries/getFeatures.graphql';
import defaultClasses from './features.css';
import { mergeClasses } from '../../classify';
import { resourceUrl } from '@magento/venia-drivers';

const Features = props => {

    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useFeatures({
        query: GET_FEATURES
    });
    const { features } = talonProps;

    return features && typeof features != 'undefined' ? (
        features.map(feature =>
            <div className={classes.root}>
                <img src={resourceUrl(feature.icon_path, {
                    type: 'image-feature',
                    width: 40,
                    height: 40
                })}
                    alt={feature.title}
                />
                <div className={classes.text}>
                    <span className={classes.title}>{feature.title}</span>
                    <span className={classes.description}>{feature.description}</span>
                </div>
            </div>
        )
    ): null
}
Features.propTypes = {
    classes: shape({
        root: string,
        text: string,
        title: string,
        description: string
    }),
};

export default Features;