<template>
  <v-container>
    <v-card height="750px" max-height="750px">
      <!-- Card title -->
      <v-card-title class="d-flex justify-space-between">
        <p>
          Workout
        </p>
        <p>
          March 16, 2021
        </p>
      </v-card-title>
      <!-- Card contents -->
      <v-container v-if="currentWorkoutExercises">
        <v-card
          v-for="(exercise, i) in currentWorkoutExercises"
          :key="i"
          class="mb-4"
        >
          <v-card-title>
            <v-container class="d-flex justify-space-between align-center">
              <p>
                {{ exercise.referenceID.name }}
              </p>
              <v-btn color="error">
                <v-icon @click="deleteExerciseFromWorkout(exercise.id)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-container>
          </v-card-title>
          <sets-content
            :exercise="exercise"
            :exerciseID="exercise.id"
            :currentWorkoutID="currentWorkout.id"
          />
        </v-card>
        <sets-modal />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["deleteExerciseFromWorkout"])
  },
  computed: {
    ...mapGetters(["currentWorkoutExercises", "currentWorkout"])
  },
  async mounted() {
    try {
      await this.$store.dispatch("bindCurrentWorkout");
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
