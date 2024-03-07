import {Fragment, useEffect, useState} from "react";
import {Input, Modal} from 'antd';
import axios from "axios";

import {
    SimpleAlert, catContent, clearProcess, Trans_ModelDetail, onCloseAlert, getStoredLanguage,
    DEFAULT_MODELS,
} from "../../func";
import {ESTIMATE_URL} from "../../../index";
import "../../Alert.css";

const {TextArea} = Input;


const RunModal = ({items_upload, resetState, info, selectKey, modal, handleCancel}) => {
    const la = getStoredLanguage();
    const [changeValue, setChangeValue] = useState();
    const [msg, setMsg] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const [isEnd, setIsEnd] = useState(true);

    useEffect(() => {
        runModal().then(r => {
        });
    }, [])

    let interval = null;
    let epoch = 0;
    let content = "";
    let waitTime = 5000;
    let processCalls = 0;
    const isDefaultModel = DEFAULT_MODELS.includes(info['name']);

    useEffect(() => {
        if (selectKey === 'code_run' && isDefaultModel) {
            resetProcess()
        }
    }, [isEnd]);

    const resetProcess = () => {
        if (!isEnd) {
            // clearInterval(interval);
            interval = setInterval(getProcess, waitTime);
            processCalls = 0;
            getProcess();
        }
    }

    const getProcess = () => {
        let process = null;
        processCalls++;

        axios.get(ESTIMATE_URL + `${info['name']}` + "/process").then(response => {
            process = stringToDict(response.data);
            if (isEnd) return null;
            if (content === "") {                               // start training and the first epoch
                content = catContent(content, dictToString(process));
            } else if (response.data.includes('#Done')) {              // the last epoch
                content = catContent(content, dictToString(stringToDict(response.data.split('#')[0])));
                setIsEnd(true);
                clearInterval(interval);
            } else if (process['Epoch'] === (epoch + 1)) {      // still in this epoch
                content = catContent(content, dictToString(process));
                epoch = epoch + 1;

                // // Update waitTime
                // waitTime = waitTime * (processCalls - 1);
                // clearInterval(interval);
                // interval = setInterval(getProcess, waitTime);
            }
            setChangeValue(content);
        }).catch(error => {
            console.log(error);
        })
    }

    const stringToDict = (string) => {
        if (string === "") return {};
        const pairs = string.split(',');
        const dict = {};
        for (let i = 0; i < pairs.length; i += 1) {
            const pair = pairs[i].split(':');
            if (pair[0] === 'Epoch') {
                dict[pair[0]] = parseInt(pair[1]);
            } else {
                dict[pair[0]] = parseFloat(pair[1]);
            }
        }
        return dict;
    }

    const dictToString = (dict) => {
        return Object.entries(dict)
            .map(([key, value]) => {
                if (key === 'Epoch') {
                    return `${key}: ${value.toString().padStart(4, '0')}`;
                } else if (typeof value === 'number') {
                    return `${key}: ${value.toFixed(4)}`;
                } else {
                    return `${key}: ${value}`;
                }
            }).join('          ');
    }

    const runModal = async () => {
        setIsEnd(false);        // Start monitoring the train process
        await clearProcess(info['name']);

        setShowAlert(true);
        setTypeAlert("info");
        setMsg(Trans_ModelDetail(la)['run_wait']);
        const idx = items_upload.indexOf(selectKey);
        const depends = items_upload.slice(0, idx + 1);

        const data = {'name': info['name'], 'depends': depends};
        axios.post(ESTIMATE_URL + "run", data).then(response => {
            setTypeAlert("success");
            setMsg(Trans_ModelDetail(la)['run_success']);
            resetState();
            if (selectKey !== 'code_run' || !isDefaultModel) {
                setChangeValue(response.data);
            }
            console.log(response.data)
        }).catch(error => {
            setTypeAlert("error");
            setMsg(Trans_ModelDetail(la)['run_fail']);
            setChangeValue(error.response.data);
            console.error(error);
        })
    };

    return (
        <Fragment>
            <Modal title={`${Trans_ModelDetail(la)['run_result']}`}
                   open={modal}
                   onCancel={handleCancel}
                   width={1000}
                   footer={null}>

                <TextArea value={changeValue}
                          autoSize={{minRows: 3, maxRows: 18}}/>

                {showAlert && SimpleAlert("ModelDetail-Wait-Alert", msg, typeAlert, (e) => onCloseAlert(e, setShowAlert, setMsg))}
            </Modal>
        </Fragment>
    );
}

export default RunModal;
