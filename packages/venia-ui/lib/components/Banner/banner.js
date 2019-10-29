import React, { useMemo } from 'react';
import defaultClasses from './banner.css';
import { mergeClasses } from '../../classify';
import getBannerQuery from '../../queries/getBanner.graphql';
import { useBanner } from '@magento/peregrine/lib/talons/Banner/useBanner';
import RichContent from '../../components/RichContent';
import { resourceUrl } from '@magento/venia-drivers';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import LoadingIndicator from '../LoadingIndicator';

const Banner = props => {
    const { id } = props;
    const talonProps = useBanner({
        query: getBannerQuery,
        id
    });

    const { banner } = talonProps;
    const classes = mergeClasses(defaultClasses, props.classes);
    const placeholderImage = useMemo(() => {
        return (
            <img 
                src={transparentPlaceholder}
                alt=""
            />
        )
    },[])
    return typeof banner != 'undefined' ? (
        <div className={classes[banner.hover_effect]}>
            <div style={{position:'relative'}}>
                <img
                    src={banner.image_path}
                    alt={banner.title}
                    className={`${classes[`banner${id}`]}`}
                //     srcSet={`
                //     ${resourceUrl(banner.image_path, {
                //         type: 'image-banner',
                //         width: 700,
                //         height: 420
                //     })} 700w,
                // `}
                sizes="(min-width: 700px) 610px,1240px"
                />
                <span className={`${classes[banner.content_position]} ${classes.content}`}>
                    <RichContent html={banner.content} />
                </span>
                { !banner && placeholderImage}
            </div>
        </div>
    ) : <LoadingIndicator />
}

export default Banner;