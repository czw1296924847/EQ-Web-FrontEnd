import React from 'react';
import {DEFAULT_LA} from "./func";

const initLanguage = {
    la: DEFAULT_LA,
    setLa: {},
}

const LanguageContext = React.createContext(initLanguage);

export default LanguageContext;
