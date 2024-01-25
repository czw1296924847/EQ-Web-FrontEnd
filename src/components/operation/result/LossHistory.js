import React, {useContext} from "react";
import {Line} from '@ant-design/plots';
import {WIDTH_PLOT, Trans_OptResult} from "../utils";
import LanguageContext from "../../LanguageContext";


const LossHistory = ({data}) => {
    const {la, _} = useContext(LanguageContext);

    const config = {
        data: data,
        xField: 'x',
        yField: 'y',
        width: WIDTH_PLOT,
        title: Trans_OptResult(la)['loss_title'],
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        axis: {
            x: {
                title: Trans_OptResult(la)['epochs'],
                titleFill: 'black'
            },
            y: {
                title: Trans_OptResult(la)['loss'],
                titleFill: 'black'
            },
        },
    };

    return (
        <Line {...config} />
    );
}

export default LossHistory;
