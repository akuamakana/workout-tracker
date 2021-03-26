import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../firebase/db";
import firebase from "firebase";
import "firebase/firestore";

export const state = () => ({
  currentWorkout: [null],
  currentWorkoutExercises: null,
  date: "2021-03-24"
});

export const mutations = { ...vuexfireMutations };

export const actions = {
  bindCurrentWorkout: firestoreAction(async ({ bindFirestoreRef, state }) => {
    // return the promise returned by `bindFirestoreRef`
    console.log("Running dispatch BindFirebaseUser");
    await bindFirestoreRef(
      "currentWorkout",
      db
        .collection("workouts")
        .where("timestamp", ">", new Date(state.date))
    );
    console.log(state.currentWorkout);
  }),
  addExerciseToWorkout: firestoreAction(({ state }, payload) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .update({
        exercises: [
          {
            exercise: db.doc(`exercises/${payload}`),
            sets: [{ index: 0, reps: 15, weight: 300 }]
          }
        ]
      });
  }),
  bindCurrentWorkoutExercises: firestoreAction(async ({ bindFirestoreRef, state }, payload) => {
    console.log("bindCurrentWorkoutExercises is running")
    await bindFirestoreRef(
      "currentWorkout",
      db
        .collection("workouts")
        .where("timestamp", ">", new Date(state.date))
    );
    await bindFirestoreRef(
      "currentWorkoutExercises",
      db.collection("workouts").doc(state.currentWorkout[0].id).collection("workout")
    )
  })
};

export const getters = {
  currentWorkout(state) {
    return state.currentWorkout[0];
  },
  currentWorkoutExercises(state) {
    return state.currentWorkoutExercises
  }
};
