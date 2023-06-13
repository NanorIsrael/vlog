import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Body from "../components/Body";
import { useApi } from "../data/ApiProvider";

export interface UserType {
  username: string;
  about_me: string;
}
export default function UserPage() {
  const api = useApi();
  const { username } = useParams();
  const readQuery = useQuery(["user"], () => api?.get("/users/" + username))

  const user = readQuery?.data?.body ?? {}
  return (
    <>
      {readQuery.isLoading ? (
        <p>Loading</p>
      ) : readQuery.isError ? (
        <p>Could not find user</p>
      ) : (
        <>
          <Body sidebar>
          <img src={user.avatar_url + "&s=128"} alt="user avatar" />
            <h1>{user.username}</h1>
            <p>{user.about_me}</p>
          </Body>
        </>
      )}
    </>
  );

  
}
