import React, { useState } from 'react';
import { func, number, shape, string } from 'prop-types';
import { useCategoryBranch } from '@magento/peregrine/lib/talons/CategoryTree';

import { mergeClasses } from '../../classify';
import defaultClasses from './categoryBranch.css';
import CategoryTree from './categoryTree';
import { useWindowSize } from '@magento/peregrine';
import CmsBlock from '../CmsBlock';

const Branch = props => {
    const {
        category,
        setCategoryId,
        categories,
        onNavigate,
        updateCategories
    } = props;

    const [select, setSelect] = useState(false);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 700;
    const { id, name, level, label, submenu_type, megamenu_block } = category;
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useCategoryBranch({ category, setCategoryId });
    const { exclude } = talonProps;
    const positionLevel = `level_${level}`;
    const iconDesktop = level > 2 ? classes.iconRight : classes.iconDown;
    const labelStyle = label === 'sale' ? classes.labelSale : classes.labelNew;
    const menuLabel = label != null ? <div className={labelStyle}>{label}</div> : null;
    const desktopStyle = `${defaultClasses.branch} ${defaultClasses[positionLevel]}`
    const mobileStyle = select ? classes.branch_open : classes.branch_close;
    const style = isMobile ? mobileStyle : desktopStyle;
    const iconMobile = select ? classes.iconMinus : classes.iconPlus;

    const handleClick = () => {
        setSelect(!select);
    };

    if (exclude) {
        return null;
    };
    return (
        <li className={classes.root}>
            {
                isMobile ?
                    <button
                        className={classes.target}
                        type="button"
                        onClick={handleClick}
                    >
                        <span className={classes.text}>{name}{menuLabel}</span>
                        <span className={iconMobile} />
                    </button> :
                    <div className={classes.target}>
                        <span className={classes.text}>{name}</span>
                        <span className={iconDesktop} />
                        <span>{menuLabel}</span>
                    </div>
            }
            {
                submenu_type && megamenu_block && !isMobile ? 
                    <div className={classes[submenu_type]}>
                        <CmsBlock identifiers={[megamenu_block]}/>
                    </div> :
                    <div className={style}>
                    <CategoryTree
                        categories={categories}
                        categoryId={id}
                        onNavigate={onNavigate}
                        setCategoryId={setCategoryId}
                        updateCategories={updateCategories}
                    />
                </div>
            }
        </li>
    );
};

export default Branch;

Branch.propTypes = {
    category: shape({
        id: number.isRequired,
        include_in_menu: number,
        name: string.isRequired,
        label: string,
        level: number.isRequired,
    }).isRequired,
    classes: shape({
        root: string,
        target: string,
        text: string,
    }),
    setCategoryId: func.isRequired
};
