import React, { Suspense } from 'react';
import { arrayOf, bool, number, shape, string, func } from 'prop-types';
import { Price } from '@magento/peregrine';
import defaultClasses from './productFullDetail.css';
import { mergeClasses } from '../../classify';
import Rating from '../Rating';
import Features from '../Features';

import Button from '../Button';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import Carousel from '../ProductImageCarousel';
import Quantity from '../ProductQuantity';
import RichText from '../RichText';
import Tab from './tab';

import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

const Options = React.lazy(() => import('../ProductOptions'));

const ProductFullDetail = props => {
    const { product } = props;

    const talonProps = useProductFullDetail({
        product
    });

    const {
        handleAddToCart,
        handleSelectionChange,
        isAddToCartDisabled,
        mediaGalleryEntries,
        productDetails,
        quantity,
        handleDecrement,
        handleIncrement,
        active,
        setActive,
        setIsOpen,
        isOpen,
        scrollReview,
        tabRef
    } = talonProps;

    const {
        name,
        description,
        shortDescription,
        price,
        sku,
        configurable_options,
        reviews_count,
        rating_summary,
        attributes,
        available_ratings,
        reviews,
        id
    } = productDetails;
    const classes = mergeClasses(defaultClasses, props.classes);

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={configurable_options}
            />
        </Suspense>
    ) : null;
    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <section>
                    <Carousel images={mediaGalleryEntries} />
                </section>
                <section className={classes.middle}>
                    <h1 className={classes.name}>{name}</h1>
                    <div className={classes.rating}>
                        {rating_summary && <Rating rating={rating_summary} />}
                        {reviews_count && <p className={classes.reviewCount}> | {reviews_count} Revies | </p>}
                        <button onClick={scrollReview}>Add Your Review</button>
                    </div>
                    <p className={classes.sku}>{`SKU: ${sku}`}</p>
                    <div className={classes.price}>
                        <Price
                            currencyCode={price.currency}
                            value={price.value}
                        />
                    </div>
                    <div className={classes.shortDescription}>
                        {shortDescription && <RichText content={shortDescription} /> || <p>no description</p>}
                    </div>
                    <div className={classes.options}>{options}</div>
                    <div className={classes.buttonGroup}>
                        <Quantity
                            productQuantity={quantity}
                            handleDecrement={handleDecrement}
                            handleIncrement={handleIncrement}
                        />
                        <Button
                            priority="high"
                            onClick={handleAddToCart}
                            disabled={isAddToCartDisabled}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </section>
                <section className={classes.rightSide}>
                    <div className={classes.features}>
                        <Features classes={{ root: classes.featureRoot, description: classes.featureDescription }} />
                    </div>
                </section>
            </div>
            <section ref={tabRef}>
                <Tab
                    active={active}
                    setActive={setActive}
                    description={description}
                    attributes={attributes}
                    reviews={reviews}
                    available_ratings={available_ratings}
                    productId={id}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                />
            </section>

        </div>


    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        root: string,
        title: string
    }),
    productDetails: shape({
        name: string,
        description: string,
        shortDescription: string,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        sku: string.isRequired,
        configurable_options: arrayOf(
            shape({
                attribute_code: string,
                attribute_id: string,
                id: number,
                label: string,
                values: arrayOf(
                    shape({
                        default_label: string,
                        label: string,
                        store_label: string,
                        swatch_data: shape({
                            type: string,
                            value: string,
                            __typename: string
                        }) 
                    })
                ),
                use_default_value: bool,
                value_index: number,
                __typename: string
            })
        ),
        reviews_count: string,
        rating_summary: string,
        attributes: arrayOf({
            attribute_code: string,
            attribute_label: string,
            attribute_value: string,
            __typename: string
        }),
        available_ratings: arrayOf(
            shape({
                __typename: string,
                rating_id: number,
                rating_code: string,
                options: arrayOf(
                    shape({
                        code: string,
                        option_id: string,
                        value: number,
                        __typename: string
                    })
                )
            })
        ),
        reviews: arrayOf(
            shape({
                created_at: string,
                detail: string,
                nickname: string,
                ratings: arrayOf(
                    shape({
                        percent: number,
                        rating_code: string,
                        value: number,
                        __typename: string
                    })
                ),
                review_id: number,
                title: string,
                __typename: string
            })
        ),
        id: number
    }),
    active: string,
    handleAddToCart: func,
    handleDecrement: func,
    handleIncrement: func,
    handleSelectionChange: func,
    isAddToCartDisabled: bool,
    isOpen: bool,
    scrollReview: func,
    media_gallery_entries: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired
        })
    ),
    quantity: number,
    setActive: func,
    setIsOpen: func


};
export default ProductFullDetail;
