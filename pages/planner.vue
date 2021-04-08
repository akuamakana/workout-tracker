<template>
  <v-app>
    <v-row
      class="d-flex"
      justify="center"
      align="center"
      align-content="center"
    >
      <v-col cols="4">
        <tool-box />
      </v-col>
      <v-col cols="7">
        <current-workout />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { getUserFromCookie } from "@/helpers";
export default {
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      if (!user) {
        redirect("/login");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/login");
      }
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
body {
  font-family: "Roboto", sans-serif;
}
</style>
