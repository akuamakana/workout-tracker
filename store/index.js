import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../firebase/db";
import "firebase/firestore";

export const state = () => ({
  currentWorkout: [],
  currentWorkoutExercises: null,
  date: "2021-03-24"
});

export const mutations = { ...vuexfireMutations };

export const actions = {
  addExerciseToWorkout: firestoreAction(({ state }, exerciseID) => {
    // Check if exercise in workout
    // db.collection("workouts")
    // Add exercise to workout
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .add({
        exerciseID: exerciseID,
        referenceID: db.doc("exercises/" + exerciseID)
      });
  }),
  bindCurrentWorkout: firestoreAction(async ({ bindFirestoreRef, state }) => {
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
  }),
  deleteExerciseFromWorkout: firestoreAction(({ state }, exerciseID) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(exerciseID)
      .delete();
  }),
  deleteSetFromExercise: firestoreAction(({ state }, payload) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(payload.exerciseID)
      .collection("sets")
      .doc(payload.setID)
      .delete();
  }),
  addSetToExercise: firestoreAction(({ state }, payload) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(payload.exerciseID)
      .collection("sets")
      .add({ weight: payload.weight, reps: payload.reps });
  }),
  updateSet: firestoreAction(({ state }, payload) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(payload.exerciseID)
      .collection("sets")
      .doc(payload.setID)
      .update({ weight: payload.weight, reps: payload.reps });
    console.log('update store')
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
