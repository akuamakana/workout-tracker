<template>
  <v-layout justify-end>
    <v-btn class="px-0 mr-2" min-width="36px" @click="modalController">
      <v-icon>
        {{ icon }}
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
              <v-text-field
                v-model="name"
                :rules="rules"
                label="Name"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-combobox
                class="text-capitalize"
                v-model="muscle"
                :items="filteredMuscles"
                :rules="rules"
                label="Type"
              ></v-combobox>
            </v-row>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" text color="red lighten-1">
              Close
            </v-btn>
            <v-btn
              text
              @click="exercise ? updateCurrentExercise() : createNewExercise()"
              >{{ exercise ? "Update" : "Save" }}</v-btn
            >
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["filteredMuscles", "icon", "exercise"],
  data() {
    return {
      dialog: false,
      name: "",
      muscle: "",
      rules: [value => !!value || "Required"]
    };
  },
  methods: {
    ...mapActions(["addExercise", "updateExercise"]),
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
    },
    updateCurrentExercise() {
      if (!this.name) {
        return;
      }
      if (!this.muscle) {
        return;
      }
      this.updateExercise({
        exerciseID: this.exercise.id,
        name: this.name,
        muscle: this.muscle
      });
      this.dialog = false;
      this.name = "";
      this.muscle = "";
    },
    modalController() {
      if (this.exercise) {
        this.name = this.exercise.name;
        this.muscle = this.exercise.muscle;
      }
      this.dialog = true;
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
