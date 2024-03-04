import React, {useContext, useState, useEffect} from "react";
import {Table} from "reactstrap";
import {Alert, Button} from 'antd';
import axios from "axios";
import "./ModelList.css";
import LanguageContext from "../../LanguageContext";
import {Trans_FeatureList} from "../utils";
import {ESTIMATE_URL} from "../../../index";
import "../../Alert.css";
import DistModal from "./DistModal";
import LocateModal from "./LocateModal";


const FeatureList = ({features, resetState}) => {
    const {la, _} = useContext(LanguageContext);
    const color_th = "dimgray";

    const bins = 40;
    const chunk_name = "chunk2";
    const data_size = 200000;

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const [feature, setFeature] = useState("");
    const [msg, setMsg] = useState("");
    const [showAlert, setShowAlert] = useState(true);
    const [showWho, setShowWho] = useState("");

    const [loMin, setLoMin] = useState(-180);
    const [loMax, setLoMax] = useState(180);
    const [laMin, setLaMin] = useState(-80);
    const [laMax, setLaMax] = useState(80);

    const handleShowDist = (feature) => {
        setFeature(feature);
        setMsg('wait_cal');
        setShowAlert(true);
        axios.get(ESTIMATE_URL + "features/dist" +
            `?feature=${feature}&bins=${bins}&chunk_name=${chunk_name}&data_size=${data_size}`)
            .then(response => {
                setData(response.data);
                setOpen(true);
                setShowWho("dist");
                setMsg("");
                setShowAlert(false);
                console.log(`Success reading ${feature} distribution`);
            }).catch(error => {
            setMsg("");
            console.error(error);
        });
    };

    const handleShowLocate = () => {
        setFeature("source_locate");
        setMsg('wait_cal');
        setShowAlert(true);
        axios.get(ESTIMATE_URL + "features/locate" +
            `?chunk_name=${chunk_name}&lo_min=${loMin}&lo_max=${loMax}&la_min=${laMin}&la_max=${laMax}`)
            .then(response => {
                setData(response.data);
                setOpen(true);
                setShowWho("locate");
                setMsg("");
                setShowAlert(false);
                console.log(`Success reading source location`);
            }).catch(error => {
            setMsg("");
            console.error(error);
        });
    }

    const handleCloseChart = () => {
        setData([]);
        setOpen(false);
        setShowWho("");
    };

    const getButton = (feature_name) => {
        if (["source_latitude", "source_longitude"].includes(feature_name)) {
            return (
                <Button className="ModelList-Button-Location" size={"large"}
                        onClick={() => handleShowLocate()}>
                    <span className="ModelList-Button-Label-Text">
                        {Trans_FeatureList(la)['location']}
                    </span>
                </Button>
            )
        } else {
            return (
                <Button className="ModelList-Button-Distribution" size={"large"}
                        onClick={() => handleShowDist(feature_name)}>
                    <span className="ModelList-Button-Label-Text">
                        {Trans_FeatureList(la)['distribution']}
                    </span>
                </Button>
            )
        }
    }

    return (
        <div>
            <Table>
                <thead className="ModelList-Thead">
                <tr>
                    <th style={{color: color_th}}>{Trans_FeatureList(la)['param']}</th>
                    <th style={{color: color_th}}>{Trans_FeatureList(la)['description']}</th>
                    <th style={{color: color_th}}>{Trans_FeatureList(la)['operation']}</th>
                </tr>
                </thead>
                <tbody className="ModelList-Tbody">
                {!features || features.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Ops, no one here yet</b>
                        </td>
                    </tr>
                ) : (
                    features.map(feature => (
                            <tr key={feature.pk}>
                                <td>{feature.param}</td>
                                <td>{feature.description}</td>
                                <td>{getButton(feature.param)}</td>
                            </tr>
                        )
                    )
                )}
                </tbody>
            </Table>

            {msg === 'wait_cal' && showAlert &&
                <Alert className="CalDist-Alert" message={Trans_FeatureList(la)['wait_cal']} type="success" showIcon/>}

            {showWho === "dist" &&
                <DistModal data={data}
                           feature={feature}
                           open={open}
                           onCancel={handleCloseChart}
                           onClick={handleCloseChart}
                           la={la}/>}

            {showWho === "locate" &&
                <LocateModal data={data}
                             loMin={loMin}
                             loMax={loMax}
                             laMin={laMin}
                             laMax={laMax}
                             open={open}
                             onCancel={handleCloseChart}
                             onClick={handleCloseChart}
                             la={la}/>}
        </div>
    );
}

export default FeatureList;
