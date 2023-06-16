import { Link } from "react-router-dom";
import { useUser } from "../data/UserProvider";

export default function Header() {
    const {user, logout} = useUser();


    return (
        <header className={"w-full flex flex-row justify-between bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 "}>
            <p className={"text-6xl text-white hover:text-gray-200"}><Link to="/">My Blog</Link> </p>
            <nav className="navbar">
                {/* <a href="#home">Home</a>
                <a href="#news">News</a> */}
                {
                    user === undefined ?
                    
                    <p>🌀</p> :
                    <>
                    {user  !== null && 
                    <>
                        <div className="dropdown h-full">
                            <div className="flex flex-row">
                                <img src={user.avatar_url + "&s=32"} alt={"user illustration"} />
                                <button className="dropbtn">
                                <i className="fa fa-caret-down"></i>
                                </button>
                            </div>
                           
                           <div className="dropdown-content">
                           <Link to={"/users/" + String(user.username)}>Profile</Link>
                           <Link to="/" onClick={logout}>Log out</Link>
                           </div>
                       </div> 
                       </>
                    }
                    </>
                }
                
          </nav>
        </header>
    )
}