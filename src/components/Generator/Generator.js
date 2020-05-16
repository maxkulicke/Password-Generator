import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { NEW_PASSWORD } from "../../utils/actions"

function Generator() {
  const [state, dispatch] = useStoreContext();
  const { generation, sets, length, setsSelected } = state;

  const generator = () => {
    let combinedSets = setCombiner();
    let unverifiedPassword = passwordMaker(combinedSets);
    let verification = (verifier(unverifiedPassword));
    let verifiedPassword = (verification ? unverifiedPassword : generator())
    return verifiedPassword;
  }

  const setCombiner = () => {
    let empty = "";
    let combinedSets = empty;
    Object.keys(sets).forEach(set => {
      if (setsSelected[set]) {
        combinedSets += empty.concat(sets[set]);
      }
    });
    return combinedSets;
  }

  const passwordMaker = (combinedSets) => {
    let password = "";
    for (var i = 0; i < length; i++) {
      password += combinedSets.charAt(Math.floor(Math.random() * combinedSets.length));
    }
    return password;
  }

  const verifier = (password) => {
    let failure = false;
    Object.keys(sets).forEach(set => {
      let containsSet = false;
      let needsSet = false;
      if (setsSelected[set]) {
        needsSet = true;
        let containsChar = false;
        for (var i = 0; i < sets[set].length; i++) {
          containsChar = (password.includes(sets[set].charAt(i)) ? true : false);
          if (containsChar) { 
            containsSet = true;
            i = sets[set].length 
          };
        }
      }
      if (needsSet && !containsSet) {
        failure = true;
      }
    });
    let verified = (failure ? false : true);
    return verified;
  }

  useEffect(() => {
    if (generation) {
      let password = generator()
      dispatch({
        type: NEW_PASSWORD,
        password: password
      });
    }
  }, [generation]);


  return (
    <div />
  )

}

export default Generator;
