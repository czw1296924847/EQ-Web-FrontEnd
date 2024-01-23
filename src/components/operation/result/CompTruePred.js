import React from "react";
import {Scatter} from '@ant-design/plots';
import {WIDTH_PLOT} from "../utils";

const CompTruePred = ({data}) => {

    const config = {
        data: data,
        xField: 'x',
        yField: 'y',
        size: 5,
        title: `Compare True and Predicted Magnitude`,
        width: WIDTH_PLOT,
        pointStyle: {
            stroke: '#777777',
            lineWidth: 1,
            fill: '#5B8FF9',
        },
        regressionLine: {
            type: 'quad', // linear, exp, loess, log, poly, pow, quad
        },
        axis: {
            x: {
                title: 'True',
                titleFill: 'black'
            },
            y: {
                title: 'Predicted',
                titleFill: 'black'
            },
        },
    };
    return (
        <div>
            <Scatter {...config} />
        </div>

    );
}

export default CompTruePred;
