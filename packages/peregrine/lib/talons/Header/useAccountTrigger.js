import { useCallback } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';

export const useAccountTrigger = () => {
    const [, { toggleDrawer }] = useAppContext();

    const handleOpenAccount = useCallback(() => {
        toggleDrawer('account');
        
    },[toggleDrawer]);

    return {
        handleOpenAccount
    }
}