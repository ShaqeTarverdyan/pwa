import React from 'react';
import getBrands from '../../queries/getBrands.graphql';
import LoadingIndicator from '../LoadingIndicator/';
import defaultClasses from './brands.css';
import { mergeClasses } from '../../classify';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useWindowSize } from '@magento/peregrine';
import { resourceUrl } from '@magento/venia-drivers';
import { useBrands } from '@magento/peregrine/lib/talons/Brands/useBrands';


const Brands = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { visibleBrands } = props;
    const { brands } = useBrands({
        query: getBrands
    });
    
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 993;
    const natureHeight = isMobile ? 460 : 230

    return brands && typeof brands != 'undefined' ? (
        <div className={classes.root}>
            <div className={classes.content}>
                <CarouselProvider
                    naturalSlideWidth={200}
                    naturalSlideHeight={natureHeight}
                    totalSlides={6}
                    visibleSlides={visibleBrands}
                    orientation="horizontal"
                    dragEnabled={true}
                    touchEnabled={true}
                    playDirection="forward"
                >
                    <Slider>
                        {
                            brands.map((brand, index) =>
                                <Slide index={index} key={index} >
                                    <div key={brand.id} className={classes.brand}>
                                        <img src={resourceUrl(brand.logo_path, {
                                            type: 'image-brand',
                                            width: 100,
                                            height: 100
                                        })}
                                            alt='brands'
                                        />
                                    </div>
                                </Slide>
                            )
                        }
                    </Slider>
                </CarouselProvider>
            </div>
        </div>
    ): <LoadingIndicator/>
}

export default Brands;