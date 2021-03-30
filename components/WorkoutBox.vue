<template>
  <v-container>
    <v-card-title class="d-flex justify-space-between">
      <p>
        {{ header }}
      </p>
      <v-icon>mdi-plus</v-icon>
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
            <v-row align-content="space-between" justify="space-between">
              <v-col>
                <p>
                  {{ item.name }}
                </p>
              </v-col>
              <v-col>
                <v-btn @click="addExerciseToWorkout(item.id)">
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
import { mapActions } from "vuex";
export default {
  props: ["header", "items"],
  data() {
    return {};
  },
  computed: {
    filteredMuscles: function() {
      const that = this;
      let filtered = that.items.map(item => item.muscle);
      filtered = new Set(filtered);
      filtered = Array.from(filtered);
      return filtered;
    }
  },
  methods: {
    ...mapActions(["addExerciseToWorkout"])
  }
};
</script>
