import {Fragment, useContext, useState, useEffect} from "react";
import {Button, Input, message, Modal, Upload} from 'antd';
import axios from "axios";

import {Trans_ModelDetail} from "../../func";
import LanguageContext from "../../LanguageContext";
import {ESTIMATE_URL} from "../../../index";

const {TextArea} = Input;

const UploadModal = ({resetState, info, selectKey, modal, handleCancel}) => {
    const [changeValue, setChangeValue] = useState(info[selectKey]);
    const {la, _} = useContext(LanguageContext);

    const props = {
        name: 'file',
        action: ESTIMATE_URL + "models/" + info.pk,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        maxCount: 1,

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} ${Trans_ModelDetail(la)['upload_success']}`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} ${Trans_ModelDetail(la)['upload_fail']}`);
            }
        },

        customRequest(options) {
            const data = new FormData();
            data.append('file', options.file);
            data.append('style', 'upload');
            data.append('key', selectKey);
            axios.put(options.action, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                if (response.status === 200) {
                    resetState();
                    setChangeValue(response.data);
                    options.onSuccess(response.data, options.file);
                } else {
                    options.onError(new Error('Upload failed'), options.file);
                }
            }).catch(error => {
                options.onError(error, options.file);
            })
        },
    }

    return (
        <Fragment>
            <Modal title={`${Trans_ModelDetail(la)[selectKey]}`}
                   open={modal}
                   onCancel={handleCancel}
                   width={1000}
                   footer={null}>

                <TextArea value={changeValue}
                          onChange={e => setChangeValue(e.target.value)}
                          autoSize={{minRows: 3, maxRows: 18}}/>

                <Upload {...props}>
                    <Button>{Trans_ModelDetail(la)['click_upload']}</Button>
                </Upload>

            </Modal>
        </Fragment>
    );
}

export default UploadModal;
