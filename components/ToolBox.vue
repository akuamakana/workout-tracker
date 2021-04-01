<template>
  <v-card style="overflow:auto" height="750px" max-height="750px">
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

<style>
::-webkit-scrollbar-track {
  background: transparent !important; /* color of the tracking area */
}
::-webkit-scrollbar {
  width: 8px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 6px;
  border-radius: 6px;
  background: rgba(66, 66, 66, 0.8);
}
</style>
