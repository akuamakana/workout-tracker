<template>
  <v-card height="750px" max-height="750px">
    <v-card-title class="d-flex justify-space-between">
      <p>
        Workout
      </p>
      <p>
        March 16, 2021
      </p>
    </v-card-title>
    <v-expansion-panels>
      <v-expansion-panel v-for="(workout, i) in currentWorkout" :key="i">
        <v-expansion-panel-header>
          {{ workout.date }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { db } from "../firebase/db";
export default {
  data() {
    return {
      date: "",
      currentWorkout: null,
      timestamp: "2021-03-16"
    };
  },
  methods: {},
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
    currentWorkout: {
      immediate: true,
      handler(timestamp) {
        this.$bind(
          "currentWorkout",
          db.collection("workouts").where("date", ">", new Date("2021-03-16"))
        );
      }
    }
  }
};
</script>
