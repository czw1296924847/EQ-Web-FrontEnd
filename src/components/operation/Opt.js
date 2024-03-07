import React from 'react';
import {Trans_Home} from "../func";
import "./Opt.css";


export const initNode = (ids, xs, ys, la) => {
    if (ids.length !== xs.length || ids.length !== ys.length) {
        throw new Error('All input arrays must have the same length');
    }
    let nodes = [];
    for (let i = 0; i < ids.length; i++) {
        nodes.push({
            id: `node_${ids[i]}`,
            shape: 'rect',
            x: xs[i],
            y: ys[i],
            width: 150,
            height: 40,
            label: `${Trans_Home(la)[ids[i]]}`,
            attrs: {
                body: {
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 6,
                    ry: 6,
                },
            },
        })
    }
    return nodes;
}


export const initEdge = (ids, labels, la) => {
    // if (ids.length !== (labels.length + 1)) {
    //     throw new Error("The length of 'ids' must be greater than 'labels' by 1");
    // }
    let edges = [];
    for (let i = 0; i < labels.length; i++) {
        edges.push({
            shape: 'edge',
            source: `node_${ids[i]}`,
            target: `node_${ids[i + 1]}`,
            label: `${Trans_Home(la)[labels[i]]}`,
            attrs: {
                line: {
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                },
            },
        })
    }
    return edges;
}
