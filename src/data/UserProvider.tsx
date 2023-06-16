import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MeType } from "../models/post";
import { useApi } from "./ApiProvider";

interface UserType {
    user: MeType | null
    logout: () => void
    login: (username: string, password: string) => Promise<string>
    setUser: Dispatch<SetStateAction<MeType| null>>
}
const UserContext = createContext<UserType | null>(null);
export default function UserProvider({ children }: any) {
  const [user, setUser] = useState<MeType | null>(null);
  const api = useApi()

  useEffect(() => {
     void (async() => {
        if (api.isAuthenticated()){
            const res = await api.get<MeType>("/me")

            if (res.ok) {
                setUser(res.body);
            }
          }
      })();
  }, [api])

  const login = async (username: string, password: string) => {
      const res = await api.login(username, password);

      if (res === 'ok') {
        const result = await api.get<MeType>("/me")
        if (result.ok) {
            setUser(result.body);
        }
      }
      return res;
  }
  const logout = async () => {
        await api.logout();
        setUser(null)
  }
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <UserContext.Provider value={{user, setUser, login, logout}}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  return useContext(UserContext) as UserType;
};

