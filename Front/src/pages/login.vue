<template>
  <div class="container">
    <v-card class="card-gasto" width="400" height="400" max-width="100%" align="center">
      <v-card-title class="title">Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="login"
          label="Email"
          outlined
          class="input-card"
        ></v-text-field>
        <v-text-field
          v-model="senha"
          label="Senha"
          type="password"
          outlined
          class="input-card"
        ></v-text-field>
      </v-card-text>
      <v-btn color="#33b3b3" @click="login">Entrar</v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      login: "",
      senha: "",
    };
  },
});
</script>
