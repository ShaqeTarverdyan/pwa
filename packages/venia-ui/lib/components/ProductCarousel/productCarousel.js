import React from 'react';
import defaultClasses from './productCarousel.css';
import { mergeClasses } from '../../classify';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import LoadingIndicator from '../LoadingIndicator';
import { useProductDetail } from '@magento/peregrine/lib/talons/ProductDetail/useProductDetail';
import GET_PRODUCTS from '../../queries/getProducts.graphql';
import GalleryItem from '../Gallery/item';
import { useWindowSize } from '@magento/peregrine';


const ProductCarousel = props => {
    const { id, pageSize, currentPage, onServer, idString } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;
    const slidesCount = isMobile ? 2 : 4;

    const talonProps = useProductDetail({
        query: GET_PRODUCTS,
        id,
        pageSize,
        currentPage,
        onServer,
        idString
    })
    const { items } = talonProps;
    const mapGalleryItem = (item) => {
        const { small_image } = item;
        return {
            ...item,
            small_image:
                typeof small_image === 'object' ? small_image.url : small_image
        };
    }
    return  items && typeof items != 'undefined' ? (
        <CarouselProvider
            naturalSlideWidth={295}
            naturalSlideHeight={800}
            totalSlides={items.length}
            visibleSlides={slidesCount}
            orientation="horizontal"
            dragEnabled={true}
            touchEnabled={true}
            playDirection="forward"
        >
            <Slider >
                {
                    items.map((product, index) =>
                        <Slide index={index} key={index} className={classes.imageWrapper}>
                            <GalleryItem
                                item={mapGalleryItem(product)}
                            // addItemToCart={addItemToCart}
                            />
                        </Slide>
                    )
                }
            </Slider>
        </CarouselProvider>
    ): <LoadingIndicator/>
}

export default ProductCarousel;