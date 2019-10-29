import React from 'react';
import defaultClasses from './home.css';
import { mergeClasses } from '../../classify';
import SliderComponent from '../Slider';
import  getStoreConfigData from '../../queries/getStoreConfigData.graphql';
import { useThemeConfigData } from '@magento/peregrine/lib/talons/Slider/useThemeConfigData';
import Banner from '../Banner';

const Home = props => {
    const sliderIdProps = useThemeConfigData({
        query: getStoreConfigData
    });
    const {
        homePage_top_slider_id,
        homepage_top_banner,
        homepage_bottom_banner_left,
        homepage_bottom_banner_right
    } = sliderIdProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <div className={classes.slider}>
                    <SliderComponent
                        id={homePage_top_slider_id}
                        imageWidth={610}
                        imageHeight={778}
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
        </div>
    )
}

export default Home;