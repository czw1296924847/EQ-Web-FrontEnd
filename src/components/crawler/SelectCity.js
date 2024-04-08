import React, {useState} from "react";
import {Select, Tag} from 'antd';
import {DEFAULT_CITIES, Trans_Weather} from "./func";
import {getStoredLanguage} from "../func";


const tagRender = (props) => {
    const {label, value, closable, onClose} = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag color={value}
             onMouseDown={onPreventMouseDown}
             closable={closable}
             onClose={onClose}
             style={{
                 marginInlineEnd: 4,
             }}>
            {label}
        </Tag>
    );
};


const SelectCity = ({cities, setCities}) => {
    const la = getStoredLanguage();
    const options = DEFAULT_CITIES.map(city => ({ value: city }));

    const handleChange = (newCities) => {
        setCities(newCities);
    }

    return <Select mode="multiple"
        // tagRender={tagRender}
                   placeholder={Trans_Weather(la)['select_city']}
                   defaultValue={cities}
                   style={{width: '100%',}}
                   options={options}
                   onChange={handleChange}
    />
}

export default SelectCity;
