
export const WIDTH_MODAL = 1200;


const Trans_ModelList_En = {
    'name': 'Model Name',
    'description': 'Description',
    'owner': 'Owner',
    'operation': 'Operation',
    'edit': 'Edit',
    'detail': 'Detail',
    'delete': 'Delete',
    'want_delete': 'Do you really wanna delete the model?',
    'yes': 'Yes',
    'no': 'No',
    'cannot_delete': 'Cannot delete default model',
    'info': 'Information',
    'detail_info': 'Information',
    'model_info': 'Model Information',
    'feature_info': 'DataSet Information',
    'train': 'Train',
    'test': 'Test',
    'create_model': 'Creating New Model',
    'create': 'Create',
    'name_exist': 'Model name already exists',
    'click_complete': 'Click "Detail" to complete codes and data path',
}

const Trans_ModelList_Zh = {
    'name': '模型',
    'description': '描述',
    'owner': '作者',
    'operation': '操作',
    'edit': '编辑',
    'detail': '详情',
    'delete': '删除',
    'want_delete': '是否确定删除该模型？',
    'yes': '是',
    'no': '否',
    'cannot_delete': '不允许删除默认模型',
    'info': '信息',
    'detail_info': '详细信息',
    'model_info': '模型信息',
    'feature_info': '数据集信息',
    'train': '训练',
    'test': '测试',
    'create_model': '创 建 新 模 型',
    'create': '创建',
    'name_exist': '模型名称已存在',
    'click_complete': '点击“详情”，完善代码与数据路径',
}

export function Trans_ModelList(la) {
    if (la === "en") {
        return Trans_ModelList_En;
    } else if (la === "zh") {
        return Trans_ModelList_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}


const Trans_FeatureList_En = {
    'param': 'Param',
    'description': 'Description',
    'operation': 'Operation',
    'detail': 'Detail',
    'distribution': 'Distribution',
    'location': 'Location',
    'frequency': 'Frequency',
    'source_magnitude': 'Magnitude',
    'source_distance_km': 'Source depth (km)',
    'source_depth_km': 'Epicentral distance (km)',
    'snr_db': 'SNR (dB)',
    'p_arrival_sample': 'P wave arrival time',
    's_arrival_sample': 'S wave arrival time',
    'source_locate': 'Distribution of earthquake source location',
    'value_dist': 'Value Distribution',
    'wait_cal': 'Calculating, please wait a moment',
    'close': 'Close',
}

const Trans_FeatureList_Zh = {
    'param': '参数',
    'description': '描述',
    'operation': '操作',
    'detail': '详情',
    'distribution': '取值分布',
    'location': '位置分布',
    'frequency': '样本频次',
    'source_magnitude': '震级',
    'source_distance_km': '震源深度 (千米)',
    'source_depth_km': '震中距 (千米)',
    'snr_db': '信噪比 (dB)',
    'p_arrival_sample': 'P波到时',
    's_arrival_sample': 'S波到时',
    'source_locate': '震源位置分布',
    'value_dist': '取值分布',
    'wait_cal': '正在计算，请等待',
    'close': '关闭',
}

export function Trans_FeatureList(la) {
    if (la === "en") {
        return Trans_FeatureList_En;
    } else if (la === "zh") {
        return Trans_FeatureList_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}


const Trans_Login_En = {
    'login': 'Login',
    'username': 'Username: ',
    'password': 'Password: ',
}

const Trans_Login_Zh = {
    'login': '登录',
    'username': '用户：',
    'password': '密码：',
}

export function Trans_Login(la) {
    if (la === "en") {
        return Trans_Login_En;
    } else if (la === "zh") {
        return Trans_Login_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}


export const getLeftUserPass = (la) => {
    let left_u = 0;
    let left_p = 0
    if (la === "en") {
        left_u = 20;
        left_p = 28;
    } else if (la === "zh") {
        left_u = 20
        left_p = 20;
    } else {
        throw new Error("Unknown type of 'la', must be 'en' or 'zh'!")
    }
    return {left_u, left_p};
}
