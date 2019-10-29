import React from 'react';
import { shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import CategoryTree from '../CategoryTree';
import NavHeader from './navHeader';
import defaultClasses from './navigation.css';
import { useNavigation } from '@magento/peregrine/lib/talons/Navigation/useNavigation';
import { useWindowSize } from '@magento/peregrine';

const Navigation = props => {
    const {
        catalogActions,
        categories,
        categoryId,
        handleBack,
        handleClose,
        hasModal,
        isOpen,
        isTopLevel,
        setCategoryId,
        view
    } = useNavigation();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isMobile && (isOpen ? classes.root_open_mobile : classes.root_mobile);
    const bodyClassName = isMobile && (hasModal ? classes.body_masked : classes.body);

    return (
        <aside className={rootClassName}>
            <header className={classes.header}>
                <NavHeader
                    isTopLevel={isTopLevel}
                    onBack={handleBack}
                    onClose={handleClose}
                    view={view}
                />
            </header>
            <div className={bodyClassName}>
                <CategoryTree
                    categoryId={categoryId}
                    categories={categories}
                    onNavigate={handleClose}
                    setCategoryId={setCategoryId}
                    updateCategories={catalogActions.updateCategories}
                    classes={defaultClasses}
                />
            </div>
        </aside>
    );
};

export default Navigation;

Navigation.propTypes = {
    classes: shape({
        body: string,
        header: string,
        root: string,
        root_open: string,
    })
};
