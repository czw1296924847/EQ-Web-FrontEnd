import React, {useState, useEffect} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

import axios from "axios";
import {ESTIMATE_URL} from "../../../index";

const ModelNewForm = ({resetState, toggle, model}) => {
    const [state, setState] = useState({
        pk: 0,
        name: "",
        description: "",
        owner: "",
    });

    useState(() => {
        if (model) {
            const {pk, name, description, owner} = model;
            setState({...state, pk, name, description, owner});
        }
    }, [model]);

    const onChange = e => {
        setState({...state, [e.target.name]: e.target.value})
    };

    const createModel = e => {
        e.preventDefault();
        axios.post(ESTIMATE_URL, state).then(() => {
            resetState();
            toggle();
        });
    };

    const editModel = e => {
        e.preventDefault();
        axios.put(ESTIMATE_URL + state.pk, state).then(() => {
            resetState();
            toggle();
        });
    };

    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

        return (
            <Form onSubmit={model ? editModel : createModel}>
                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        onChange={onChange}
                        value={defaultIfEmpty(state.name)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description:</Label>
                    <Input
                        type="text"
                        name="description"
                        onChange={onChange}
                        value={defaultIfEmpty(state.description)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="owner">Owner:</Label>
                    <Input
                        type="text"
                        name="owner"
                        onChange={onChange}
                        value={defaultIfEmpty(state.owner)}
                    />
                </FormGroup>
                <Button>Send</Button>
            </Form>
        );
}

export default ModelNewForm;
