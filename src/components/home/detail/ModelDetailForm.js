import React, {Fragment, useState} from 'react';
import {Table} from 'reactstrap';
import {Button} from 'antd';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {solarizedlight} from 'react-syntax-highlighter/dist/esm/styles/prism';

import './ModelDetailForm.css';
import {Trans_ModelDetail, handleModalCancel, getStoredLanguage} from '../../func';
import EditModal from './EditModal';
import UploadModal from './UploadModal';
import RunModal from "./RunModal";


const ModelDetailForm = ({infos, resetState}) => {
    const la = getStoredLanguage();
    const [editModal, setEditModal] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);
    const [runModal, setRunModal] = useState(false);
    const [selectKey, setSelectKey] = useState('');
    const [info, setInfo] = useState(null);

    const showModal = (key, info, setModal) => {
        setModal(true);
        setSelectKey(key);
        setInfo(info);
    }

    const items_edit = ['name', 'description', 'version', 'owner', 'path_data', 'library', 'code_data', 'code_model', 'code_train', 'code_test', 'code_run'];
    const items_upload = ['library', 'code_data', 'code_model', 'code_train', 'code_test', 'code_run'];
    const items_run = ['code_data', 'code_run'];
    // const items_invariable = ['pk', 'version', 'created_at', 'situation'];

    return (
        <Fragment>
            <Table>
                <thead>
                <tr className='ModelDetailForm-thead'>
                    <th>{Trans_ModelDetail(la)['item']}</th>
                    <th>{Trans_ModelDetail(la)['value']}</th>
                    <th>{Trans_ModelDetail(la)['opt']}</th>
                </tr>
                </thead>
                <tbody>
                {infos.map(info => {
                    return Object.keys(info).map(key => {
                        return (
                            <tr key={key}>
                                <td className='ModelDetailForm-Item'>
                                    {Trans_ModelDetail(la)[key] ? Trans_ModelDetail(la)[key] : key}
                                </td>

                                <td className='ModelDetailForm-Value'>
                                    {items_upload.includes(key) ?
                                        <SyntaxHighlighter language='python'
                                                           style={solarizedlight}>
                                            {info[key]}
                                        </SyntaxHighlighter> : info[key]}
                                </td>

                                <td className='ModelDetailForm-Opt'>

                                    {items_edit.includes(key) &&
                                        <Button className='ModelDetail-Edit-Button'
                                                onClick={() => showModal(key, info, setEditModal)}
                                                size={'middle'}>
                                            <span className='ModelDetail-Button-Label-Text'>
                                                {Trans_ModelDetail(la)['edit']}
                                            </span>
                                        </Button>}

                                    {items_upload.includes(key) &&
                                        // &nbsp;&nbsp;
                                        <Button className='ModelDetail-Upload-Button'
                                                onClick={() => showModal(key, info, setEditModal)}
                                                size={'middle'}>
                                                <span className='ModelDetail-Button-Label-Text'>
                                                    {Trans_ModelDetail(la)['upload']}
                                                </span>
                                        </Button>}

                                    {items_run.includes(key) &&
                                        <Button className='ModelDetail-Run-Button'
                                                onClick={() => showModal(key, info, setRunModal)}
                                                size={'middle'}>
                                                <span className='ModelDetail-Button-Label-Text'>
                                                    {Trans_ModelDetail(la)['run']}
                                                </span>
                                        </Button>}
                                </td>
                            </tr>
                        )
                    })
                })}
                </tbody>
            </Table>

            {editModal && <EditModal items_edit={items_edit}
                                     items_upload={items_upload}
                                     resetState={resetState}
                                     info={info}
                                     selectKey={selectKey}
                                     modal={editModal}
                                     handleCancel={() => handleModalCancel(setEditModal)}/>}

            {uploadModal && <UploadModal resetState={resetState}
                                         info={info}
                                         selectKey={selectKey}
                                         modal={uploadModal}
                                         handleCancel={() => handleModalCancel(setUploadModal)}/>}

            {runModal && <RunModal items_upload={items_upload}
                                   resetState={resetState}
                                   info={info}
                                   selectKey={selectKey}
                                   modal={runModal}
                                   handleCancel={() => handleModalCancel(setRunModal)}/>}
        </Fragment>
    );
}

export default ModelDetailForm;
