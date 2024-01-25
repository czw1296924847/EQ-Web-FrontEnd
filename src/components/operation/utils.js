import {ESTIMATE_URL} from "../../index";
import {Button, Tooltip} from 'antd';
import axios from "axios";
import {Trans_ModelList} from "../home/utils";
import "../home/list/ModelList.css";
import {catStr, getParam, getParams, isExistRecord} from "./OptParam";
import {catContent} from "../func";

export const WIDTH_OUTPUT_LONG = "1000px";
export const WIDTH_PLOT = 600;


const TRAIN_COL_PARAM_SHORT = 6;
const TRAIN_COL_PARAM_LONG = 12

const TRAIN_COL_RESULT_SHORT = 6;
const TRAIN_COL_RESULT_LONG = 24;

const TRAIN_WIDTH_INPUT_SHORT = "200px";
const TRAIN_WIDTH_INPUT_LONG = "700px";

const TRAIN_WIDTH_OUTPUT_SHORT = "200px";


const TEST_COL_PARAM_SHORT = 6;
const TEST_COL_PARAM_LONG = 12;

const TEST_COL_RESULT_SHORT = 6;
const TEST_COL_RESULT_STATUS = 24;

const TEST_WIDTH_INPUT_SHORT = "200px";
const TEST_WIDTH_INPUT_LONG = "700px";

const TEST_WIDTH_OUTPUT_SHORT = "200px";

const NUM_TRAIN_INPUT = 9;
const NUM_TRAIN_OUTPUT = 5;
const NUM_TEST_INPUT = 5;
const NUM_TEST_OUTPUT = 5;


export const INFOS = ["home", "inform"]
export const OPTS = ["train", "test"];
export const OPTSTYLES = ["record", "result"];


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
    'go_detail_page': 'Go Detail Page',
    'go_train_page': 'Go Training Page',
    'go_test_page': 'Go Testing Page',
    'go_info_page': 'Go Information Page',
    'train': 'Train',
    'test': 'Test',
    'training': 'Training',
    'testing': 'Testing',
    'result': 'Result',
    'record': 'Record',
    'not_found_train': 'The model has not been trained!',
    'epoch': 'Epoch',
    'rmse': 'RMSE',
    'r2': 'R2',
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
    'go_detail_page': '前往详情页面',
    'go_train_page': '前往训练页面',
    'go_test_page': '前往测试页面',
    'go_info_page': '前往信息页面',
    'train': '训练',
    'test': '测试',
    'training': '训练',
    'testing': '测试',
    'result': '结果',
    'record': '记录',
    'not_found_train': '模型尚未训练！',
    'epoch': '轮数',
    'rmse': '均方根误差',
    'r2': '决定系数',
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
    'process': 'Process',
};

const Trans_Model_Output_Label_Zh = {
    'r2': '决定系数',
    'rmse': '均方根误差',
    'e_mean': '误差平均值',
    'e_std': '误差标准差',
    'pred': '估计震级',
    'true': '真实震级',
    'process': '过程',
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
    'want_delete': 'Do you really wanna delete the record?',
    'yes': 'Yes',
    'no': 'No',
};

