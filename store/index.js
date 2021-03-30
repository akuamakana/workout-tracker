import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../firebase/db";
import "firebase/firestore";

export const state = () => ({
  currentWorkout: [null],
  currentWorkoutExercises: null,
  date: "2021-03-24"
});

export const mutations = { ...vuexfireMutations };

export const actions = {
  addExerciseToWorkout: firestoreAction(({ state }, payload) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .add({
        exerciseID: payload,
        referenceID: db.doc("exercises/" + payload)
      });
  }),
  bindCurrentWorkout: firestoreAction(
    async ({ bindFirestoreRef, state }, payload) => {
      console.log("bindCurrentWorkoutExercises is running");
      await bindFirestoreRef(
        "currentWorkout",
        db.collection("workouts").where("timestamp", ">", new Date(state.date))
      );
      await bindFirestoreRef(
        "currentWorkoutExercises",
        db
          .collection("workouts")
          .doc(state.currentWorkout[0].id)
          .collection("workout")
      );
    }
  ),
  deleteExerciseFromWorkout: firestoreAction(({ state }, exerciseID) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(exerciseID)
      .delete();
  }),
  addSetToExercise: firestoreAction(({ state }, exerciseID) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(exerciseID)
      .collection("sets")
      .add({ reps: 13, weight: 225 });
  })
};

export const getters = {
  currentWorkout(state) {
    return state.currentWorkout[0];
  },
  currentWorkoutExercises(state) {
    return state.currentWorkoutExercises;
  }
};
