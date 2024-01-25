export function getStoredLanguage() {
    return localStorage.getItem('la');
}

const Trans_ModelDetail_En = {
    'item': 'Item',
    'value': 'Value',
    'pk': 'Primary Key',
    'name': 'Model Name',
    'description': 'Description',
    'code': 'Code',
    'version': 'Version',
    'owner': 'Owner',
    'created_at': 'Created Time',
    'process': 'Process',
};

const Trans_ModelDetail_Zh = {
    'item': '字段',
    'value': '值',
    'pk': '主键',
    'name': '模型',
    'description': '描述',
    'code': '代码',
    'version': '版本',
    'owner': '作者',
    'created_at': '时间',
    'process': '过程',
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


export const catContent = (content, addContent) => {
    if (content === "") {
        content = addContent;
    } else {
        content = content + "\n" + addContent;
    }
    return content;
}
