<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    width="290px"
    :return-value.sync="date"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="formatDate"
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
import { format, parseISO } from "date-fns";
export default {
  data() {
    return {
      modal: false,
      date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd")
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
      await this.bindCurrentWorkout();
    }
  },
  computed: {
    formatDate() {
      return this.date ? format(parseISO(this.date), "EEEE, MMMM do yyyy") : "";
    }
  },
  // Mounted: set date to current date by default
  async mounted() {
    await this.updateDate(this.date);
  }
};
</script>
