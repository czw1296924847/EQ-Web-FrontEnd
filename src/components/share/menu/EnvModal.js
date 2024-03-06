import {Fragment, useContext, useEffect, useState} from "react";
import {Modal, Table} from 'antd';
import axios from "axios";

import LanguageContext from "../../LanguageContext";
import EnvContext from "../../EnvContext";
import {Trans_NavMenu} from "../utils";
import {ESTIMATE_URL} from "../../../index";
import {SimpleAlert, onCloseAlert} from "../../func";
import "../../Alert.css";

const EnvModal = ({envModal, handleCancel}) => {
    const {la, setLa} = useContext(LanguageContext);
    const {env, setEnv} = useContext(EnvContext);
    const [lib, setLib] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getEnvInfo();
    }, []);

    const getEnvInfo = () => {
        setMsg(Trans_NavMenu(la)['load_env']);
        setShowAlert(true);
        setTypeAlert("info");

        axios.get(ESTIMATE_URL + `conda?env=${env}`).then(response => {
            const lib = response.data['lib'].map((item, index) => {
                return {
                    key: (index + 1).toString(),
                    name: item.name,
                    version: item.version,
                }
            })
            setShowAlert(false);
            // setMsg(Trans_NavMenu(la)['load_success']);
            setTypeAlert("success");
            setLib(lib);
        }).catch(error => {
            setMsg(Trans_NavMenu(la)['load_fail']);
            setTypeAlert("error");
            console.error(error);
        })
    }

    const columns = [
        {
            title: Trans_NavMenu(la)['lib_name'],
            dataIndex: 'name',
            key: 'name',
            width: 250,
        },
        {
            title: Trans_NavMenu(la)['lib_version'],
            dataIndex: 'version',
            key: 'version',
            width: 250,
        }
    ];

    if (showAlert) {
        return (
            SimpleAlert("Env-Alert", msg, typeAlert, (e) => onCloseAlert(e, setShowAlert, setMsg))
        )
    } else {
        return (
            <Fragment>
                <Modal title={`${Trans_NavMenu(la)['python_lib']}`}
                       open={envModal}
                       onCancel={handleCancel}
                       width={600}
                       footer={null}
                       style={{top: 25}}>

                    <Table columns={columns}
                           dataSource={lib}
                           pagination={{pageSize: 8, total: lib.length}}/>
                </Modal>
            </Fragment>
        );
    }
}

export default EnvModal;
