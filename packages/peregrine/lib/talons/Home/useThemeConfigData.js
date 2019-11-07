import { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

/**
 *
 * @param {*} props.query the ConfigData query form slide and banner
 */
export const useThemeConfigData = props => {
    const { query } = props;
    const { error, data } = useQuery(query);

    useEffect(() => {
        if (error) {
            console.log('Error fetching topBar data.');
        }
    }, [error]);

    const visibleBrand = useMemo(() => {
        const brandCount = data && data.storeConfig && data.storeConfig.pwa_homepage_brands_visible;
        const splited = brandCount.split(',');
        return {
            desktop: splited[0] || 6,
            mobile: splited[1] || 2
        }
    }, [data]);
    return {
        homePage_top_slider_id: data && data.storeConfig && data.storeConfig.pwa_homepage_top_slider,
        homepage_top_banner: data && data.storeConfig && data.storeConfig.pwa_homepage_top_banner,
        homepage_bottom_banner_left: data && data.storeConfig && data.storeConfig.pwa_homepage_bottom_banner_left,
        homepage_bottom_banner_right: data && data.storeConfig && data.storeConfig.pwa_homepage_bottom_banner_right,
        pwa_homepage_show_brands: data && data.storeConfig && data.storeConfig.pwa_homepage_show_brands,
        visibleBrand
    };
};