const Trans_OptRecordForm_Zh = {
    'train_ratio': '训练集比例',
    'data_size': '样本数量',
    'sm_scale': '震级类型',
    'chunk_name': '数据集',
    'operation': '操作',
    'want_delete': '是否确定删除该项记录？',
    'yes': '是',
    'no': '否',
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


const Trans_OptResult_En = {
    'comp': 'Result',
    'loss': 'Loss',
    'compare_title': 'Compare True and Predicted Magnitude',
    'loss_title': 'Mean Squared Loss during Training',
    'true': 'True Magnitude',
    'pred': 'Predicted Magnitude',
    'epochs': 'Epochs',
    'run': 'Run',
    'start_run_train': 'Start Training',
    'start_run_test': 'Start Testing',
    'start_comp': 'Plot the true and predicted magnitudes',
    'start_loss': 'Plot the loss during training',
    'train_record_not': 'Training record does not exist',
    'test_record_not': 'Testing record does not exist',
}

const Trans_OptResult_Zh = {
    'comp': '结果',
    'loss': '损失',
    'compare_title': '真实震级与估计震级的比较',
    'loss_title': '训练期间的均方误差',
    'true': '真实震级',
    'pred': '估计震级',
    'epochs': '迭代轮数',
    'run': '运行',
    'start_run_train': '开始训练',
    'start_run_test': '开始测试',
    'start_comp': '绘制真实震级与估计震级',
    'start_loss': '绘制训练期间的损失',
    'train_record_not': '训练记录不存在',
    'test_record_not': '测试记录不存在',
}

export function Trans_OptResult(la) {
    if (la === "en") {
        return Trans_OptResult_En;
    } else if (la === "zh") {
        return Trans_OptResult_Zh;
    } else {
        throw new Error("Unknown type of 'la'!");
    }
}


export function getSpanInput(i, len, style) {
    if (style === "train") {
        if (i < NUM_TRAIN_INPUT) {
            return TRAIN_COL_PARAM_SHORT;
        } else {
            return TRAIN_COL_PARAM_LONG
        }
    } else if (style === "test") {
        if (i < NUM_TEST_INPUT) {
            return TEST_COL_PARAM_SHORT;
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
        } else {
            return TRAIN_WIDTH_INPUT_LONG;
        }
    } else if (style === "test") {
        if (i < NUM_TEST_INPUT) {
            return TEST_WIDTH_INPUT_SHORT;
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
        } else {
            return TRAIN_COL_RESULT_LONG;
        }
    } else if (style === "test") {
        if (i < NUM_TEST_OUTPUT) {
            return TEST_COL_RESULT_SHORT;
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
        } else {
            return WIDTH_OUTPUT_LONG;
        }
    } else if (style === "test") {
        if (i < NUM_TEST_OUTPUT) {
            return TEST_WIDTH_OUTPUT_SHORT;
        } else {
            return WIDTH_OUTPUT_LONG;
        }
    } else {
        throw new Error("Unknown 'style', must be 'train' or 'test'!");
    }
}

export function TrainTest(str) {
    return str === 'train' ? 'test' : 'train';
}

export function isInRecord(record, params) {
    const keys = Object.keys(record);
    return keys.every(key => params.find(item => item.name === key && item.value === record[key]));
}

export function getStateValue(metrics, responseData) {
    const desiredKeys = metrics.map(metric => metric.name);
    return desiredKeys.map(key => ({name: key, value: responseData[key]}));
}

export function splitProcess(process) {
    if (process === "") return "";
    const pairs = process.split(',').map(pair => pair.split(':'));
    return pairs.reduce((res, [key, value]) => ({...res, [key]: value}), {});
}


export function tranProcess(process, la) {
    return `${Trans_OptParam(la)['epoch']}  =  ${process['epoch']}\t\t${Trans_OptParam(la)['rmse']}  =  ${process['rmse']}\t\t${Trans_OptParam(la)['r2']}  =  ${process['r2']}`;
}


export function UrlButton(getModelUrl, la, model_name, toPath, class_name, style) {
    return (
        <Tooltip title={Trans_OptParam(la)[`go_${toPath}_page`]}>
            <Button className={class_name} size={"large"} style={style}>
                <span className="ModelList-Button-Label"
                      onClick={() => getModelUrl(model_name, toPath)}>
                    {Trans_ModelList(la)[toPath]}
                </span>
            </Button>
        </Tooltip>
    )
}

export function OptButton(onClick, la, opt, class_name, style, doStyle) {
    let tooltip = doStyle;
    if (doStyle === "run") {
        tooltip = doStyle + `_${opt}`;
    }

    return (
        <Tooltip title={Trans_OptResult(la)[`start_${tooltip}`]}>
            <Button className={class_name} size={"large"} style={style}>
                <span className="ModelList-Button-Label"
                      onClick={onClick}>
                    {Trans_OptResult(la)[doStyle]}
                </span>
            </Button>
        </Tooltip>
    )
}
