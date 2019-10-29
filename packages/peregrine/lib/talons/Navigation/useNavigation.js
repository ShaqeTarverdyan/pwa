import { useCallback, useState } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCatalogContext } from '@magento/peregrine/lib/context/catalog';


export const useNavigation = () => {
    // retrieve app state from context
    const [appState, { closeDrawer }] = useAppContext();
    const [catalogState, { actions: catalogActions }] = useCatalogContext();

    // extract relevant data from app state
    const { drawer } = appState;
    const isOpen = drawer === 'nav';
    const { categories, rootCategoryId } = catalogState;

    // get local state
    const [categoryId, setCategoryId] = useState(rootCategoryId);

    const handleClose = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    return {
        catalogActions,
        categories,
        categoryId,
        handleClose,
        isOpen,
        setCategoryId,
    };
};
