import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";

function Generator() {
  const [state, dispatch] = useStoreContext();
  const [password, setPassword] = useState("");

  const tbd = () => {
    return;
  };

}

export default Generator;
