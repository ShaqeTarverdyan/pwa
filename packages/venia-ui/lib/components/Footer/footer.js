import React from 'react';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import { mergeClasses } from '../../classify';
import defaultClasses from './footer.css';
import GET_STORE_CONFIG_DATA from '../../queries/getStoreConfigData.graphql';
import CmsBlock from '../CmsBlock';
import Logo from '../Logo';

const Footer = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const talonProps = useFooter({
        query: GET_STORE_CONFIG_DATA
    });
    const {
        aboutUsText,
        leftBlock,
        rightBlock,
        middleBlock,
        facebookUrl,
        linkedlinUrl,
        instagramUrl,
    } = talonProps;
    return (
        <footer className={classes.root}>
            <div className={classes.context}>
                <div className={classes.tile}>
                    <Logo classes={classes}/>
                    <p className={classes.aboutUs}> {aboutUsText}</p>
                </div>
                <div className={classes.tile}>
                    <CmsBlock identifiers={leftBlock} />
                </div>
                <div className={classes.tile}>
                    <CmsBlock identifiers={middleBlock} />
                </div>
                <div className={`${classes.tile} ${classes.contact}`}>
                    <CmsBlock identifiers={rightBlock} />
                    <ul className={classes.social}>
                        {instagramUrl && <li><a className={classes.instagram} href={instagramUrl}></a></li>}
                        {facebookUrl && <li><a className={classes.facebook} href={facebookUrl}></a></li>}
                        {linkedlinUrl && <li><a className={classes.twitter} href={linkedlinUrl}></a></li>}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    classes: shape({
        copyright: string,
        root: string,
        tile: string,
        tileBody: string,
        tileTitle: string
    })
};

export default Footer;
