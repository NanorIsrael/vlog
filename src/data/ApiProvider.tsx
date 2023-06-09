import { createContext, useContext } from "react";
import MyBlogAPIClientImp, {
  MyBlogAPIClient,
} from "../clients/MyblogapiClient";

const ApiContext = createContext<MyBlogAPIClient | null>(null);
export default function ApiProvider({ children }: any) {
  const api = new MyBlogAPIClientImp();
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export const useApi = () => {
  return useContext(ApiContext) as MyBlogAPIClient;
};
