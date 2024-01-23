import {ESTIMATE_URL} from "../../index";
import {useContext} from "react";
import LanguageContext from "../LanguageContext";
import axios from "axios";

const TRAIN_COL_PARAM_SHORT = 6;
const TRAIN_COL_PARAM_MID = 9;
const TRAIN_COL_PARAM_LONG = 12

const TRAIN_COL_RESULT_SHORT = 6;
const TRAIN_COL_RESULT_LONG = 24;
const TRAIN_COL_RESULT_STATUS = 24;

const TRAIN_WIDTH_INPUT_SHORT = "200px";
const TRAIN_WIDTH_INPUT_MID = "400px";
const TRAIN_WIDTH_INPUT_LONG = "700px";

const TRAIN_WIDTH_OUTPUT_SHORT = "200px";
export const TRAIN_WIDTH_OUTPUT_LONG = "1000px";


const TEST_COL_PARAM_SHORT = 6;
const TEST_COL_PARAM_MID = 9;
const TEST_COL_PARAM_LONG = 12;

const TEST_COL_RESULT_SHORT = 6;
const TEST_COL_RESULT_LONG = 24;
const TEST_COL_RESULT_STATUS = 24;

const TEST_WIDTH_INPUT_SHORT = "200px";
const TEST_WIDTH_INPUT_MID = "400px";
const TEST_WIDTH_INPUT_LONG = "700px";

const TEST_WIDTH_OUTPUT_SHORT = "200px";
export const TEST_WIDTH_OUTPUT_LONG = "1000px";
export const WIDTH_PLOT = 600;


const NUM_TRAIN_INPUT = 10;
const NUM_TRAIN_OUTPUT = 5;
const NUM_TEST_INPUT = 6;
const NUM_TEST_OUTPUT = 5;


export const INFOS = ["home", "inform"]
export const OPTS = ["train", "test"];
export const STYLES = ["record", "result"];


const Trans_OptParam_En = {
    'input_param': 'Input Param:',
    'output_param': 'Output Result:',
    'run': 'Run',
    'start_train': 'Training starts, wait a moment',
    'start_test': 'Testing starts, wait a moment',
    'overwrite_train': 'Training record already exists, overwrite it?',
    'overwrite_test': 'Testing record already exists, overwrite it?',
    'wait_train': 'Please wait training end!',
    'wait_test': 'Please wait testing end!',
    'start': 'Start',
    'end': 'End',
    'unknown_error': 'Unknown Error!',
    'train_error': 'Training Error',
    'test_error': 'Training Error',
};

const Trans_OptParam_Zh = {
    'input_param': '输入参数：',
    'output_param': '输出结果：',
    'run': '运行',
    'start_train': '训练开始，请等待',
    'start_test': '测试开始，请等待',
    'overwrite_train': '训练记录已存在，是否覆盖？',
    'overwrite_test': '测试记录已存在，是否覆盖？',
    'wait_train': '请等待训练结束！',
    'wait_test': '请等待测试结束',
    'start': '开始',
    'end': '结束',
    'unknown_error': '未知错误！',
    'train_error': '训练错误',
    'test_error': '测试错误',
};

