import React from "react";
import {getStoredLanguage} from "../func";
import {Line} from '@ant-design/plots';
import {Trans_Weather} from "./func";


const PlotInfo = ({info, xName, yName}) => {
    const la = getStoredLanguage();

    const config = {
        data: info,
        xField: (d) => new Date(d.date),
        yField: 'temp',
        colorField: 'city',
        seriesField: 'city',
        legend: {
            color: {},
            size: {},
        },
        axis: {
            x: {
                title: Trans_Weather(la)[xName],
                titleFill: 'black',
            },
            y: {
                title: Trans_Weather(la)[yName],
                titleFill: 'black',
            },
        },
    };

    console.log(info);

    return (
        <Line {...config} />
    );
}

export default PlotInfo;
