<template>
  <v-container>
    <v-row>
      <!-- Display sets -->
      <v-col
        v-if="sets"
        class="d-inline-flex"
        cols="2"
        v-for="set in sets"
        :key="set.id"
      >
        <v-container>
          <v-btn text x-large>
            <div>
              <p class="mb-0 pb-2">{{ set.weight }} LBS</p>
              <p class="mb-0">{{ set.reps }} REPS</p>
            </div>
          </v-btn>
        </v-container>
      </v-col>
      <!-- Add set to exercise button -->
      <v-col>
        <v-container>
          <v-btn x-large @click="modalAction">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-container>
      </v-col>
    </v-row>
    <sets-modal @close="modalAction" :dialog="dialog" :exerciseID="exerciseID" />
  </v-container>
</template>

<script>
import { db } from "../firebase/db";
import { mapActions } from "vuex";
export default {
  props: ["exerciseID", "exercise", "currentWorkoutID"],
  data() {
    return {
      sets: [],
      dialog: false
    };
  },
  created() {
    const that = this;
    const eID = that.$props.exerciseID;
    const cwID = that.$props.currentWorkoutID;
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
    ...mapActions(["addSetToExercise"]),
    modalAction() {
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style></style>
