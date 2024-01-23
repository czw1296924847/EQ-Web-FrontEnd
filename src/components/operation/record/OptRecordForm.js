import React, {useState, useEffect, useContext} from "react";
import LanguageContext from "../../LanguageContext";
import {Table} from "reactstrap";
import OptRecordRemove from "./OptRecordRemove";
import "./OptRecord.css";
import {Trans_OptRecordForm} from "../utils";


const OptRecordForm = ({infos, resetState, model_name}) => {
    const {la, setLa} = useContext(LanguageContext);
    const color_th = "dimgray";

    return (
        <Table>
            <thead className="OptRecord-Thead">
            <tr>
                <th style={{color: color_th}}>{Trans_OptRecordForm(la)['train_ratio']}</th>
                <th style={{color: color_th}}>{Trans_OptRecordForm(la)['data_size']}</th>
                <th style={{color: color_th}}>{Trans_OptRecordForm(la)['sm_scale']}</th>
                <th style={{color: color_th}}>{Trans_OptRecordForm(la)['chunk_name']}</th>
                <th style={{color: color_th}}>{Trans_OptRecordForm(la)['operation']}</th>
            </tr>
            </thead>
            <tbody className="OptRecord-Tbody">
            {infos.map(info => {
                if (info.model_name === model_name) {
                    return info.record.map(record => (
                        <tr>
                            <td>{record.train_ratio}</td>
                            <td>{record.data_size}</td>
                            <td>{record.sm_scale}</td>
                            <td>{record.chunk_name}</td>
                            <td>
                                {/*&nbsp;&nbsp;*/}
                                <OptRecordRemove train_ratio={record.train_ratio}
                                                 data_size={record.data_size}
                                                 sm_scale={record.sm_scale}
                                                 chunk_name={record.chunk_name}
                                                 resetState={resetState}/>
                            </td>
                        </tr>
                    ));
                } else {
                    return null;
                }
            })}
            </tbody>
        </Table>
    );
}

export default OptRecordForm;
