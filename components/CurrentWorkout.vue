<template>
  <v-container>
    <v-card height="1000px" max-height="1000px">
      <!-- Card title -->
      <v-card-title class="d-flex justify-space-between mb-n8">
        <v-col>
          <p>
            Workout
          </p>
          <v-btn color="red" @click="logout">Logout</v-btn>
        </v-col>
        <v-col cols="5">
          <date-picker></date-picker>
        </v-col>
      </v-card-title>

      <!-- Card contents -->
      <v-container style="overflow:auto" v-if="currentWorkoutExercises">
        <v-card
          v-for="(exercise, i) in [...currentWorkoutExercises].sort((a, b) => {
            if (currentWorkout.order) {
              return (
                currentWorkout.order.indexOf(a.exerciseID) -
                currentWorkout.order.indexOf(b.exerciseID)
              );
            } else {
              return;
            }
          })"
          :key="i"
          class="mb-4"
        >
          <v-card-title class="mb-n8">
            <v-container class="d-flex justify-space-between align-center">
              <p>{{ exercise.referenceID.name }} - {{ exercise.exerciseID }}</p>
              <v-btn color="error">
                <v-icon @click="deleteExerciseFromWorkout(exercise)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-container>
          </v-card-title>
          <sets-content
            v-if="currentWorkout"
            :exercise="exercise"
            :exerciseID="exercise.id"
            :currentWorkoutID="currentWorkout.id"
          />
        </v-card>
        <sets-modal />
      </v-container>
      <v-container class="d-flex my-4" style="justify-content:center">
        <toolbox-modal />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { auth } from "@/firebase/db";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";
export default {
  methods: {
    ...mapActions(["deleteExerciseFromWorkout"]),
    ...mapMutations(["setDate"]),
    logout() {
      auth
        .signOut()
        .then(() => {
          console.log("signout");
          Cookies.remove("access_token");
          this.$router.push("/login");
        })
        .catch(error => {
          alert(error.message);
        });
    }
  },
  computed: {
    ...mapGetters(["currentWorkoutExercises", "currentWorkout"])
  },
  async mounted() {
    try {
      this.setDate(format(parseISO(new Date().toISOString()), "yyyy-MM-dd"));
      await this.$store.dispatch("bindCurrentWorkout");
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style>
html {
  overflow: hidden !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>
