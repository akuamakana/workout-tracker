import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "../firebase/db";
import "firebase/firestore";
import firebase from "firebase";

export const state = () => ({
  currentWorkout: [],
  currentWorkoutExercises: null,
  exercises: [],
  workouts: [],
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
  // Bind and Unbind currentWorkout
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
  }),
  unbindCurrentWorkout: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("currentWorkoutExercises");
    unbindFirestoreRef("currentWorkout");
  }),

  // Bind exercises and workouts
  bindExercises: firestoreAction(async ({ bindFirestoreRef }) => {
    await bindFirestoreRef("exercises", db.collection("exercises"));
  }),
  bindWorkouts: firestoreAction(async ({ bindFirestoreRef }) => {
    await bindFirestoreRef("workouts", db.collection("saved-workouts"));
  }),

  // Exercise to workout controller
  addExerciseToWorkout: firestoreAction(
    async ({ state, dispatch }, exerciseID) => {
      // Add exercise to workout
      if (state.currentWorkout[0]) {
        db.collection("workouts")
          .doc(state.currentWorkout[0].id)
          .collection("workout")
          .add({
            exerciseID: exerciseID,
            referenceID: db.doc("exercises/" + exerciseID)
          });
        if ("order" in state.currentWorkout[0]) {
          db.collection("workouts")
            .doc(state.currentWorkout[0].id)
            .update({
              order: [...state.currentWorkout[0].order, exerciseID]
            });
        }
      } else {
        // Create new workout
        const newDate = firebase.firestore.Timestamp.fromDate(
          new Date(state.date + "T00:00-0800")
        );
        db.collection("workouts").add({
          timestamp: newDate,
          order: [exerciseID]
        });
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
  deleteExerciseFromWorkout: firestoreAction(async ({ state }, exercise) => {
    const { id, exerciseID } = exercise;
    await db
      .collection("workouts")
      .doc(state.currentWorkout[0].id)
      .collection("workout")
      .doc(id)
      .delete();
    // Delete object from array by id
    const updatedOrder = [...state.currentWorkout[0].order];
    updatedOrder.splice(updatedOrder.indexOf(exerciseID), 1);
    await db
      .collection("workouts")
      .doc(state.currentWorkout[0].id)
      .update({
        order: updatedOrder
      });
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
  }),

  // Add exercise
  addExercise: firestoreAction(({ state }, payload) => {
    db.collection("exercises").add({
      name: payload.name,
      muscle: payload.muscle.toLowerCase()
    });
  }),
  updateExercise: firestoreAction(({}, payload) => {
    db.collection("exercises")
      .doc(payload.exerciseID)
      .update({
        name: payload.name,
        muscle: payload.muscle
      });
  })
};

export const getters = {
  currentWorkout(state) {
    return state.currentWorkout[0];
  },
  currentWorkoutExercises(state) {
    return state.currentWorkoutExercises;
  },
  exercises(state) {
    return state.exercises;
  },
  workouts(state) {
    return state.workouts;
  }
};
