import React, { useMemo } from 'react';
import { array, func, number, shape, string } from 'prop-types';
import { Price } from '@magento/peregrine';

import { mergeClasses } from '../../classify';

import Image from '../Image';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import ProductOptions from './productOptions';

import defaultClasses from './product.css';
import { useProduct } from '@magento/peregrine/lib/talons/MiniCart/useProduct';

const PRODUCT_IMAGE_RESOURCE_WIDTH = 80;
const PRODUCT_IMAGE_SIZES = new Map();
PRODUCT_IMAGE_SIZES.set('small', PRODUCT_IMAGE_RESOURCE_WIDTH);

const Product = props => {
    const { beginEditItem, currencyCode, item, removeItemFromCart } = props;

    const talonProps = useProduct({
        beginEditItem,
        item,
        removeItemFromCart
    });

    const {
        handleRemoveItem,
        hasImage,
        image,
        isFavorite,
        isLoading,
        productName,
        productOptions,
        productPrice,
        productQuantity
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const { image } = item;

    const productImage = useMemo(() => {
        const imageProps = {
            alt: productName,
            classes: { image: classes.image, root: classes.imageContainer }
        };

        if (!hasImage) {
            imageProps.src = transparentPlaceholder;
        } else {
            imageProps.resource = image.file;
            imageProps.resourceWidth = PRODUCT_IMAGE_RESOURCE_WIDTH;
            imageProps.resourceSizes = PRODUCT_IMAGE_SIZES;
        }

        return <Image {...imageProps} />;
    }, [
        classes.image,
        classes.imageContainer,
        hasImage,
        image.file,
        productName
    ]);

    return (
        <li className={classes.root}>
            <div className={classes.productImage}>
                {productImage}
            </div>
            <div className={classes.name}>
                <div >{productName}</div>
                <ProductOptions options={productOptions} />
            </div>
            <div className={classes.quantity}>
                <span>x{productQuantity}</span>
            </div>
            <div className={classes.price}>
                <Price
                    currencyCode={currencyCode}
                    value={productPrice}
                />
            </div>
            <div className={classes.removeItem}>
                <button onClick={handleRemoveItem}> x </button>
            </div>
        </li >
    );
};

Product.propTypes = {
    currencyCode: string,
    item: shape({
        image: shape({
            file: string
        }),
        name: string,
        options: array,
        price: number,
        qty: number
    }).isRequired,
    removeItemFromCart: func.isRequired
};

export default Product;
