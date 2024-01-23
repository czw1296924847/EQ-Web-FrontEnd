
const Trans_NavMenu_En = {
    'title': 'EQ-Web',
    'sub-title': 'A Web Framework for Earthquake Magnitude Estimation',
    'overview': 'Overview',
    'information': 'Information',
    'model': 'Model',
    'operation': 'Operation',
    'train': 'Train',
    'test': 'Test',
    'setting': 'Setting',
    'la': 'Language',
    'en': 'English',
    'zh': 'Chinese',
    'logout': 'Logout',
}

const Trans_NavMenu_Zh = {
    'title': 'EQ-Web',
    'sub-title': '在线震级估计模型',
    'overview': '概述',
    'information': '信息',
    'model': '模型',
    'operation': '操作',
    'train': '训练',
    'test': '测试',
    'setting': '设置',
    'la': '语言',
    'en': '英文',
    'zh': '中文',
    'logout': '退出',
}

const Trans_SubNavMenu_En = {
    'param': 'Params',
    'result': 'Result',
    'record': 'Record',
    'factor': 'Factor',
}

const Trans_SubNavMenu_Zh = {
    'param': '参数',
    'result': '结果',
    'record': '记录',
    'factor': '因素',
}


export function Trans_NavMenu(la) {
    if (la === "en") {
        return Trans_NavMenu_En;
    } else if (la === "zh") {
        return Trans_NavMenu_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}

export function Trans_SubNavMenu(la) {
    if (la === "en") {
        return Trans_SubNavMenu_En;
    } else if (la === "zh") {
        return Trans_SubNavMenu_Zh;
    } else {
        throw new Error(`Unknown type of 'la'! ${la}`);
    }
}
