import React, {useEffect, useContext} from 'react';
import {Graph} from '@antv/x6'
import {initEdge, initNode} from "../Opt";
import {Trans_Home} from "../../func";
import "../Opt.css";
import LanguageContext from "../../LanguageContext";

const Train = () => {
    const {la} = useContext(LanguageContext);
    const width = window.innerWidth;

    const ids = [
        'start', 'eq_log', 'eq_data', 'train_set',
        'data_label', 'forward', 'is_end', 'func', 'loss', 'update',
        'save', 'end'];
    const xs = [0, 0, 0, 0, 0, 0, 0, 300, 300, 300, 0, 0]
    const ys = [0, 100, 200, 300, 400, 500, 600, 600, 500, 400, 700, 800];
    const labels = [
        'acquire', 'prep', 'split',
        'train_start', 'in', 'out', 'no', 'base', 'backward'];

    const nodes = initNode(ids, xs, ys, la);
    const edges = initEdge(ids, labels, la);

    edges.push({
        shape: 'edge',
        source: `node_update`,
        target: `node_data_label`,
        label: `${Trans_Home(la)['add_epoch']}`,
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
    })
    edges.push({
        shape: 'edge',
        source: `node_is_end`,
        target: `node_save`,
        label: `${Trans_Home(la)['yes']}`,
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
    })
    edges.push({
        shape: 'edge',
        source: `node_save`,
        target: `node_end`,
        label: `${Trans_Home(la)['train_end']}`,
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
    })

    const data = {
        nodes: nodes,
        edges: edges
    }

    useEffect(() => {
        const graph = new Graph({
            container: document.getElementById('train-container'),
            width: width * 0.35,
            height: 900,
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
            mousewheel: true
        });

        graph.fromJSON(data);
        graph.centerContent();
    }, []);

    return (
        <div id="train-container" className="Train-Container">
        </div>
    )
}

export default Train;
