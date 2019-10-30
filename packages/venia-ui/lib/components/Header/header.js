import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import Logo from '../Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';

import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';
import AccountTrigger from './accountTrigger';
import TopBar from './topBar';
import OnlineIndicator from './onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import MiniCart from '../MiniCart';
import { useWindowSize } from '@magento/peregrine';
import NavigationDesktop from '../Navigation';

import { mergeClasses } from '../../classify';
import defaultClasses from './header.css';

const SearchBar = React.lazy(() => import('../SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        searchOpen,
    } = useHeader();

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = searchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );

    const searchBar = searchOpen || !isMobile ? (
        <Suspense fallback={searchBarFallback}>
            <Route
                render={({ history, location }) => (
                    <SearchBar
                        isOpen={searchOpen || !isMobile}
                        history={history}
                        location={location}
                    />
                )}
            />
        </Suspense>
    ) : null;

    return (
        <header className={rootClass}>
            <div className={classes.topBar}>
                <TopBar />
            </div>
            <div className={classes.mainHeader}>
                <div className={classes.logo}>
                    <Link to={resourceUrl('/')}>
                        <Logo />
                    </Link>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                </div>
                <div className={classes.navTrigger}>
                    <NavTrigger />
                </div>
                <div className={classes.actions}>
                    <div className={classes.searchbardesktop}>
                        {!isMobile && searchBar}
                    </div>
                    <div className={classes.searchBarMobile}>
                        <SearchTrigger
                            active={searchOpen}
                            onClick={handleSearchTriggerClick}
                        />
                    </div>
                    <div className={classes.accountTrigger}>
                        <AccountTrigger />
                    </div>
                    <div className={classes.cart}>
                        <div className={classes.cartTrigger}>
                            <CartTrigger />
                        </div>
                        <div className={classes.miniCartDesktop}>
                            <MiniCart/>
                        </div>

                    </div>
                </div>
            </div>
            {isMobile && searchBar}
            <div className={classes.navigationDesktop}>
                <NavigationDesktop/>
            </div>
        </header>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        searchFallback: string,
        topBar: string,
        mainHeader: string,
        navTrigger: string,
        actions: string,
        searchbardesktop: string,
        searchBarMobile: string,
        accountTrigger: string,
        cart: string,
        cartTrigger: string,
        miniCartDesktop: string,
        navigationDesktop: string
    })
};

export default Header;
