import React from 'react';
import defaultClasses from './home.css';
import { mergeClasses } from '../../classify';
import SliderComponent from '../Slider';
import getStoreConfigData from '../../queries/getStoreConfigData.graphql';
import { useThemeConfigData } from '@magento/peregrine/lib/talons/Home/useThemeConfigData';
import Banner from '../Banner';
import Features from '../Features';
import { useWindowSize } from '@magento/peregrine';
import Testimonials from '../Testimonials';
import ProductCarousel from '../ProductCarousel';
import Brands from '../Brands';

const Home = props => {
    const {
        homePage_top_slider_id,
        homepage_top_banner,
        homepage_bottom_banner_left,
        homepage_bottom_banner_right,
        pwa_homepage_show_brands,
        visibleBrand
    } = useThemeConfigData({
        query: getStoreConfigData
    });;

    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;
    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <div className={classes.slider}>
                    <SliderComponent
                        id={homePage_top_slider_id}
                        imageWidth={isMobile ? 320 : 610}
                        imageHeight={isMobile ? 410 : 778}
                    />
                </div>
                <div className={classes.banners}>
                    <div className={classes.topBanner}>
                        <Banner id={homepage_top_banner} />
                    </div>
                    <div className={classes.bottomBanner}>
                        <Banner id={homepage_bottom_banner_left} />
                        <Banner id={homepage_bottom_banner_right} />
                    </div>
                </div>
            </div>
            <div className={classes.featuresWrapper}>
                <div className={classes.features}>
                    <Features />
                </div>
            </div>
            <div className={classes.productCarousel}>
                <h1>Featured Products</h1>
                <ProductCarousel
                    id={21}
                    pageSize={6}
                    currentPage={1}
                    onServer={true}
                    idString={'21'}
                />
            </div>
            <div className={classes.productCarousel}>
                <h1>New Products</h1>
                <ProductCarousel
                    id={6}
                    pageSize={6}
                    currentPage={1}
                    onServer={true}
                    idString={'6'}
                />
            </div>
            <div className={classes.brands}>
                <h1>Product Brands</h1>
                {pwa_homepage_show_brands && <Brands visibleBrands={isMobile ? visibleBrand.mobile : visibleBrand.desktop}/>}
            </div>
            <div className={classes.testimonials}>
                <h1>Testimonials</h1>
                <Testimonials/>
            </div>
        </div>
    )
}

export default Home;