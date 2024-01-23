import React, {Component, Fragment, useState} from "react";
import {Modal, ModalHeader, Button, ModalFooter} from "reactstrap";

import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import "./OptRecord.css";


const OptRecordRemove = ({train_ratio, data_size, sm_scale, chunk_name, resetState}) => {
    const url = window.location.href.split('/').slice(2);
    const [modal, setModal] = useState(false);
    const [model_name, setModelName] = useState(url[url.length - 3]);
    const [opt, setOpt] = useState(url[url.length - 2]);

    const toggle = () => {
        setModal(!modal);
    };

    const deleteRecord = () => {
        axios.delete(ESTIMATE_URL + model_name + "/" + opt +
            `/record?train_ratio=${train_ratio}&data_size=${data_size}&sm_scale=${sm_scale}&chunk_name=${chunk_name}`)
            .then(() => {
                resetState();
                toggle();
            }).catch(error => {
                console.error(error);
        });
    };


    return (
        <Fragment>
            <Button className="OptRecord-Button-Label"
                    onClick={() => toggle()}
                    color="danger">Delete</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Do you really wanna delete the record?
                </ModalHeader>

                <ModalFooter>
                    <Button onClick={() => toggle()}
                            type="button">Cancel</Button>
                    <Button onClick={() => deleteRecord()}
                            color="primary"
                            type="button">Yes</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default OptRecordRemove;
