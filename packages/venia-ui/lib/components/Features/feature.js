import React from 'react';
import defaultClasses from './feature.css';
import { mergeClasses } from '../../classify';
import { resourceUrl } from '@magento/venia-drivers';



const Feature = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { feature } = props;
    const { description, icon_path, title } = feature;
    return (
        <div className={classes.root}>
            <img src={resourceUrl(icon_path, {
                type: 'image-feature',
                width: 40,
                height: 40
            })}
                alt={title}
            />
            <div className={classes.text}>
                <span className={classes.title}>{title}</span>
                <span className={classes.description}>{description}</span>
            </div>
        </div>
    );
}

export default Feature;