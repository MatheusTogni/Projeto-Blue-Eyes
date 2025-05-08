<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app color="#212121" width="280" floating>
      <div class="d-flex flex-column h-100">
        <div class="drawer-header pa-4">
          <div class="d-flex align-center">
            <span class="app-title">Blue Eyes</span>
          </div>
        </div>

        <v-divider class="mx-4 mb-2" color="#33b3b3" opacity="0.3"></v-divider>

        <v-list class="px-3 flex-grow-1" density="comfortable" style="overflow-y: auto">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :class="{ 'active-route': isActiveRoute(item.route) }"
            rounded="lg"
            @click="navigate(item.route)"
          >
            <template v-slot:prepend>
              <v-icon :color="isActiveRoute(item.route) ? '#33b3b3' : '#858585'">
                {{ item.icon }}
              </v-icon>
            </template>

            <v-list-item-title
              :class="{
                'text-primary': isActiveRoute(item.route),
                'text-secondary': !isActiveRoute(item.route),
              }"
            >
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <div class="footer-card">
          <v-card class="version-card mx-4 mb-4" variant="outlined">
            <v-card-text class="d-flex align-center pa-3">
              <v-icon color="#33b3b3" size="24" class="mr-2"
                >mdi-information-outline</v-icon
              >
              <div>
                <div class="version-title">Blue Eyes</div>
                <div class="version-text">{{ systemVersion }}</div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
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
      systemVersion: "v1.0.0",
      menuItems: [
        { title: "Gastos", icon: "mdi-cash", route: "/gastos" },
        { title: "Tarefas", icon: "mdi-clipboard-check-outline", route: "/tarefas" },
        { title: "Mercado", icon: "mdi-cart-variant", route: "/mercado" },
        { title: "Sair", icon: "mdi-logout", route: "/login" },
      ] as any,
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
.h-100 {
  height: 100%;
}

.flex-grow-1 {
  flex-grow: 1;
}

.footer-card {
  margin-top: auto;
  position: sticky;
  bottom: 0;
  background: #212121;
  padding-top: 8px;
  z-index: 2;
}

.text {
  color: #33b3b3;
  font-size: 20px;
  font-weight: bold;
}

.drawer-header {
  background: rgba(33, 33, 33, 0.95);
  border-bottom: 1px solid rgba(51, 179, 179, 0.1);
}

.app-title {
  color: #33b3b3;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.active-route {
  background: linear-gradient(90deg, rgba(51, 179, 179, 0.15) 1%, transparent);
  border-left: 4px solid #33b3b3;
  border-radius: 8px 0 0 8px;
}

.text-primary {
  color: #33b3b3 !important;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.text-secondary {
  color: #858585 !important;
  font-weight: 400;
}

.v-list-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 4px;
}

.v-list-item:hover {
  background: rgba(51, 179, 179, 0.05) !important;
  transform: translateX(4px);
}

.version-card {
  background: #2d2d2d !important;
  border: 1px solid #33b3b3 !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

.version-title {
  color: #33b3b3;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.2;
}

.version-text {
  color: #858585;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.3px;
}
</style>
