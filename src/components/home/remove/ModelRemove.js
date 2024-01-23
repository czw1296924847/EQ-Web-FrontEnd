import React, {Component, Fragment} from "react";
import {Modal, ModalHeader, Button, ModalFooter} from "reactstrap";

import axios from "axios";
import {ESTIMATE_URL} from "../../../index";

class ModelRemove extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    deleteModel = (pk) => {
        axios.delete(ESTIMATE_URL + pk).then(() => {
            this.props.resetState();
            this.toggle();
        });
    };

    render() {
        return (
            <Fragment>
                <Button color="danger" onClick={() => this.toggle()}>
                    Remove
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Do you really wanna delete the model?
                    </ModalHeader>

                    <ModalFooter>
                        <Button type="button" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            color="primary"
                            onClick={() => this.deleteModel(this.props.pk)}
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default ModelRemove;
