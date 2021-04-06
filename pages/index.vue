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
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
body {
  font-family: "Roboto", sans-serif;
}
</style>
