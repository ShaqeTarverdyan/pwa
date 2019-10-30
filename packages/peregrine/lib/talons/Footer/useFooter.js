import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

/**
 *
 * @param {*} props.query the footer data query
 */
export const useFooter = props => {
    const { query } = props;
    const { error, data } = useQuery(query);

    useEffect(() => {
        if (error) {
            console.log('Error fetching copyright data.');
        }
    }, [error]);

    return {
        copyrightText: data && data.storeConfig && data.storeConfig.copyright,
        aboutUsText: data && data.storeConfig && data.storeConfig.pwa_footer_about_us_text,
        leftBlock: data && data.storeConfig && data.storeConfig.pwa_footer_left_column_block,
        rightBlock: data && data.storeConfig && data.storeConfig.pwa_footer_right_column_block,
        middleBlock: data && data.storeConfig && data.storeConfig.pwa_footer_middle_column_block,
        facebookUrl: data && data.storeConfig && data.storeConfig.pwa_social_facebook_page_url,
        linkedlinUrl: data && data.storeConfig && data.storeConfig.pwa_social_linkedin_page_url,
        instagramUrl: data && data.storeConfig && data.storeConfig.pwa_social_instagram_page_url
    };
};
