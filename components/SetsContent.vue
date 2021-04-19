<template>
  <v-container>
    <v-row align="center">
      <!-- Display sets -->
      <v-col lg="2" v-if="sets" v-for="(set, i) in sets" :key="set.id">
        <v-btn style="height: auto" text @click="editSet(set.id)" class="px-0">
          <div>
            <p class="mb-0 pb-2 text-left text--secondary">Set {{ i + 1 }}</p>
            <p class="mb-0 pb-2 text-left">
              {{ set.weight ? set.weight : "-" }} LBS
            </p>
            <p class="mb-0 text-left">{{ set.reps ? set.reps : "-" }} REPS</p>
          </div>
        </v-btn>
      </v-col>
      <!-- Add set to exercise button -->
      <v-col lg="2">
        <v-btn x-large @click="modalAction">
          <v-icon small :x-large="!$vuetify.breakpoint.mobile" dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- Open modal for set add/change -->
    <sets-modal
      @close="modalAction"
      @clear="clearModal"
      :dialog="dialog"
      :exerciseID="exerciseID"
      :setID="setID"
    />
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
      dialog: false,
      setID: ""
    };
  },
  created() {
    const that = this;
    const eID = that.$props.exerciseID;
    const cwID = that.$props.currentWorkoutID;
    this.$bind(
      "sets",
      db
        .collection("users")
        .doc(this.$store.state.userID)
        .collection("workouts")
        .doc(cwID)
        .collection("workout")
        .doc(eID)
        .collection("sets")
        .orderBy("timestamp", "asc")
    );
  },
  methods: {
    ...mapActions(["addSetToExercise"]),
    modalAction() {
      this.dialog = !this.dialog;
    },
    editSet(setID) {
      this.setID = setID;
      this.modalAction();
    },
    clearModal() {
      this.dialog = !this.dialog;
      this.setID = "";
    }
  }
};
</script>

<style></style>
