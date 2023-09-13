import { useState } from "react";

const useGlobalCtx = () => {
  const [user, setUser] = useState();

  const logout = () => {
    setUser(null);
  };

  return {
    state: { user },
    actions: { setUser, logout },
  };
};

export default useGlobalCtx;
