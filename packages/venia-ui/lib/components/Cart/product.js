import React, { useMemo } from 'react';
import { array, func, number, shape, string } from 'prop-types';
import { Price } from '@magento/peregrine';

import { mergeClasses } from '../../classify';

import Image from '../Image';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import ProductOptions from './productOptions';

import defaultClasses from './product.css';
import { useProduct } from '@magento/peregrine/lib/talons/Cart/useProduct';
import Quantity from '../ProductQuantity';

const PRODUCT_IMAGE_RESOURCE_WIDTH = 80;
const PRODUCT_IMAGE_SIZES = new Map();
PRODUCT_IMAGE_SIZES.set('small', PRODUCT_IMAGE_RESOURCE_WIDTH);

const Product = props => {
    const { beginEditItem, currencyCode, item, removeItemFromCart, updateItemInCart } = props;
    const { image, } = item;
    const talonProps = useProduct({
        beginEditItem,
        item,
        removeItemFromCart,
        updateItemInCart
    });

    const {
        handleRemoveItem,
        hasImage,
        productName,
        productOptions,
        productPrice,
        productQuantity,
        subTotal,
        handleDecrement,
        handleIncrement
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

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
        <tr className={classes.root}>
            <td className={classes.productImage}>
                {productImage}
            </td>
            <td className={classes.name}>
                <div >{productName}</div>
                <ProductOptions options={productOptions} />
            </td>
            <td className={classes.price}>
                <Price
                    currencyCode={currencyCode}
                    value={productPrice}
                />
            </td>
            <td className={classes.quantity}>
                <Quantity  
                    productQuantity={productQuantity}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                />
            </td>
            <td className={classes.subTotal}>
                <Price currencyCode={currencyCode} value={subTotal} />
            </td>
            <td className={classes.removeItem}>
                <button onClick={handleRemoveItem}> x </button>
            </td>
        </tr >
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
