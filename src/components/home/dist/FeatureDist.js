import React from "react";
import {Column} from '@ant-design/plots';
import {WIDTH_MODAL, Trans_FeatureList} from "../func";
import {getStoredLanguage} from "../../func";


const FeatureDist = ({data, feature}) => {
    const la = getStoredLanguage();

    const config = {
        data: data,
        xField: 'x',
        yField: 'y',
        width: WIDTH_MODAL - 100,
        // label: {
        //     style: {
        //         fill: '#FFFFFF',
        //         opacity: 0.6,
        //     },
        // },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        axis: {
            x: {
                title: `${Trans_FeatureList(la)[feature]}`,
                titleFill: 'black'
            },
            y: {
                title: `${Trans_FeatureList(la)['frequency']}`,
                titleFill: 'black'
            },
        },
    };

    return (
        <div>
            <Column {...config} />
        </div>

    );
}

export default FeatureDist;
