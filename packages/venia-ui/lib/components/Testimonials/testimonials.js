import React from 'react';
import { useTestimonials } from '@magento/peregrine/lib/talons/Testimonial/useTestimonial';
import GET_TESTIMONIALS from '../../queries/getTestimonials.graphql';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import LoadingIndicator from '../LoadingIndicator';
import defaultClasses from './testimonials.css';
import { mergeClasses } from '../../classify';
import { useWindowSize } from '@magento/peregrine';
import { resourceUrl } from '@magento/venia-drivers';
import Rating from '../Rating';

const Testimonials = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;
    const slidesCount = isMobile ? 1 : 3;
    const talonProps = useTestimonials({
        query: GET_TESTIMONIALS,
    })
    const { items } = talonProps;

    return items  && typeof items != 'undefined' ? (
        <CarouselProvider
            naturalSlideWidth={480}
            naturalSlideHeight={500}
            totalSlides={items.length}
            visibleSlides={slidesCount}
            orientation="horizontal"
            dragEnabled={true}
            touchEnabled={true}
            playDirection="forward"
        >
            <Slider>
                {
                    items.map((item, index) =>
                        <Slide index={index} key={index} >
                            <div className={classes.testimonial} >
                                <div className={classes.image}>
                                    <img src={resourceUrl(item.image_path, {
                                        type: 'image-testimonial',
                                        width: 100,
                                        height: 100
                                    })} 
                                    alt={item.author} />
                                </div>
                                <div className={classes.testimonialRating}>
                                    <Rating rating={item.rating} />
                                </div>
                                <div className={classes.text}>
                                    <p >{item.testimonial_content}</p>
                                </div>
                                <div className={classes.information}>
                                    <span>
                                        {item.author}
                                    </span>
                                    <span className={classes.job}>{item.job}</span>
                                </div>
                            </div>
                        </Slide>
                    )
                }
            </Slider>
        </CarouselProvider>
    ) : <LoadingIndicator />
}

export default Testimonials;