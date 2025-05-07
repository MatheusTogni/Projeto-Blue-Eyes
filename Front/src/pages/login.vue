<template>
  <div class="container">
    <v-card class="login-card">
      <div class="image-container">
        <v-img src="/pwa-512x512.png" max-width="120" class="login-image" />
      </div>

      <v-card-text class="content">
        <v-text-field
          v-model="login"
          label="Usuário"
          variant="outlined"
          density="comfortable"
          color="#33b3b3"
          bg-color="#2d2d2d"
          prepend-inner-icon="mdi-account"
          hide-details
          single-line
          @keydown.enter="realizarLogin"
          class="input-field"
        />

        <v-text-field
          v-model="senha"
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          variant="outlined"
          density="comfortable"
          color="#33b3b3"
          bg-color="#2d2d2d"
          prepend-inner-icon="mdi-lock"
          hide-details
          single-line
          @keydown.enter="realizarLogin"
          class="input-field mt-6"
        >
          <template #append-inner>
            <v-icon class="me-2 cursor-pointer" @click="togglePassword">{{
              showPassword ? "mdi-eye-off" : "mdi-eye"
            }}</v-icon>
          </template>
        </v-text-field>

        <v-btn
          block
          size="large"
          color="#33b3b3"
          class="login-button mt-8"
          elevation="2"
          @click="realizarLogin"
        >
          Entrar
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { eventBus } from "@/event-bus";

export default defineComponent({
  data() {
    return {
      login: "",
      senha: "",
      showPassword: false,
    };
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async realizarLogin() {
      await this.HTTP("post", "/login/login", {
        login: this.login,
        senha: this.senha,
      })
        .then((resp) => {
          console.log(resp.login);
          console.log(resp.message);
          this.$router.push("/gastos");
        })
        .catch(() => {
          eventBus.value.showToast(
            "Erro Fazer Login, verifique se o Usuário e a Senha estão Corretos!",
            "info"
          );
        });
    },
  },
});
</script>

<style scoped>
.container {
  background: #1a1a1a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: #212121 !important;
  border: 2px solid #33b3b3;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3) !important;
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  padding-top: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-image {
  border: 2px solid #000000;
  border-radius: 50%;
  padding: 8px;
  background: #2d2d2d;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.content {
  padding: 0 24px 24px 24px !important;
}

.input-field {
  border-radius: 8px !important;
}

.input-field :deep(.v-field__outline) {
  color: #3d3d3d !important;
}

.input-field :deep(.v-field:hover .v-field__outline) {
  color: #33b3b3 !important;
}

.login-button {
  letter-spacing: 1px;
  font-weight: 600;
  border-radius: 8px !important;
  transition: all 0.3s ease;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(51, 179, 179, 0.4) !important;
}

.helper-text {
  color: #858585 !important;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.helper-text:hover {
  color: #33b3b3 !important;
}
</style>
