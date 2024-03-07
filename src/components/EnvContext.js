import React from 'react';
import {DEFAULT_ENV} from "./func";

const initEnv = {
    env: DEFAULT_ENV,
    setEnv: {},
}

const EnvContext = React.createContext(initEnv);

export default EnvContext;
