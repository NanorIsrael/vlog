
import { useUser } from "../data/UserProvider";
import { Navigate } from "react-router-dom";

export default function PublicRoute({children}: any) {
    const {user} = useUser();
    
    if (user === undefined) {
        return null;
    } else if (user) {
        return <Navigate to='/'/>
    } else {
        return children
    }
}