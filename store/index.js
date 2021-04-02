import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../firebase/db";
import "firebase/firestore";
import firebase from "firebase";

export const state = () => ({
  currentWorkout: [],
  currentWorkoutExercises: null,
  sortOrder: [],
  date: null
});

export const mutations = {
  ...vuexfireMutations,
  setDate(state, date) {
    state.date = date;
  }
};

export const actions = {
  // Bind and Unbind
  bindCurrentWorkout: firestoreAction(async ({ bindFirestoreRef, state }) => {
    // Bind currentWorkout by date
    await bindFirestoreRef(
      "currentWorkout",
      db
        .collection("workouts")
        .where("timestamp", ">=", new Date(state.date + " 00:00"))
        .where("timestamp", "<=", new Date(state.date + " 23:59"))
    );
    // Bind currentWorkoutExercises with id
    if (state.currentWorkout[0]) {
      await bindFirestoreRef(
        "currentWorkoutExercises",
        db
          .collection("workouts")
          .doc(state.currentWorkout[0].id)
          .collection("workout")
      );
    }
    // Bind order for sort
    if (state.currentWorkout[0]) {
      await bindFirestoreRef("sortOrder", db.collection("collection"));
    }
  }),
  unbindCurrentWorkout: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("currentWorkoutExercises");
    unbindFirestoreRef("currentWorkout");
  }),

  // Exercise to workout controller
  addExerciseToWorkout: firestoreAction(
    async ({ state, dispatch }, exerciseID) => {
      // Check if exercise in workout
      // db.collection("workouts")
      // Add exercise to workout
      if (state.currentWorkout[0]) {
        db.collection("workouts")
          .doc(state.currentWorkout[0].id)
          .collection("workout")
          .add({
            exerciseID: exerciseID,
            referenceID: db.doc("exercises/" + exerciseID)
          });
      } else {
        // Create new workout
        const newDate = firebase.firestore.Timestamp.fromDate(
          new Date(state.date + "T00:00-0800")
        );
        db.collection("workouts").add({ timestamp: newDate });
        await dispatch("bindCurrentWorkout", { root: true });
        db.collection("workouts")
          .doc(state.currentWorkout[0].id)
          .collection("workout")
          .add({
            exerciseID: exerciseID,
            referenceID: db.doc("exercises/" + exerciseID)
          });
      }
    }
  ),
  deleteExerciseFromWorkout: firestoreAction(({ state }, exerciseID) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(exerciseID)
      .delete();
  }),

  // Set to exercise controller
  addSetToExercise: firestoreAction(({ state }, payload) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(payload.exerciseID)
      .collection("sets")
      .add({
        weight: payload.weight,
        reps: payload.reps,
        timestamp: firebase.firestore.Timestamp.now()
      });
  }),
  updateSet: firestoreAction(({ state }, payload) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(payload.exerciseID)
      .collection("sets")
      .doc(payload.setID)
      .update({ weight: payload.weight, reps: payload.reps });
  }),
  deleteSetFromExercise: firestoreAction(({ state }, payload) => {
    db.collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(payload.exerciseID)
      .collection("sets")
      .doc(payload.setID)
      .delete();
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
