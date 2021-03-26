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
      <v-container v-if="currentWorkoutExercises">
        <v-card
          v-for="(exercise, i) in currentWorkoutExercises"
          :key="i"
          class="mb-4"
        >
          <v-card-title>
            {{ exercise.referenceID.name }}
          </v-card-title>
          <v-container>
            <v-row>
              <v-col
                v-if="exercise.reps"
                class="d-inline-flex"
                cols="2"
                v-for="(rep, i) in exercise.reps"
                :key="i"
              >
                <v-card-text
                  class="font-weight-bold text-button"
                  v-bind:class="{ 'px-0': i !== 0 }"
                >
                  {{ exercise.weight[i] }} LBS<br />
                  {{ exercise.reps[i] }} REPS
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      test: ""
    };
  },
  methods: {
    // ...mapActions(['setDate'])
    getExerciseName(id) {
      let myDoc = db.collection("exercises").doc(id).get();
      myDoc.then(doc => {
        console.log(doc.data())
        return doc.data()
        })
      return myDoc.then(doc => doc.data())
    }
  },
  created() {},
  computed: {
    ...mapGetters(["currentWorkout", "currentWorkoutExercises"])
  },
  async mounted() {
    try {
      await this.$store.dispatch("bindCurrentWorkoutExercises");
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
