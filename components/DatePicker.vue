<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    width="290px"
    :return-value.sync="date"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="updateDate(date)">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      modal: false,
      date: ""
    };
  },
  methods: {
    ...mapMutations(["setDate"]),
    ...mapActions(["unbindCurrentWorkout", "bindCurrentWorkout"]),
    async updateDate(date) {
      this.unbindCurrentWorkout();
      this.setDate(date);
      this.modal = false;
      this.$refs.dialog.save(date);
      this.bindCurrentWorkout();
    }
  }
};
</script>
