import React, { useCallback } from 'react';
import SliderQuery from '../../queries/getSlider.graphql';
import { useSlider } from '@magento/peregrine/lib/talons/Slider/useSlider';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import LoadingIndicator from '../LoadingIndicator';
import defaultClasses from './slider.css';
import { mergeClasses } from '../../classify';
import RichContent from '../../components/RichContent';
import { resourceUrl } from '@magento/venia-drivers';
import { number } from 'prop-types';

const SliderComponent = props => {
    const { id, imageWidth, imageHeight } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const talonProps = useSlider({
        query: SliderQuery,
        id
    })
    const { homePage_top_slides } = talonProps;

    const getImageUrl = useCallback((path, width, height) => {
        return path ? resourceUrl(path, {
            type: 'image-banner',
            width: width ? width : imageWidth,
            height: height ? height : imageHeight,
        }) : '';
    }, []);


    return typeof homePage_top_slides != 'undefined' ? (
        <div className={classes.root}>
            <CarouselProvider
                naturalSlideWidth={imageWidth}
                naturalSlideHeight={imageHeight}
                totalSlides={homePage_top_slides.length}
                visibleSlides={1}
                orientation="horizontal"
            >
                <Slider className={classes.slider}>
                    {
                        homePage_top_slides.map((slide, index, ) =>
                            <Slide
                                index={index}
                                key={index}
                                classNameHidden={classes.notVisible}
                                classNameVisible={classes.visible}
                            >
                                <img
                                    src={getImageUrl(slide.image_path)}
                                    srcSet={getImageUrl(slide.image_path, imageWidth * 2, imageHeight * 2) + ' 2x'}
                                    alt='name'

                                />
                                <span className={`${classes.content} ${classes[slide.content_position]}`}>
                                    <RichContent html={slide.content} />
                                </span>
                            </Slide>
                        )
                    }
                </Slider>
                <div className={classes.buttonGroup}>
                    <ButtonBack className={classes.leftIcon} />
                    <ButtonNext className={classes.rigthIcon} />
                </div>
            </CarouselProvider>
        </div>

    ) : <LoadingIndicator />
}
SliderComponent.protoTypes = {
    id: number, 
    imageWidth: number, 
    imageHeight: number
}
export default SliderComponent;