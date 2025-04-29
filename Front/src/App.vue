<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>

    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top right"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { eventBus } from "./event-bus";

export default defineComponent({
  data() {
    return {
      snackbar: {
        visible: false,
        message: "",
        color: "success", 
        timeout: 2000, 
      },
    };
  },
  methods: {
    showToast(message: string, color: string = "success") {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },
  },
  created() {
    eventBus.value.showToast = this.showToast;
  },
});
</script>
