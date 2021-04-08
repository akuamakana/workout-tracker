<template>
  <v-card style="overflow:auto" height="1000px">
    <workout-box header="Exercise" :items="exercises" />
    <!-- <workout-box header="Workout" :items="workouts" /> -->
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["bindExercises", "bindWorkouts"])
  },
  computed: {
    ...mapGetters(["exercises", "workouts"])
  },
  async mounted() {
    await this.bindExercises();
    await this.bindWorkouts();
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
