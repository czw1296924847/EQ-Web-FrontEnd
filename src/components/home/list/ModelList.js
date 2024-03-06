import React, {useContext, useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {Table,} from "reactstrap";
import "./ModelList.css";
import LanguageContext from "../../LanguageContext";
import {Trans_ModelList} from "../utils";
import {UrlButton} from "../../operation/OptParam";
import ModelRemove from "../remove/ModelRemove";
import {SimpleAlert, DEFAULT_MODELS, DEFAULT_OPTS, onCloseAlert} from "../../func";
import {ESTIMATE_URL} from "../../../index";

const ModelList = ({models, resetState}) => {
    const {la, _} = useContext(LanguageContext);
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const color_th = "dimgray";

    const margin_left = (model_name) => {
        return DEFAULT_MODELS.includes(model_name) ? 0 : 160.5;
    }

    const getModelUrl = (model_name, toPath) => {
        if (DEFAULT_OPTS.includes(toPath)) {
            let path_data = "";
            let library = "";
            let code_data = "";
            let code_model = "";
            let code_train = "";
            let code_test = "";
            let code_run = "";
            if (DEFAULT_MODELS.includes(model_name)) {
                navigate(`/${model_name}/${toPath}`);
            } else {
                axios.get(ESTIMATE_URL + `${model_name}/detail`).then(response => {
                    path_data = response.data[0]['path_data'];
                    library = response.data[0]['library'];
                    code_data = response.data[0]['code_data'];
                    code_model = response.data[0]['code_model'];
                    code_train = response.data[0]['code_train'];
                    code_test = response.data[0]['code_test'];
                    code_run = response.data[0]['code_run'];
                    if (path_data !== "" && library !== "" && code_data !== "" && code_model !== "" && code_train !== "" && code_test !== "" && code_run !== "") {
                        console.log('CheckDetail Success.');
                        navigate(`/${model_name}/${toPath}`);
                    } else {
                        setMsg(Trans_ModelList(la)['click_complete']);
                        setShowAlert(true);
                        console.log("CheckDetail Failed.");
                    }
                }).catch(error => {
                    console.error(error);
                });
            }
        } else {
            navigate(`/${model_name}/${toPath}`);
        }
    }

    return (
        <div>
            <Table>
                <thead className="ModelList-Thead">
                <tr>
                    <th style={{color: color_th}}>{Trans_ModelList(la)['name']}</th>
                    <th style={{color: color_th}}>{Trans_ModelList(la)['description']}</th>
                    <th style={{color: color_th}}>{Trans_ModelList(la)['owner']}</th>
                    <th style={{color: color_th}}>{Trans_ModelList(la)['operation']}</th>
                </tr>
                </thead>
                <tbody className="ModelList-Tbody">
                {!models || models.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Ops, no one here yet</b>
                        </td>
                    </tr>
                ) : (
                    models.map(model => (
                            <tr key={model.pk}>
                                <td>{model.name}</td>
                                <td>{model.description}</td>
                                <td>{model.owner}</td>
                                <td className='ModelList-Opt'>
                                    {DEFAULT_MODELS.includes(model.name) && (
                                        <>
                                            {UrlButton(getModelUrl, la, model.name, "train", "ModelList-Button-Train", {})}
                                            {' '}
                                            {UrlButton(getModelUrl, la, model.name, "test", "ModelList-Button-Test", {})}
                                            {' '}
                                        </>
                                    )}
                                    {UrlButton(getModelUrl, la, model.name, "detail", "ModelList-Button-Detail", {marginLeft: `${margin_left(model.name)}px`})}
                                    {' '}
                                    <ModelRemove pk={model.pk} resetState={resetState}/>
                                </td>
                            </tr>
                        )
                    )
                )}
                </tbody>
            </Table>
            {showAlert && SimpleAlert("ModelList-Alert-Complete", msg, "error", (e) => onCloseAlert(e, setShowAlert, setMsg))}
        </div>
    );
}

export default ModelList;
