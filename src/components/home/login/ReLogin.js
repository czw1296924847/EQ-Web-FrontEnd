import {Navigate} from "react-router"
import { useLocation} from "react-router-dom";

function ReLogin({children}) {
    const token = localStorage.getItem('token')
    console.log("ReLogin, token: ", token);

    const {pathname} = useLocation()
    if (!token) {
        return <Navigate to="/login" state={{returnURL: pathname}}></Navigate>
    }
    return children
}

export default ReLogin;
