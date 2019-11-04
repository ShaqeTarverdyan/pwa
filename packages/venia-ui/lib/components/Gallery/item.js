import React, { Component, Suspense } from 'react';
import { string, number, shape } from 'prop-types';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { Price } from '@magento/peregrine';

import classify from '../../classify';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { generateSrcset } from '../../util/images';
import defaultClasses from './item.css';
import Rating from '../Rating';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
const Options = React.lazy(() => import('../ProductOptions'));
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import Button from '../Button';

const imageWidth = '280';
const imageHeight = '371';

const INITIAL_OPTION_CODES = new Map();
const INITIAL_OPTION_SELECTIONS = new Map();

const ItemPlaceholder = ({ children, classes }) => (
    <div className={classes.root_pending}>
        <div className={classes.images_pending}>{children}</div>
        <div className={classes.name_pending} />
        <div className={classes.price_pending} />
    </div>
);

// TODO: get productUrlSuffix from graphql when it is ready
const productUrlSuffix = '.html';

class GalleryItem extends Component {
    static propTypes = {
        classes: shape({
            image: string,
            image_pending: string,
            imagePlaceholder: string,
            imagePlaceholder_pending: string,
            images: string,
            images_pending: string,
            name: string,
            name_pending: string,
            price: string,
            price_pending: string,
            root: string,
            root_pending: string
        }),
        item: shape({
            id: number.isRequired,
            name: string.isRequired,
            small_image: string.isRequired,
            url_key: string.isRequired,
            price: shape({
                regularPrice: shape({
                    amount: shape({
                        value: number.isRequired,
                        currency: string.isRequired
                    }).isRequired
                }).isRequired
            }).isRequired
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            isAddingToCart: false,
            isAddedToCart: false,
            optionSelections: INITIAL_OPTION_SELECTIONS,
            optionCodes: null
        }
    }


    render() {
        const { classes, item } = this.props;
        const {
            name,
            price,
            url_key,
            rating_summary,
        } = item;
        const productLink = `/${url_key}${productUrlSuffix}`;
        const handleSelectionChange = (optionId, selection) => {
            const newOptionSelections = new Map([...this.state.optionSelections]);
            newOptionSelections.set(optionId, Array.from(selection).pop());
            this.setState({ optionSelections: newOptionSelections });
        };
        const options = isProductConfigurable(item) ? (
            <Suspense fallback={fullPageLoadingIndicator}>
                <Options
                    onSelectionChange={handleSelectionChange}
                    options={item.configurable_options}
                />
            </Suspense>
        ) : null;

        if (!item) {
            return (
                <ItemPlaceholder classes={classes}>
                    {this.renderImagePlaceholder()}
                </ItemPlaceholder>
            );
        }

        return (
            <div className={classes.root}>
                <Link to={resourceUrl(productLink)} className={classes.images}>
                    {this.renderImagePlaceholder()}
                    {this.renderImage()}
                </Link>
                <Button
                    priority="normal"
                    type="button"
                    classes={{
                        root_normalPriority: classes.addToCart
                    }}
                >
                    Add to Cart
                    </Button>
                <div className={classes.rating}>
                    <Rating rating={rating_summary} />
                </div>
                <Link to={resourceUrl(productLink)} className={classes.name}>
                    <span>{name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={price.regularPrice.amount.value}
                        currencyCode={price.regularPrice.amount.currency}
                    />
                </div>
                <div className={classes.options}>
                    {options}
                </div>
            </div>
        );
    }

    renderImagePlaceholder = () => {
        const { classes, item } = this.props;

        const className = item
            ? classes.imagePlaceholder
            : classes.imagePlaceholder_pending;

        return (
            <img
                className={className}
                src={transparentPlaceholder}
                alt=""
                width={imageWidth}
                height={imageHeight}
            />
        );
    };

    renderImage = () => {
        const { classes, item } = this.props;

        if (!item) {
            return null;
        }

        const { small_image, name } = item;

        return (
            <img
                className={classes.image}
                src={resourceUrl(small_image, {
                    type: 'image-product',
                    width: imageWidth,
                    height: imageHeight
                })}
                alt={name}
                width={imageWidth}
                height={imageHeight}
                loading="lazy"
                sizes={`${imageWidth}px`}
                srcSet={generateSrcset(small_image, 'image-product')}
            />
        );
    };
}

export default classify(defaultClasses)(GalleryItem);
