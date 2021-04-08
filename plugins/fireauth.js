import { auth } from "@/firebase/db.js";
import Cookies from "js-cookie";

export default context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        auth.currentUser.getIdToken(true).then(token => {
          Cookies.set("access_token", token);
        });
        store.commit("setUserId", user.uid);
      } else {
        Cookies.remove("access_token");
      }
      return resolve();
    });
  });
};
