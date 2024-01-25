import React, {useState, useContext} from "react";
import {Modal, ModalHeader, Button, ModalFooter} from "reactstrap";
import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import "./OptRecord.css";
import LanguageContext from "../../LanguageContext";
import {Trans_OptRecordForm} from "../utils";


const OptRecordRemove = ({train_ratio, data_size, sm_scale, chunk_name, resetState}) => {
    const {la, _} = useContext(LanguageContext);

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
        <div>
            <Button className="OptRecord-Button-Label"
                    onClick={() => toggle()}
                    color="danger">Delete</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {Trans_OptRecordForm(la)['want_delete']}
                </ModalHeader>

                <ModalFooter>
                    <Button onClick={() => toggle()}
                            type="button">{Trans_OptRecordForm(la)['no']}</Button>
                    <Button onClick={() => deleteRecord()}
                            color="primary"
                            type="button">{Trans_OptRecordForm(la)['yes']}</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default OptRecordRemove;
