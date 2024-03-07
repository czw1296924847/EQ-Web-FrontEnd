import React, {useState} from "react";
import {Button, Modal, Alert} from 'antd';

import ModelNewForm from "./ModelNewForm";
import "../list/ModelList.css";
import {Trans_ModelList} from "../func";
import "../../Alert.css";
import {getStoredLanguage} from "../../func";

const ModelNew = ({resetState}) => {
    const la = getStoredLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onCloseAlert = (e) => {
        setShowAlert(false);
        setMsg("");
        console.log(e, "Close Alert.")
    };

    return (
        <div>
            <Button
                className="ModelList-Button-New"
                onClick={showModal}
                size={"large"}
                style={{minWidth: "200px"}}>
                <span className="ModelList-Button-New-Text">
                    {Trans_ModelList(la)['create_model']}</span>
            </Button>

            <Modal title={Trans_ModelList(la)['create_model']}
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   footer={null}>
                <ModelNewForm setShowAlert={setShowAlert}
                              setMsg={setMsg}
                              resetState={resetState}
                              handleOk={handleOk}/>
            </Modal>
            {showAlert && <Alert className="ModelList-Alert-Create"
                                 message={msg}
                                 closable
                                 type="error"
                                 showIcon
                                 onClose={(e) => onCloseAlert(e)}/>}
        </div>
    );
}

export default ModelNew;