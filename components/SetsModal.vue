<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Set</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Weight"
                  suffix="Lbs"
                  v-model="weight"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Reps"
                  suffix="Reps"
                  v-model="reps"
                  @keyup.enter="saveSetToExercise"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-6">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('close')"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="saveSetToExercise"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["dialog", "exerciseID"],
  data() {
    return {
      weight: "",
      reps: ""
    };
  },
  methods: {
    ...mapActions(["addSetToExercise"]),
    saveSetToExercise() {
      this.addSetToExercise({
        exerciseID: this.exerciseID,
        weight: this.weight,
        reps: this.reps
      });
      console.log(this.exerciseID);
      this.$emit("close");
      this.weight = "";
      this.reps = "";
    }
  }
};
</script>
