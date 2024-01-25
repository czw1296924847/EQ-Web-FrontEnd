import React, {useContext, useState, useEffect} from "react";
import {Table} from "reactstrap";
import {Alert, Modal, Button} from 'antd';
import axios from "axios";
import FeatureDist from "../dist/FeatureDist";
import "./ModelList.css";
import LanguageContext from "../../LanguageContext";
import {Trans_FeatureList} from "../utils";
import {WIDTH_MODAL} from "../utils";
import {ESTIMATE_URL} from "../../../index";
import "../../Alert.css";


const FeatureList = ({features, resetState}) => {
    const {la, _} = useContext(LanguageContext);
    const color_th = "dimgray";

    const bins = 40;
    const chunk_name = "chunk2";
    const data_size = 200000;

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    const [feature, setFeature] = useState("");
    const [msg, setMsg] = useState("");
    const [showAlert, setShowAlert] = useState(true);

    const handleShowChart = (feature) => {
        setFeature(feature);
        setMsg('wait_cal');
        setShowAlert(true);
        axios.get(ESTIMATE_URL + "features/dist" +
            `?feature=${feature}&bins=${bins}&chunk_name=${chunk_name}&data_size=${data_size}`)
            .then(response => {
                setData(response.data);
                setVisible(true);
                setMsg("");
                setShowAlert(false);
                console.log(`Success reading ${feature} distribution`);
            }).catch(error => {
            setMsg("");
            console.error(error);
        });
    };

    const handleCloseChart = () => {
        setVisible(false);
    };

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
                                <td>
                                    <Button className="ModelList-Button-Distribution" size={"large"}
                                            onClick={() => handleShowChart(feature.param)}>
                                        <span className="ModelList-Button-Label">
                                            {Trans_FeatureList(la)['distribution']}</span>
                                    </Button>
                                </td>
                            </tr>
                        )
                    )
                )}
                </tbody>
            </Table>

            {msg === 'wait_cal' && showAlert &&
                <Alert className="CalDist-Alert" message={Trans_FeatureList(la)['wait_cal']} type="success" showIcon/>}

            <Modal
                title={`${Trans_FeatureList(la)[feature]} - ${Trans_FeatureList(la)['value_dist']}`}
                visible={visible}
                centered
                onCancel={handleCloseChart}
                width={WIDTH_MODAL}
                footer={<Button className="FeatureList-Modal-Footer" key="back" onClick={handleCloseChart}>
                    {Trans_FeatureList(la)['close']}</Button>}
            >

                <FeatureDist data={data} feature={feature}/>
            </Modal>
        </div>
    );
}

export default FeatureList;
