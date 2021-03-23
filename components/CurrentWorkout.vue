<template>
  <v-container>
    <v-card height="750px" max-height="750px">
      <v-card-title class="d-flex justify-space-between">
        <p>
          Workout
        </p>
        <p>
          {{ this.currentWorkout[0].id }}
        </p>
        <p>
          March 16, 2021
        </p>
      </v-card-title>
      <v-container v-if="currentWorkout[0]">
        <v-card
          v-for="(exercise, i) in currentWorkout[0].exercises"
          :key="i"
          class="mb-4"
        >
          <v-card-title>
            {{ exercise.exercise.name }} - {{ exercise.exercise.id }}
          </v-card-title>
          <v-container>
            <v-row>
              <v-col
                v-if="exercise.sets"
                class="d-inline-flex"
                cols="2"
                v-for="set in exercise.sets"
                :key="set.index"
              >
                <v-card-text
                  class="font-weight-bold text-button"
                  v-bind:class="{ 'px-0': set.index !== 0 }"
                >
                  {{ set.weight }} LBS<br />
                  {{ set.reps }} REPS
                </v-card-text>
              </v-col>
              <v-col align-self="center">
                <v-card-text>
                  <v-btn tile large elevation="0">
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
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
      timestamp: "2021-03-16"
    };
  },
  methods: {},
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
