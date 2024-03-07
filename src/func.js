import {ESTIMATE_URL} from "../index";
import axios from "axios";
import {Alert} from "antd";

export function SimpleAlert(className, message, type, onClose) {
    return (
        <Alert className={className}
               message={message}
               closable
               type={type}
               showIcon
               onClose={onClose}/>
    );
}

export function getStoredLanguage() {
    return localStorage.getItem('la');
}

export function getStoredEnv() {
    return localStorage.getItem('env');
}

export function arrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

export const handleModalCancel = (setModal) => {
    setModal(false);
}

export const onCloseAlert = (e, setShowAlert, setMsg) => {
    setShowAlert(false);
    setMsg("");
    console.log(e, "Close Alert.")
};

export const DEFAULT_MODELS = ['MagInfoNet', 'EQGraphNet', 'MagNet', 'CREIME', 'ConvNetQuakeINGV'];
export const DEFAULT_OPTS = ['train', 'test'];

const Trans_ModelDetail_En = {
    'item': 'Item',
    'value': 'Value',
    'opt': 'Opt',
    'pk': 'Primary Key',
    'name': 'Model Name',
    'description': 'Description',
    'version': 'Version',
    'owner': 'Owner',
    'created_at': 'Created Time',
    'situation': 'Situation',
    'library': 'Library',
    'path_data': 'Data Path',
    'code_data': 'Data Code',
    'code_model': 'Model Code',
    'code_train': 'Training Code',
    'code_test': 'Testing Code',
    'code_run': 'Running Code',
    'process': 'Process',
    'edit': 'Edit',
    'upload': 'Upload',
    'run': 'Run',
    'run_wait': 'Please wait for running results',
    'run_success': 'Run successfully',
    'run_fail': 'Run failed, please check the code',
    'run_result': 'Running Result',
    'click_upload': 'Click to Upload',
    'upload_success': 'uploaded successfully',
    'upload_fail': 'upload failed',
    'ok': 'Ok',
    'cancel': 'Cancel',
};

const Trans_ModelDetail_Zh = {
    'item': '字段',
    'value': '值',
    'opt': '操作',
    'pk': '主键',
    'name': '模型',
    'description': '描述',
    'version': '版本',
    'owner': '作者',
    'created_at': '时间',
    'situation': '状态',
    'library': '依赖库',
    'path_data': '数据路径',
    'code_data': '数据代码',
    'code_model': '模型代码',
    'code_train': '训练代码',
    'code_test': '测试代码',
    'code_run': '运行代码',
    'process': '过程',
    'edit': '编辑',
    'upload': '上传',
    'run': '运行',
    'run_wait': '请等待运行结果',
    'run_success': '运行成功',
    'run_fail': '运行失败，请检查代码',
    'run_result': '运行结果',
    'click_upload': '点击上传',
    'upload_success': '上传成功',
    'upload_fail': '上传失败',
    'ok': '确定',
    'cancel': '取消',
};

export function Trans_ModelDetail(la) {
    if (la === "en") {
        return Trans_ModelDetail_En;
    } else if (la === "zh") {
        return Trans_ModelDetail_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}

const Trans_Login_Msg_En = {
    'login_success': 'Login Successful',
    'user_not_exist': 'User does not exist',
    'password_error': 'Password error',
};

const Trans_Login_Msg_Zh = {
    'login_success': '登录成功',
    'user_not_exist': '用户不存在',
    'password_error': '密码错误',
};

export function Trans_Login_Msg(la) {
    if (la === "en") {
        return Trans_Login_Msg_En;
    } else if (la === "zh") {
        return Trans_Login_Msg_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}


const Trans_Home_En = {
    'start': 'Start',
    'acquire': 'Data Acquisition',
    'eq_log': 'Earthquake Catalog',
    'prep': 'Data Preprocessing',
    'eq_data': 'Earthquake DataSet',
    'split': 'Split Dataset',
    'train_set': 'Training set',
    'test_set': 'Testing set',
    'train_start': 'Start Training model, epoch = 1',
    'train_end': 'End Training',
    'test_start': 'Start Testing model',
    'test_end': 'End Testing',
    'data_label': 'Get data and label',
    'in': 'Input data',
    'forward': 'Forward propagation',
    'out': 'Output result',
    'is_end': 'epoch > epochs ?',
    'yes': 'Yes',
    'save': 'Save model weights',
    'no': 'No',
    'func': 'Select loss function',
    'base': 'Based on result and label',
    'loss': 'Calculate loss (error)',
    'backward': 'Based on BP algorithm',
    'update': 'Update model weights',
    'add_epoch': ' epoch += 1 ',
    'end': 'End',
}

const Trans_Home_Zh = {
    'start': '开始',
    'acquire': '数据获取',
    'eq_log': '地震目录',
    'prep': '数据预处理',
    'eq_data': '地震数据集',
    'split': '划分数据集',
    'train_set': '训练集',
    'test_set': '测试集',
    'train_start': '开始训练，epoch = 1',
    'train_end': '结束训练',
    'test_start': '开始测试模型',
    'test_end': '结束测试',
    'data_label': '获取 data 与 label',
    'in': '输入 data',
    'forward': '模型前向传播',
    'out': '输出 result',
    'is_end': 'epoch > epochs ?',
    'yes': '是',
    'save': '保存模型权重',
    'no': '否',
    'func': '选择损失函数',
    'base': '基于 result 与 label',
    'loss': '计算损失（误差）',
    'backward': '基于反向传播算法',
    'update': '更新模型权重',
    'add_epoch': ' epoch += 1 ',
    'end': '结束',
}

export function Trans_Home(la) {
    if (la === "en") {
        return Trans_Home_En;
    } else if (la === "zh") {
        return Trans_Home_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}


export const catContent = (content, addContent) => {
    if (content === "") {
        content = addContent;
    } else {
        content = content + "\n" + addContent;
    }
    return content;
}


export const clearProcess = async (model_name) => {
    return new Promise((resolve, reject) => {
        axios.put(`${ESTIMATE_URL}${model_name}/process`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}


export const getEnvNames = (setEnvNames) => {
    axios.get(ESTIMATE_URL + "conda").then(response => {
        const envs_name = response.data.map(item => {
            return item['env'];
        })
        setEnvNames(envs_name);
    }).catch(error => {
        console.error(error);
    })
};
