import React, {useContext} from "react";
import {Scatter} from '@ant-design/plots';
import {WIDTH_PLOT, Trans_OptResult} from "../utils";
import LanguageContext from "../../LanguageContext";

const CompTruePred = ({data}) => {
    const {la, _} = useContext(LanguageContext);

    const config = {
        data: data,
        xField: 'x',
        yField: 'y',
        size: 5,
        title: Trans_OptResult(la)['compare_title'],
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
                title: Trans_OptResult(la)['true'],
                titleFill: 'black'
            },
            y: {
                title: Trans_OptResult(la)['pred'],
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
