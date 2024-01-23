import React, {Fragment, useState, useContext} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import ModelNewForm from "./ModelNewForm";
import "../list/ModelList.css";
import LanguageContext from "../../LanguageContext";
import {Trans_ModelList} from "../utils";

const ModelNew = ({create, model, resetState}) => {
    const {la, _} = useContext(LanguageContext);
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    let title = "Editing Model";
    let button = <Button className="ModelList-Button-Edit" onClick={toggle}>
        <span className="ModelList-Button-Label">{Trans_ModelList(la)['edit']}</span></Button>;
    if (create) {
        title = "Creating New Model";

        button = (
            <Button
                color="primary"
                className="float-right"
                onClick={toggle}
                style={{minWidth: "200px"}}
            >
                Create New
            </Button>
        );
    }

    return (
        <Fragment>
            {button}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>

                <ModalBody>
                    <ModelNewForm
                        resetState={resetState}
                        toggle={toggle}
                        model={model}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
    );
}

export default ModelNew;