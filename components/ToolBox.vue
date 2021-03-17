<template>
  <v-card height="750px" max-height="750px">
    <workout-box header="Exercise" :items="exercises" />
    <workout-box header="Workout" :items="workouts" />
  </v-card>
</template>

<script>
import { db } from "../firebase/db";
export default {
  data() {
    return {
      exercises: [],
      workouts: []
    };
  },
  firestore: {
    exercises: db.collection("exercises"),
    workouts: db.collection("saved-workouts")
  }
};
</script>
