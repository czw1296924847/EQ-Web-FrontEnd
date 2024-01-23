import React, {useContext} from "react";
// import {Table} from 'antd';
import {Table} from "reactstrap";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {solarizedlight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import LanguageContext from "../../LanguageContext";
import "./ModelDetailForm.css";
import {Trans_ModelDetail} from "../../func";


const ModelDetailForm = ({infos}) => {
    const {la, _} = useContext(LanguageContext);

    return (
        <Table>
            <thead>
            <tr className="ModelDetailForm-thead">
                <th>{Trans_ModelDetail(la)['item']}</th>
                <th>{Trans_ModelDetail(la)['value']}</th>
            </tr>
            </thead>
            <tbody>
            {infos.map(info => {
                return Object.keys(info).map(key => {
                    return (
                        <tr key={key}>
                            <td className="ModelDetailForm-Item">
                                {Trans_ModelDetail(la)[key] ? Trans_ModelDetail(la)[key] : key}
                            </td>
                            <td className="ModelDetailForm-Value">
                                {key === "code" ?
                                    <SyntaxHighlighter language="python"
                                                       style={solarizedlight}>{info[key]}
                                    </SyntaxHighlighter> : info[key]}
                            </td>
                        </tr>
                    )
                })
            })}
            </tbody>
        </Table>
    );
}

export default ModelDetailForm;
