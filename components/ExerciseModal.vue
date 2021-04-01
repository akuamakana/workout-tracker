<template>
  <v-layout row justify-center>
    <v-btn color="blue" x-large @click="dialog = true">
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px">
      <tool-box />
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>
