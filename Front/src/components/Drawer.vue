<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :class="{ 'active-route': isActiveRoute(item.route) }"
          clickable
          @click="navigate(item.route)"
        >
          <v-icon class="mr-2" color="#33b3b3">{{ item.icon }}</v-icon>
          <span class="custom-title">{{ item.title }}</span>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon color="#33b3b3" @click="drawer = !drawer" />
      <v-toolbar-title class="text">Blue Eyes</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: "Gastos", icon: "mdi-cash", route: "/gastos" },
        { title: "Tarefas", icon: "mdi-clipboard-check-outline", route: "/tarefas" },
        { title: "Mercado", icon: "mdi-cart-variant", route: "/mercado" },
        { title: "Sair", icon: "mdi-logout", route: "/login" },
      ],
    };
  },

  methods: {
    navigate(route: string) {
      this.drawer = false;
      this.$router.push(route);
    },

    isActiveRoute(route: string): boolean {
      return this.$route.path === route;
    },
  },
});
</script>

<style scoped>
.text {
  color: #33b3b3;
  font-size: 20px;
  font-weight: bold;
}
.custom-title {
  color: #33b3b3;
  margin-left: 10px;
  font-size: 18px;
}
.active-route {
  background-color: rgba(51, 179, 179, 0.1);
  border-left: 4px solid #33b3b3;
  border-radius: 4px;
}
</style>
