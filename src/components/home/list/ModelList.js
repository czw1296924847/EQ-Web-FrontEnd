import React, {useContext} from "react";
import {Table, } from "reactstrap";
import {Button} from 'antd';
// import {Table} from 'antd';
import ModelNew from "../edit/ModelNew";
import ModelRemove from "../remove/ModelRemove";
import "./ModelList.css";
import LanguageContext from "../../LanguageContext";
import {Trans_ModelList} from "../utils";


const ModelList = ({models, resetState}) => {
    const {la, _} = useContext(LanguageContext);
    const color_th = "dimgray";

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
                                {/*<ModelNew*/}
                                {/*    create={false}*/}
                                {/*    model={model}*/}
                                {/*    resetState={resetState}*/}
                                {/*/>*/}
                                {/*&nbsp;&nbsp;*/}
                                {/*<ModelRemove pk={model.pk} resetState={resetState}/>*/}

                                <Button className="ModelList-Button-Train" size={"large"}>
                                    <a className="ModelList-Button-Label"
                                       href={`/${model.name}/train`}>
                                        {Trans_ModelList(la)['train']}</a>
                                </Button>
                                &nbsp;&nbsp;
                                <Button className="ModelList-Button-Test" size={"large"}>
                                    <a className="ModelList-Button-Label"
                                       href={`/${model.name}/test`}>
                                        {Trans_ModelList(la)['test']}</a>
                                </Button>
                                &nbsp;&nbsp;
                                <Button className="ModelList-Button-Detail" size={"large"}>
                                    <a className="ModelList-Button-Label"
                                       href={`/${model.name}/detail`}>
                                        {Trans_ModelList(la)['detail']}</a>
                                </Button>
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
