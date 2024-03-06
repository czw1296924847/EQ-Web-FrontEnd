import React, {useEffect, useContext} from 'react';
import {Graph} from '@antv/x6'
import {initEdge, initNode} from "../Opt";
import "../Opt.css";
import LanguageContext from "../../LanguageContext";

const Test = () => {
    const {la} = useContext(LanguageContext);
    const width = window.innerWidth * 0.25;

    const ids = [
        'start', 'eq_log', 'eq_data', 'test_set',
        'data_label', 'forward', 'end'];
    const xs = [0, 0, 0, 0, 0, 0, 0]
    const ys = [0, 100, 200, 300, 400, 500, 600];
    const labels = [
        'acquire', 'prep', 'split',
        'test_start', 'in', 'out',];

    const nodes = initNode(ids, xs, ys, la);
    const edges = initEdge(ids, labels, la);

    const data = {
        nodes: nodes,
        edges: edges
    }

    useEffect(() => {
        const graph = new Graph({
            container: document.getElementById('test-container'),
            width: width,
            height: 700,
            background: {
                color: '#F2F7FA',
            },
            grid: {
                visible: true,
                type: 'doubleMesh',
                args: [
                    {
                        color: '#eee',
                        thickness: 1,
                    },
                    {
                        color: '#ddd',
                        thickness: 1,
                        factor: 4,
                    },
                ],
            },
            panning: true,
            mousewheel: false,
        });

        graph.fromJSON(data);
        graph.centerContent();
    }, [la]);

    return (
        <div id="test-container" className="Test-Container">
        </div>
    )
}

export default Test;
