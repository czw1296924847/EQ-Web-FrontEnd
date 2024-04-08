import {ErrorLa} from "../func";


export const DEFAULT_CITIES = [
"北京", "上海", "天津", "重庆", "哈尔滨", "长春", "沈阳", "呼和浩特",
"石家庄", "太原", "西安", "济南", "乌鲁木齐", "拉萨", "西宁", "兰州",
"银川", "郑州", "南京", "武汉", "杭州", "合肥", "福州", "南昌",
"长沙", "贵阳", "成都", "广州", "昆明", "南宁", "海口", "香港",
"九龙", "新界", "中环", "铜锣湾", "澳门", "台北县",
];


const Trans_Weather_En = {
    'date': 'Date',
    'temp': 'Temperature',
    'win': 'Wind',
    'win_s': 'Wind Scale',
    'ppt': 'Precipitation',
    'humid': 'Relative Humidity',

    'history24hour': 'Past 24 Hours',
    'future7day': 'Future 7 Days',

    'select_city': 'Select Cities',
}

const Trans_Weather_Zh = {
    'date': '日期',
    'temp': '温度',
    'win': '风向',
    'win_s': '风级',
    'ppt': '降水量',
    'humid': '相对湿度',

    'history24hour': '过去24小时',
    'future7day': '未来7天',

    'select_city': '请选择城市',
}

export function Trans_Weather(la) {
    if (la === "en") {
        return Trans_Weather_En;
    } else if (la === "zh") {
        return Trans_Weather_Zh;
    } else {
        throw new ErrorLa(la);
    }
}


const Trans_NavMenu_En = {
    'title': 'Wea-Web',
    'sub-title': 'A Web Framework for Weather Forecast',
    'setting': 'Setting',
    'la': 'Language',
    'en': 'English',
    'zh': 'Chinese',
    'logout': 'Logout',
}

const Trans_NavMenu_Zh = {
    'title': 'Wea-Web',
    'sub-title': '在线天气预报系统',
    'setting': '设置',
    'la': '语言',
    'en': '英文',
    'zh': '中文',
    'env': '环境',
    'logout': '退出',
}

export function Trans_NavMenu(la) {
    if (la === "en") {
        return Trans_NavMenu_En;
    } else if (la === "zh") {
        return Trans_NavMenu_Zh;
    } else {
        throw new ErrorLa(la);
    }
}
