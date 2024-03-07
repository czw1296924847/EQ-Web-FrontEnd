import React, {useState, Fragment} from "react";
import {Form, Button, Input} from "antd";

import axios from "axios";
import {ESTIMATE_URL} from "../../../index";
import {Trans_ModelList} from "../func";
import {getStoredLanguage} from "../../func";

const ModelNewForm = ({setShowAlert, setMsg, resetState, handleOk}) => {
    const la = getStoredLanguage();

    const [state, setState] = useState({
        pk: 0,
        name: "",
        description: "",
        owner: "",
    });

    const onChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    };

    const createModel = () => {
        axios.post(ESTIMATE_URL + "models", state).then(() => {
            handleOk();
            resetState();
            window.location.reload();
            console.log("Success!");
        }).catch(error => {
            handleOk();
            const content = error.response.data;
            let msg = "";
            if (content === "Model name already exists") {
                msg = Trans_ModelList(la)['name_exist'];
            } else {
                throw new Error("Unknown Error! Please fix this bug immediately.")
            }
            setMsg(msg);
            setShowAlert(true);
            console.error(error);
        });
    };

    const defaultIfEmpty = (value) => {
        return value === "" ? "" : value;
    };

    return (
        <Fragment>
            <Form onFinish={createModel}
                  layout="vertical">
                <Form.Item label={Trans_ModelList(la)['name']}
                           name="model name">
                    <Input value={defaultIfEmpty(state.name)}
                           name="name"
                           onChange={onChange}/>
                </Form.Item>
                <Form.Item label={Trans_ModelList(la)['description']}
                           name="description">
                    <Input value={defaultIfEmpty(state.name)}
                           name="description"
                           onChange={onChange}/>
                </Form.Item>
                <Form.Item label={Trans_ModelList(la)['owner']}
                           name="owner">
                    <Input value={defaultIfEmpty(state.name)}
                           name="owner"
                           onChange={onChange}/>
                </Form.Item>
                <Button type="primary" htmlType="submit">{Trans_ModelList(la)['create']}</Button>
            </Form>
        </Fragment>
    );
}

export default ModelNewForm;
