import { createContext, ReactElement, useCallback, useContext, useMemo } from "react";
import MyBlogAPIClientImp, {
  MyBlogAPIClient,
} from "../clients/MyblogapiClient";
import { useFlash } from "./FlashProvider";

const ApiContext = createContext<MyBlogAPIClient | null>(null);
export default function ApiProvider({ children }: {children: ReactElement}) {
  const flash = useFlash();

  const onError = useCallback(() => {
    flash && flash("An tunexpected error has occured, Please try again.", "danger")
  }, [])

  const api = useMemo(() => new MyBlogAPIClientImp(onError), [onError]);
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export const useApi = () => {
  return useContext(ApiContext) as MyBlogAPIClient;
};
