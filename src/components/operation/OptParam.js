import React, {useContext} from "react";
import {Col, Input, Tooltip, Select, InputNumber, ConfigProvider,} from 'antd';
import {
    getSpanInput, getSpanOutput, getWidthInput, getWidthOutput,
    UpperFirst, replaceOpt, TrainTest, tran_word, Trans_Model_Output_Label,
    Trans_ModelTrain_Input_Label, Trans_ModelTest_Input_Label, Trans_OptParam,
    TRAIN_WIDTH_OUTPUT_LONG, STYLES,
} from "./utils";
import "../share/MyLayout.css";
import "./Opt.css";
import LanguageContext from "../LanguageContext";


const OptParam = () => {
    return (
        <div>

        </div>
    );
}
export default OptParam;


export const onCloseAlert = (e, setShowAlert, setStatus, setSituation) => {
    setShowAlert(false);
    setStatus("");
    setSituation("");
    console.log(e, "Close Train Alert.")
}

export const catStr = (str, num = 20) => {
    return '='.repeat(num) + `  ${str}  ` + "=".repeat(num);
};

// export const handleInputChange = (e, index, params, setParams) => {
//     const value = e.target.value;
//     const newParams = [...params];
//     newParams[index - 1] = {...newParams[index - 1], value};
//     setParams(newParams);
// }

export const getParams = (params) => {
    return params.reduce((acc, info) => {
        acc[info.name] = info.value;
        return acc;
    }, {});
}

export const resetResults = (results, setResults, setSituation) => {
    setResults(results.map(result => ({
        ...result,
        value: "",
    })));
    setSituation("");
}

export const resetSituation = (status, setSituation, la) => {
    if (status === "") {
        setSituation("");
    } else {
        setSituation('='.repeat(20) + `  ${Trans_OptParam(la)[status]}  ` + "=".repeat(20));
    }
};


export const OptTitle = ({model_name, opt, url, style, onClick}) => {
    const {la, _} = useContext(LanguageContext);
    const size = (style === "param") ? 150 : 50;

    return (
        <div className="Opt-Title"  style={{paddingRight: `${size + 30}px`}}>
            <h1 style={{textAlign: 'center', flex: 1}}>
                <span className="MyLayout-H1-Model">{model_name} </span>
                <Tooltip title={`Go ${UpperFirst(TrainTest(opt))}ing page`}
                         color={'magenta'}>
                    <a className="MyLayout-H1-Opt"
                       href={`/${replaceOpt(opt, url, style)}`}>{tran_word(opt)} </a>
                </Tooltip>
                {STYLES.includes(style)
                    && <span className="MyLayout-H1-Inform">{UpperFirst(style)}</span>}
            </h1>
            {style === "param"
                && <button className="Opt-Train-Button" style={{marginLeft: `-${size}px`}}
                           onClick={onClick}>{Trans_OptParam(la)['run']}</button>}
        </div>
    );
}


export const OptInput = ({params, opt, la, offset}) => {
    const height = 40;
    const fontSize = `${20}px`;

    return (
        Array.from({length: params.length}, (_, index) => index + offset).map((i) => (
            <Col span={getSpanInput(i, params.length, opt)} key={i}>
                <ConfigProvider theme={{
                    token: {fontSize: fontSize},
                    components: {
                        Select: {optionFontSize: fontSize, optionPadding: '7px'},
                        Input: {paddingBlock: '3px',},
                        InputNumber: {paddingBlock: '3px',},
                    },
                }}>
                    <label className="Model-Label" htmlFor={`input${i}`}>
                        {opt === "train" && Trans_ModelTrain_Input_Label(la)[params[i - 1]?.name]}
                        {opt === "test" && Trans_ModelTest_Input_Label(la)[params[i - 1]?.name]}
                    </label>
                    {params[i - 1]?.name === 'device' &&
                        <Select style={{width: getWidthInput(i, params.length, opt), height: height}}
                                options={[
                                    {value: 'cpu', label: 'cpu'},
                                    {value: 'cuda:0', label: 'cuda:0'},
                                    {value: 'cuda:1', label: 'cuda:1'}
                                ]}
                                defaultValue={params[i - 1]?.value}/>}

                    {params[i - 1]?.name === 'lr'
                        && <InputNumber style={{width: getWidthInput(i, params.length, opt), height: height}}
                                        min="0.00001"
                                        max="0.1"
                                        step="0.0001"
                                        defaultValue={params[i - 1]?.value}/>}

                    {params[i - 1]?.name === 'batch_size'
                        && <Select style={{width: getWidthInput(i, params.length, opt), height: height}}
                                   options={[
                                       {value: '1', label: '1'},
                                       {value: '8', label: '8'},
                                       {value: '16', label: '16'},
                                       {value: '32', label: '32'},
                                       {value: '64', label: '64'},
                                       {value: '128', label: '128'},
                                       {value: '256', label: '256'},
                                   ]}
                                   defaultValue={params[i - 1]?.value}/>}

                    {params[i - 1]?.name === 'epochs'
                        && <InputNumber style={{width: getWidthInput(i, params.length, opt), height: height}}
                                        min="1"
                                        max="100"
                                        step="1"
                                        defaultValue={params[i - 1]?.value}/>}

                    {params[i - 1]?.name === 'train_ratio'
                        && <InputNumber style={{width: getWidthInput(i, params.length, opt), height: height}}
                                        min="0.05"
                                        max="0.95"
                                        step="0.05"
                                        defaultValue={params[i - 1]?.value}/>}

                    {params[i - 1]?.name === 'data_size'
                        && <InputNumber style={{width: getWidthInput(i, params.length, opt), height: height}}
                                        min="100"
                                        max="200000"
                                        step="1000"
                                        defaultValue={params[i - 1]?.value}/>}

                    {params[i - 1]?.name === 'sm_scale'
                        && <Select style={{width: getWidthInput(i, params.length, opt), height: height}}
                                   options={[
                                       {value: 'ml', label: 'ml'},
                                       {value: 'md', label: 'md'},
                                   ]}
                                   defaultValue={params[i - 1]?.value}/>}

                    {params[i - 1]?.name === 'chunk_name'
                        && <Select style={{width: getWidthInput(i, params.length, opt), height: height}}
                                   options={[
                                       {value: 'chunk2', label: 'chunk2'},
                                       {value: 'chunk3', label: 'chunk3'},
                                       {value: 'chunk4', label: 'chunk4'},
                                   ]}
                                   defaultValue={params[i - 1]?.value}/>}
                </ConfigProvider>
            </Col>
        ))
    );
}


export const OptOutput = ({results, opt, la, offset}) => {
    return (
        Array.from({length: results.length}, (_, index) => index + offset).map((i) => (
            <Col span={getSpanOutput(i, results.length, opt)} key={i}>
                <label className="Model-Label" htmlFor={`output${i}`}>
                    {Trans_Model_Output_Label(la)[results[i - 1]?.name]}</label>
                {<Input className="Model-Output"
                        id={`output${i}`}
                        style={{width: getWidthOutput(i, results.length, opt)}}
                        name={results[i - 1]?.name}
                        value={results[i - 1]?.value}
                />}
            </Col>
        ))
    );
}

export const OptSituation = ({situation, la}) => {
    return (
        <Col>
            <label className="Model-Label">{Trans_Model_Output_Label(la)['situation']}</label>
            <Input className="Model-Output"
                   style={{width: TRAIN_WIDTH_OUTPUT_LONG}}
                   value={situation}/>
        </Col>
    )
}

