<template>
  <v-container>
    <v-alert
      v-model="isAlerted"
      transition="slide-x-transition"
      dismissible
      text
      type="error"
      >Already in current workout</v-alert
    >
    <v-card-title class="d-flex justify-space-between align-center">
      <p class="mb-0">
        {{ header }}
      </p>
      <exercise-modal
        v-if="header == 'Exercise'"
        icon="mdi-plus"
        :filteredMuscles="filteredMuscles"
      />
    </v-card-title>
    <v-expansion-panels>
      <v-expansion-panel v-for="muscle in filteredMuscles" :key="muscle">
        <v-expansion-panel-header
          class="text-capitalize font-weight-medium text-h5"
        >
          {{ muscle }}
        </v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="item in items.filter(item => item.muscle == muscle)"
          :key="item.id"
        >
          <v-container class="d-flex align-center">
            <v-row>
              <v-col class="d-flex align-center">
                <p class="mb-0">
                  {{ item.name }}
                </p>
              </v-col>
              <v-col class="d-flex justify-end">
                <exercise-modal icon="mdi-square-edit-outline" :exercise="item" />
                <v-btn
                  class="px-0"
                  min-width="36px"
                  @click="addExercise(item.id)"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ExerciseModal from "./ExerciseModal.vue";
export default {
  components: { ExerciseModal },
  props: ["header", "items"],
  data() {
    return {
      isAlerted: false
    };
  },
  computed: {
    filteredMuscles: function() {
      const that = this;
      let filtered = that.items.map(item => item.muscle);
      filtered = new Set(filtered);
      filtered = Array.from(filtered);
      return filtered;
    },
    ...mapGetters(["currentWorkout"])
  },
  methods: {
    ...mapActions(["addExerciseToWorkout"]),
    addExercise(itemID) {
      if (this.currentWorkout && this.currentWorkout.order.includes(itemID)) {
        this.isAlerted = true;
        setTimeout(() => (this.isAlerted = false), 2000);
      } else {
        this.addExerciseToWorkout(itemID);
      }
    }
  }
};
</script>
