import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Body from "../components/Body";
import { useApi } from "../data/ApiProvider";
import { MeType } from "../models/post";


const UserPage = () => {
  const api = useApi();
  const { username } = useParams();
  if (!username) {
    throw new Error("Username not found")
  }

  const readQuery = useQuery(["user"], () => api?.get<MeType>(`/users/${username}`))

  const user = readQuery?.data?.body

  return (
    <>
      {readQuery.isLoading ? (
        <p>Loading</p>
      ) : readQuery.isError ? (
        <p>Could not find user</p>
      ) : (
        <>
        {  
        user && <Body sidebar>
            <img src={user.avatar_url + "&s=128"} alt="user avatar" />
            <h1>{user.username}</h1>
            <p>{user.about_me}</p>
          </Body>
          }
        </>
      )
      } 
    </>
  );
}

export default UserPage;
