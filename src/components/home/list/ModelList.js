import React, {useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {Table,} from "reactstrap";
import "./ModelList.css";
import LanguageContext from "../../LanguageContext";
import {Trans_ModelList} from "../utils";
import {UrlButton} from "../../operation/OptParam";


const ModelList = ({models, resetState}) => {
    const {la, _} = useContext(LanguageContext);
    const navigate = useNavigate();

    const color_th = "dimgray";

    const getModelUrl = (model_name, toPath) => {
        navigate(`/${model_name}/${toPath}`);
    }

    return (
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
                            <td>
                                {UrlButton(getModelUrl, la, model.name, "train", "ModelList-Button-Train", {})}
                                &nbsp;&nbsp;
                                {UrlButton(getModelUrl, la, model.name, "test", "ModelList-Button-Test", {})}
                                &nbsp;&nbsp;
                                {UrlButton(getModelUrl, la, model.name, "detail", "ModelList-Button-Detail", {})}
                            </td>
                        </tr>
                    )
                )
            )}
            </tbody>

        </Table>
    );
}

export default ModelList;
