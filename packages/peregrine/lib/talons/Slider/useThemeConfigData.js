import { useEffect } from 'react';
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

    return {
        homePage_top_slider_id: data && data.storeConfig && data.storeConfig.pwa_homepage_top_slider,
        homepage_top_banner: data && data.storeConfig && data.storeConfig.pwa_homepage_top_banner,
        homepage_bottom_banner_left: data && data.storeConfig && data.storeConfig.pwa_homepage_bottom_banner_left,
        homepage_bottom_banner_right: data && data.storeConfig && data.storeConfig.pwa_homepage_bottom_banner_right,
    };
};
