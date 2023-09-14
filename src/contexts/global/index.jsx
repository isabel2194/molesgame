import React, { createContext, useContext } from "react";
import useGlobalCtx from "./useGlobalContext";

const GlobalContext = createContext({});

const GlobalContextProvider = (props) => {
  const { children } = props;
  const context = useGlobalCtx(props);
  return <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
