import React, {useContext, useEffect} from "react";
import {Scene, PointLayer} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';
import LanguageContext from "../../LanguageContext";
import {WIDTH_MODAL} from "../utils";


const SourceLocate = ({data, loMin, loMax, laMin, laMax}) => {
    const {la, _} = useContext(LanguageContext);
    const center = [(loMin + loMax) / 2, (laMin + laMax) / 2];

    useEffect(() => {
        const scene = new Scene({
            id: 'map',
            map: new GaodeMap({
                style: 'light',
                center: center,
                zoom: 1,
            })
        });

        scene.on('loaded', () => {
            scene.map.add(new window.AMap.TileLayer.Satellite());
            const pointLayer = new PointLayer({})
                .source(data, {
                    parser: {
                        type: 'json',
                        x: 'Longitude',
                        y: 'Latitude',
                    }
                })
                .shape('circle')
                .size(8)
                .active(true)
                .color('Magnitude', [
                    '#400040',
                    '#800080',
                    '#A020F0',
                    '#DDA0DD',
                    '#FF1493',
                    '#FF69B4',
                    '#FFB6C1',
                    '#FF8040',
                    '#FFB380',
                    '#FFEEDD'
                ])
                .style({
                    opacity: 0.5,
                    strokeWidth: 0
                });
            scene.addLayer(pointLayer);
        });
    }, []);

    return (
        <div id='map'
             style={{
                 height: 700,
                 width: WIDTH_MODAL - 100,
                 position: 'relative',
                 justifyContent: 'center',
             }}>
        </div>
    )
}

export default SourceLocate;
