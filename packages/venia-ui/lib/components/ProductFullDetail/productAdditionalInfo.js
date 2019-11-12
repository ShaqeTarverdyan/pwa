import React from 'react';
import defaultClasses from './productAdditionalInfo.css';
import { mergeClasses } from '../../classify';

const AdditionalInfo = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { attributes } = props;
    return (
        <table className={classes.root}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {
                    attributes.map((item, index) =>
                    item.attribute_value &&
                        <tr key={index}>
                            <td>{item.attribute_label}</td>
                            <td>{item.attribute_value}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default AdditionalInfo;