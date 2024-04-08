import React, {useState, useContext} from "react";
import axios from "axios";
import {WEATHER_URL} from "../../index";
import {Container} from "reactstrap";
import {Row, Col, Input, Alert, Button} from 'antd';
import SelectCity from "./SelectCity";
import {Trans_Weather} from "./func";
import {getStoredLanguage} from "../func";
import PlotInfo from "./PlotInfo";

const Crawler = () => {
    const la = getStoredLanguage();
    const [cities, setCities] = useState(['北京', '上海']);
    const [info, setInfo] = useState([]);
    const [showWho, setShowWho] = useState('');

    const getInfo = (data) => {
        return data.map(item => {
            return item.date.map((date, index) => {
                return {
                    'city': item.city,
                    'date': date,
                    'temp': item.temp[index]
                };
            }).reduce((acc, cur) => [...acc, cur], []);
        }).reduce((acc, cur) => [...acc, ...cur], []);
    }

    const getHistory24Hour = () => {
        axios.get(WEATHER_URL + `history24hour?cities=${cities}`).then(response => {
            setInfo(getInfo(response.data));
            setShowWho('history24hour');
            // console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const getFuture7Day = () => {
        axios.get(WEATHER_URL + `future7day?cities=${cities}`).then(response => {
            setInfo(getInfo(response.data));
            setShowWho('future7day');
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Container>

            <Row>
                <SelectCity cities={cities}
                            setCities={setCities}/>
            </Row>

            <Row>
                <Button>
                        <span onClick={getHistory24Hour}>
                            {Trans_Weather(la)['history24hour']}
                        </span>
                </Button>

                <Button>
                        <span onClick={getFuture7Day}>
                            {Trans_Weather(la)['future7day']}
                        </span>
                </Button>
            </Row>

            {showWho === 'history24hour' && <PlotInfo info={info}
                                                      xName="date"
                                                      yName="temp"/>}
            {showWho === 'future7day' && <PlotInfo info={info}
                                                   xName="date"
                                                   yName="temp"/>}

        </Container>
    )
}

export default Crawler;
