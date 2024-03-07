import {Fragment, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Button, Modal, Input} from 'antd';
import axios from "axios";

import {getStoredLanguage, Trans_ModelDetail} from "../../func";
import {ESTIMATE_URL} from "../../../index";

const {TextArea} = Input;

const EditModal = ({items_edit, items_upload, resetState, info, selectKey, modal, handleCancel}) => {
    const la = getStoredLanguage();
    const navigate = useNavigate();
    const [changeValue, setChangeValue] = useState(info[selectKey]);

    const editModel = () => {
        const value = {...info, [selectKey]: changeValue};
        const data = {'value': value, 'style': 'edit', 'key': selectKey};
        axios.put(ESTIMATE_URL + "models/" + info.pk, data).then(() => {
            resetState();
            if (selectKey === "name") {
                navigate(`/${changeValue}/detail`);
                window.location.reload();
            }
            console.log("Success Edit");
        }).catch(error => {
            console.error(error);
        });
        handleCancel();
    };

    return (
        <Fragment>
            <Modal title={`${Trans_ModelDetail(la)[selectKey]}`}
                   open={modal}
                   onOk={editModel}
                   onCancel={handleCancel}
                   width={1000}
                   footer={[
                       <Button onClick={handleCancel}>
                           {Trans_ModelDetail(la)['cancel']}
                       </Button>,
                       <Button onClick={editModel} key="submit" type="primary">
                           {Trans_ModelDetail(la)['ok']}
                       </Button>
                   ]}>

                {items_upload.includes(selectKey) &&
                    <TextArea value={changeValue}
                              onChange={e => setChangeValue(e.target.value)}
                              autoSize={{minRows: 3, maxRows: 18}}/>}

                {!items_upload.includes(selectKey) && items_edit.includes(selectKey) &&
                    <Input value={changeValue}
                           onChange={e => setChangeValue(e.target.value)}/>}

            </Modal>
        </Fragment>
    );
}

export default EditModal;
