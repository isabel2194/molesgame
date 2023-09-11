import { useState } from "react";

const useGlobalCtx = () => {
  const [user, setUser] = useState();

  return {
    state: { user },
    actions: { setUser },
  };
};

export default useGlobalCtx;
