import React, { useCallback } from 'react';
import defaultClasses from './tab.css';
import { mergeClasses } from '../../classify';
import AdditionalInfo from './productAdditionalInfo';
import Review from '../Review';
import RichContent from '../RichContent';
import { useWindowSize } from '@magento/peregrine';


const Tab = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        active,
        setActive,
        attributes,
        reviews,
        available_ratings,
        productId,
        description
    } = props;
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;

    const changeActive = useCallback((e) => {
        setActive(e.target.getAttribute('data-active'));
        const currentAttribute = e.target.attributes[0].value
        if (active === currentAttribute && isMobile) {
            setActive('');
        }
    }, [setActive, active, isMobile]);


    return (
        <>
            <div className={classes.header}>
                <section >
                    <button
                        onClick={changeActive}
                        data-active='description'
                        className={active == 'description' ? classes.activeClass : classes.commonClass}>
                        Description
                    </button>
                    {isMobile && active === 'description' && <RichContent html={description} />}
                </section>
                <section >
                    <button
                        onClick={changeActive}
                        data-active='additionalInformation'
                        className={active == 'additionalInformation' ? classes.activeClass : classes.commonClass}>
                        Additional Informatiion
                    </button>
                    <div>
                        {isMobile && active === 'additionalInformation' && <AdditionalInfo attributes={attributes} />}
                    </div>
                </section>
                <section >
                    <button
                        onClick={changeActive}
                        data-active='reviews'
                        className={active == 'reviews' ? classes.activeClass : classes.commonClass}>
                        Reviews
                    </button>
                    <div>
                        {isMobile && active === 'reviews' && <Review reviews={reviews} available_ratings={available_ratings} productId={productId} />}
                    </div>

                </section>
            </div>
            <div className={classes.content}>
                {active == 'description' && <RichContent html={description} />}
                {active == 'additionalInformation' && <AdditionalInfo attributes={attributes} />}
                {active == 'reviews' && <Review reviews={reviews} available_ratings={available_ratings} productId={productId}/>}
            </div>
        </>

    );
}

export default Tab;