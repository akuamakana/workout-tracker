<template>
  <v-container>
    <v-card height="750px" max-height="750px">
      <v-card-title class="d-flex justify-space-between">
        <p>
          Workout
        </p>
        <p>
          March 16, 2021
        </p>
      </v-card-title>
      <v-container v-if="currentWorkout[0]">
        <v-card
          v-for="(exercise, i) in currentWorkout[0].exercises"
          :key="i"
          class="mb-8"
        >
          <v-card-title> {{ exercise.name }} - {{ exercise.id }} </v-card-title>
          <v-card-text>
            {{ exercise.name }} - {{ exercise.id }}
          </v-card-text>
        </v-card>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { db } from "../firebase/db";
export default {
  data() {
    return {
      currentWorkout: null,
      timestamp: "2021-03-17",
      test: "workouts",
    };
  },
  methods: {
    getReps(id) {
      db
        .collection("exercises")
        .doc(id)
    }
  },
  // Set date if not referenced
  mounted() {
    // if (!date) {
    //   let currentDate = new Date();
    //   currentDate.get;
    // }
  },
  // firestore: {
  //   // currentWorkout: db
  //   //   .collection("workouts")
  //   //   .where("date", ">", new Date(timestamp))
  // }
  watch: {
    timestamp: {
      immediate: true,
      handler(timestamp) {
        this.$bind(
          "currentWorkout",
          db
            .collection("workouts")
            .where("date", ">", new Date(timestamp))
            .limit(1)
        );
      }
    }
  }
};
</script>
