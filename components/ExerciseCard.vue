<template>
  <v-container>
    <v-row>
      <v-col
        v-if="sets"
        class="d-inline-flex"
        cols="2"
        v-for="(set, i) in sets"
        :key="i"
      >
        <v-card-text
          class="font-weight-bold text-button"
          v-bind:class="{ 'px-0': i !== 0 }"
        >
          {{ set.weight }} LBS<br />
          {{ set.reps }} REPS
        </v-card-text>
      </v-col>
      <v-col align-self="center">
        <v-card-text>
          <v-btn tile large elevation="0" @click="addSetToExercise(exerciseID)">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../firebase/db";
import { mapActions } from "vuex";
export default {
  props: ["exerciseID", "exercise", "currentWorkoutID"],
  data() {
    return {
      sets: []
    };
  },
  created() {
    console.log(this.$props.exerciseID);
    const eID = this.$props.exerciseID;
    const cwID = this.$props.currentWorkoutID;
    this.$bind(
      "sets",
      db
        .collection("workouts")
        .doc(cwID)
        .collection("workout")
        .doc(eID)
        .collection("sets")
    );
  },
  methods: {
    ...mapActions(["addSetToExercise"])
  }
};
</script>
