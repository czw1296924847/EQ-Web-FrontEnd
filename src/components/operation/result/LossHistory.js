import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
import {Line} from '@ant-design/plots';
import {UpperFirst, WIDTH_PLOT} from "../utils";


const LossHistory = ({data, opt}) => {


    const config = {
        data: data,
        xField: 'x',
        yField: 'y',
        width: WIDTH_PLOT,
        title: `Mean Squared Loss during ${UpperFirst(opt)}ing`,
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
                title: 'Epoch',
                titleFill: 'black'
            },
            y: {
                title: 'Loss',
                titleFill: 'black'
            },
        },
    };

    return (
        <Line {...config} />
    );
}

export default LossHistory;
