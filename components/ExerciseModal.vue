<template>
  <v-layout row justify-end>
    <v-btn @click="dialog = true">
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">
            Add Exercise
          </span>
        </v-card-title>
        <v-container>
          <v-col>
            <v-row>
              <v-text-field v-model="name" label="Name"></v-text-field>
            </v-row>
            <v-row>
              <v-combobox
                class="text-capitalize"
                v-model="muscle"
                :items="filteredMuscles"
                label="Type"
              ></v-combobox>
            </v-row>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" text color="red lighten-1">
              Close
            </v-btn>
            <v-btn text @click="createNewExercise">Save</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["filteredMuscles"],
  data() {
    return {
      dialog: false,
      name: "",
      muscle: ""
    };
  },
  methods: {
    ...mapActions(["addExercise"]),
    createNewExercise() {
      if (!this.name) {
        return;
      } else if (!this.muscle) {
        return;
      } else {
        this.addExercise({
          name: this.name,
          muscle: this.muscle
        });
        this.name = "";
        this.muscle = "";
        this.dialog = false;
      }
    }
  }
};
</script>

<style>
.v-list-item__title {
  text-transform: capitalize;
}

.v-select__slot input {
  text-transform: capitalize;
}
</style>
