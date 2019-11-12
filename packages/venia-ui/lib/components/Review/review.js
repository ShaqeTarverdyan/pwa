import React from 'react';
import defaultClasses from './review.css';
import { mergeClasses } from '../../classify';
import Rating from '../Rating';
import ReviewForm from './reviewForm';
import ProductCarousel from '../ProductCarousel';

const Review = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { reviews, available_ratings, productId} = props;

    return (
        <div className={classes.root}>
            <ul className={classes.reviews}>
                {
                    reviews.map((review, index) =>
                        <li key={index} className={classes.content}>
                            {
                                review.ratings.map((rating, index) =>
                                    <Rating key={index} rating={rating.percent} />
                                )
                            }
                            <h3>{`${review.nickname} / ${review.created_at}`}</h3>
                            <p>{review.detail}</p>
                        </li>
                    )
                }
            </ul>
            <div className={classes.reviewForm}>
                <h1 className={classes.title}>Add a review</h1>
                <ReviewForm available_ratings={available_ratings} productId={productId}/>
                <div className={classes.productCarousel}>
                    <h1 className={classes.title}>RELATED PRODUCTS</h1>
                    <ProductCarousel
                        id={21}
                        pageSize={6}
                        currentPage={1}
                        onServer={true}
                        idString={'21'}
                    />
                </div>
            </div>

        </div>

    );
}
 
export default Review;