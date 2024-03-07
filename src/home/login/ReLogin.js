import {Navigate} from "react-router"
import {useLocation} from "react-router-dom";

function ReLogin({children}) {
    const token = localStorage.getItem('token')
    console.log("ReLogin, token: ", token);

    const {pathname} = useLocation()
    if (token === "0") {
        return <Navigate to="/login" state={{returnURL: pathname}}/>;
    } else if (token === "1") {
        return children;
    } else {
        throw new Error("Unknown login token!");
    }
}

export default ReLogin;
