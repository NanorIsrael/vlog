import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useApi } from "./ApiProvider";

interface UserType {
    user: string | null
    logout: () => void
    login: (username: string, password: string) => Promise<string>
    setUser: Dispatch<SetStateAction<string | null>>
}
const UserContext = createContext<UserType | null>(null);
export default function UserProvider({ children }: any) {
  const [user, setUser] = useState<string | null>(null);
  const api = useApi()

  useEffect(() => {
      (async() => {
        if (api.isAuthenticated()){
            const res = await api.get("/me")
            if (res.ok) {
                setUser(res.body)
            }
          }
      })();
  }, [api])

  const login = async (username: string, password: string) => {
      const res = await api.login(username, password);
      if (res === 'ok') {
        const result = await api.get("/me")

        if (result.ok) {
            setUser(result.body)
        }
      }
      return res;
  }
  const logout = async () => {
        await api.logout();
        setUser(null)
  }
  return <UserContext.Provider value={{user, setUser, login, logout}}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  return useContext(UserContext) as UserType;
};
