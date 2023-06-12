
import { useUser } from "../data/UserProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({children}: any) {
    const {user} = useUser();
    const location = useLocation();
    
    if (user === undefined) {
        return null;
    } else if (user) {
        return children
    } else {
        const url = location.pathname + location.search + location.hash;
        return <Navigate to='/login' state={{next: url}}/>
    }
}
