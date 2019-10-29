import React, { useMemo } from 'react';
import { array, func, number, shape, string } from 'prop-types';
import { Price } from '@magento/peregrine';

import { mergeClasses } from '../../classify';
import { resourceUrl } from '@magento/venia-drivers';

import Image from '../Image';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import ProductOptions from './productOptions';

import defaultClasses from './product.css';
import { useProduct } from '@magento/peregrine/lib/talons/MiniCart/useProduct';

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
        isLoading,
        productName,
        productOptions,
        productPrice,
        productQuantity
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const productImage = useMemo(() => {
        const src = hasImage
            ? resourceUrl(image.url, {
                type: image.type,
                width: image.width,
                height: image.height
            })
            : transparentPlaceholder;

        return (
            <Image
                alt={productName}
                classes={{ root: classes.image }}
                placeholder={transparentPlaceholder}
                src={src}
                fileSrc={image.url}
                sizes={`${image.width}px`}
            />
        );
    }, [hasImage, image, productName, classes.image]);

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