export function Trans_OptParam(la) {
    if (la === "en") {
        return Trans_OptParam_En;
    } else if (la === "zh") {
        return Trans_OptParam_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}


const Trans_ModelTrain_Input_Label_En = {
    'device': 'Device',
    'lr': 'Learning Rate',
    'batch_size': 'Batch Size',
    'epochs': 'Epochs',
    'train_ratio': 'Train Ratio',
    'data_size': 'Data Size',
    'sm_scale': 'Magnitude Scale',
    'chunk_name': 'Chunk Name',
    // 'root': 'Data Address',
    // 're_ad': 'Result Address',
};

const Trans_ModelTrain_Input_Label_Zh = {
    'device': '计算设备',
    'lr': '学习率',
    'batch_size': '批次数量',
    'epochs': '迭代次数',
    'train_ratio': '训练集比例',
    'data_size': '样本数量',
    'sm_scale': '震级类型',
    'chunk_name': '数据集',
};

export function Trans_ModelTrain_Input_Label(la) {
    if (la === "en") {
        return Trans_ModelTrain_Input_Label_En;
    } else if (la === "zh") {
        return Trans_ModelTrain_Input_Label_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}


const Trans_ModelTest_Input_Label_En = {
    'device': 'Device',
    'train_ratio': 'Train Ratio',
    'data_size': 'Data Size',
    'sm_scale': 'Magnitude Scale',
    'chunk_name': 'Chunk Name',
};

const Trans_ModelTest_Input_Label_Zh = {
    'device': '计算设备',
    'train_ratio': '训练集比例',
    'data_size': '样本数量',
    'sm_scale': '震级类型',
    'chunk_name': '数据集',
};

export function Trans_ModelTest_Input_Label(la) {
    if (la === "en") {
        return Trans_ModelTest_Input_Label_En;
    } else if (la === "zh") {
        return Trans_ModelTest_Input_Label_Zh;
    } else {
        throw new Error("Unknown type of 'la'!");
    }
}


const Trans_Model_Output_Label_En = {
    'r2': 'R2',
    'rmse': 'RMSE',
    'e_mean': 'Error Mean',
    'e_std': 'Error Std',
    'pred': 'Predicted Magnitude',
    'true': 'True Magnitude',
    'situation': 'Situation',
};

const Trans_Model_Output_Label_Zh = {
    'r2': '决定系数',
    'rmse': '均方根误差',
    'e_mean': '误差平均值',
    'e_std': '误差标准差',
    'pred': '估计震级',
    'true': '真实震级',
    'situation': '状态',
};

export function Trans_Model_Output_Label(la) {
    if (la === "en") {
        return Trans_Model_Output_Label_En;
    } else if (la === "zh") {
        return Trans_Model_Output_Label_Zh;
    } else {
        throw new Error("Unknown type of 'la'!");
    }
}


const Trans_OptRecordForm_En = {
    'train_ratio': 'Train Ratio',
    'data_size': 'Data Size',
    'sm_scale': 'Magnitude Scale',
    'chunk_name': 'Chunk Name',
    'operation': 'Operation',
};

const Trans_OptRecordForm_Zh = {
    'train_ratio': '训练集比例',
    'data_size': '样本数量',
    'sm_scale': '震级类型',
    'chunk_name': '数据集',
    'operation': '操作',
};

export function Trans_OptRecordForm(la) {
    if (la === "en") {
        return Trans_OptRecordForm_En;
    } else if (la === "zh") {
        return Trans_OptRecordForm_Zh;
    } else {
        throw new Error("Unknown type of 'la'!");
    }
}


export function getSpanInput(i, len, style) {
    if (style === "train") {
        if (i < NUM_TRAIN_INPUT) {
            return TRAIN_COL_PARAM_SHORT;
        } else if (i === NUM_TRAIN_INPUT) {
            return TRAIN_COL_PARAM_MID;
        } else {
            return TRAIN_COL_PARAM_LONG
        }
    } else if (style === "test") {
        if (i < NUM_TEST_INPUT) {
            return TEST_COL_PARAM_SHORT;
        } else if (i === NUM_TEST_INPUT) {
            return TEST_COL_PARAM_MID;
        } else {
            return TEST_COL_PARAM_LONG
        }
    } else {
        throw new Error("Unknown 'style', must be 'train' or 'test'!");
    }
}

export function getWidthInput(i, len, style) {
    if (style === "train") {
        if (i < NUM_TRAIN_INPUT) {
            return TRAIN_WIDTH_INPUT_SHORT;
        } else if (i === NUM_TRAIN_INPUT) {
            return TRAIN_WIDTH_INPUT_MID;
        } else {
            return TRAIN_WIDTH_INPUT_LONG;
        }
    } else if (style === "test") {
        if (i < NUM_TEST_INPUT) {
            return TEST_WIDTH_INPUT_SHORT;
        } else if (i === (NUM_TEST_INPUT)) {
            return TEST_WIDTH_INPUT_MID;
        } else {
            return TEST_WIDTH_INPUT_LONG;
        }
    } else {
        throw new Error("Unknown 'style', must be 'train' or 'test'!");
    }
}

export function getSpanOutput(i, len, style) {
    if (style === "train") {
        if (i < NUM_TRAIN_OUTPUT) {
            return TRAIN_COL_RESULT_SHORT;
        } else if (i === NUM_TRAIN_OUTPUT) {
            return TRAIN_COL_RESULT_LONG;
        } else {
            return TRAIN_COL_RESULT_STATUS;
        }
    } else if (style === "test") {
        if (i < NUM_TEST_OUTPUT) {
            return TEST_COL_RESULT_SHORT;
        } else if (i === NUM_TEST_OUTPUT) {
            return TEST_COL_RESULT_LONG;
        } else {
            return TEST_COL_RESULT_STATUS;
        }
    } else {
        throw new Error("Unknown 'style', must be 'train' or 'test'!");
    }
}

export function getWidthOutput(i, len, style) {
    if (style === "train") {
        if (i < NUM_TRAIN_OUTPUT) {
            return TRAIN_WIDTH_OUTPUT_SHORT;
        } else if (i === NUM_TRAIN_OUTPUT) {
            return TRAIN_WIDTH_OUTPUT_LONG;
        } else {
            return TRAIN_WIDTH_OUTPUT_LONG;
        }
    } else if (style === "test") {
        if (i < NUM_TEST_OUTPUT) {
            return TEST_WIDTH_OUTPUT_SHORT;
        } else if (i === NUM_TEST_OUTPUT) {
            return TEST_WIDTH_OUTPUT_LONG;
        } else {
            return TEST_WIDTH_OUTPUT_LONG;
        }
    } else {
        throw new Error("Unknown 'style', must be 'train' or 'test'!");
    }
}

export function UpperFirst(str) {
    if (str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function TrainTest(str) {
    return str === 'train' ? 'test' : 'train';
}

export function tran_word(str) {
    if (OPTS.includes(str)) {
        return UpperFirst(str) + 'ing';
    } else if (['result'].includes(str)) {
        return UpperFirst(str);
    } else {
        throw new Error("Unknown 'str'")
    }
}

export function isInRecord(record, params) {
    const keys = Object.keys(record);
    return keys.every(key => params.find(item => item.name === key && item.value === record[key]));
}

export function replaceOpt(opt, url, style) {
    if (!['train', 'test'].includes(opt)) {
        throw new Error("Unknown type of 'opt', must be 'train' or 'test'!");
    }
    if (style === "param") {
        url[url.length - 1] = opt === 'train' ? 'test' : 'train';
    } else if (STYLES.includes(style)) {
        url[url.length - 2] = opt === 'train' ? 'test' : 'train';
    } else {
        throw new Error("Unknown type of 'style'!")
    }
    return url.slice(1).join('/');
}

export function checkRecord(model_name, opt, params, la) {

    return new Promise((resolve, reject) => {
        axios.get(ESTIMATE_URL + model_name + "/" + opt).then(response => {
            let shouldContinue = true;
            let hasMatchedRecord = false;
            response.data.some(infos => {
                if (infos.model_name === model_name) {
                    hasMatchedRecord = infos.record.some(record => {
                        if (isInRecord(record, params)) {
                            shouldContinue = window.confirm(Trans_OptParam(la)[`overwrite_${opt}`]);
                            return true;
                        }
                        return false;
                    });
                    return true;
                }
                return false;
            });
            resolve(shouldContinue);
        }).catch(error => {
            reject(error);
        });
    });
}

export function getStateValue(metrics, responseData) {
    const desiredKeys = metrics.map(metric => metric.name);
    return desiredKeys.map(key => ({name: key, value: responseData[key]}));
}
