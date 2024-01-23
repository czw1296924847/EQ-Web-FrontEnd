import React, {useContext} from "react";
import {Column} from '@ant-design/plots';
import LanguageContext from "../../LanguageContext";
import {WIDTH_MODAL} from "../utils";
import {Trans_FeatureList} from "../utils";


const FeatureDist = ({data, feature}) => {
    const {la, _} = useContext(LanguageContext);

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
