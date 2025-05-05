<template>
  <Drawer>
    <div class="container">
      <v-card class="card-gasto">
        <v-card-title class="title">
          <v-icon left color="#33b3b3">mdi-clipboard-check-outline</v-icon>
          Tarefas
        </v-card-title>
        <div class="px-4">
          <v-list class="transparent scrollable-list" bg-color="transparent">
            <v-list-item v-for="item in tarefas" :key="item.ID_TAREFA" class="gasto-item">
              <v-btn class="pa-0" variant="text" @click="openDialogEditDesc(item)">
                <v-list-item-title> {{ item.DESC_TAREFA }} </v-list-item-title>
              </v-btn>
              <template v-slot:append>
                <v-checkbox
                  @change="endTarefa(item)"
                  hide-details
                  color="#33b3b3"
                  base-color="#33b3b3"
                  density="compact"
                />
              </template>
            </v-list-item>
          </v-list>
        </div>

        <v-divider class="my-3 mx-4"></v-divider>

        <v-card class="input-card mb-6 mt-6">
          <v-row align="center" class="pa-4">
            <v-col cols="12" md="11" lg="11">
              <v-text-field
                label="Descrição"
                variant="outlined"
                density="comfortable"
                color="#33b3b3"
                prepend-inner-icon="mdi-text-box"
                v-model="descricao"
                hide-details
                @keydown.enter="addTarefa"
                single-line
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="1" lg="1" class="text-center">
              <v-btn
                class="add-button"
                color="#33b3b3"
                block
                size="large"
                elevation="2"
                fab
                @click="addTarefa"
                >+</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card>
      <v-dialog v-model="confirmEditDesc" max-width="600px">
        <v-card class="pa-2">
          <span class="title">Editar Descrição</span>
          <v-text-field
            ref="editDescField"
            class="mt-4"
            label="Descrição"
            variant="outlined"
            density="comfortable"
            color="#33b3b3"
            prepend-inner-icon="mdi-text-box"
            v-model="selectedItemEdit.DESC_TAREFA"
            hide-details
            @keydown.enter="editTarefa(selectedItemEdit)"
            single-line
          />
          <v-card-actions class="d-flex justify-end mt-4">
            <v-btn
              style="background-color: grey; color: white"
              @click="confirmEditDesc = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              style="background-color: #33b3b3; color: white"
              @click="editTarefa(selectedItemEdit)"
            >
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </Drawer>
</template>

<script lang="ts">
import Drawer from "@/components/Drawer.vue";
import { eventBus } from "@/event-bus";
import type { Tarefa } from '@/interfaces/Tarefas';
export default defineComponent({
  components: {
    Drawer,
  },
  data() {
    return {
      descricao: "",
      confirmEditDesc: false,
      selectedItemEdit: {} as Tarefa,
      tarefas: [] as Tarefa[],
    };
  },
  methods: {
    async getTarefas() {
      const response = await fetch("http://localhost:3002/tarefa/get-tarefas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      this.tarefas = data.resp;
    },

    async addTarefa() {
      if (!this.descricao) {
        eventBus.value.showToast("Preencha a descrição da tarefa", "info");
        return;
      }

      let params = {
        descricao: this.descricao,
      };
      try {
        const response = await fetch("http://localhost:3002/tarefa/add-tarefa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        const data = await response.json();
        this.descricao = "";
        await this.getTarefas();
        if (data.success) {
          eventBus.value.showToast("Tarefa adicionada com sucesso", "success");
        } else {
          eventBus.value.showToast("Erro ao adicionar tarefa", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        eventBus.value.showToast("Erro ao adicionar tarefa", "error");
      }
    },

    async endTarefa(tarefa: { ID_TAREFA: number }) {
      let params = {
        id_tarefa: tarefa.ID_TAREFA,
      };
      try {
        const response = await fetch("http://localhost:3002/tarefa/end-tarefa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        const data = await response.json();
        await this.getTarefas();
        if (data.success) {
          eventBus.value.showToast("Tarefa finalizada com sucesso", "success");
        } else {
          eventBus.value.showToast("Erro ao finalizar tarefa", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        eventBus.value.showToast("Erro ao finalizar tarefa", "error");
      }
    },
    openDialogEditDesc(item: { DESC_TAREFA: string; ID_TAREFA: number }) {
      this.selectedItemEdit = { ...item };
      this.confirmEditDesc = true;

      this.$nextTick(() => {
        (this.$refs.editDescField as HTMLInputElement).focus();
      });
    },

    async editTarefa(item: { ID_TAREFA: number; DESC_TAREFA: string }) {
      if (!item.DESC_TAREFA) {
        eventBus.value.showToast("Preencha a descrição da tarefa", "info");
        return;
      }

      let params = {
        id_tarefa: item.ID_TAREFA,
        descricao: item.DESC_TAREFA,
      };
      try {
        const response = await fetch("http://localhost:3002/tarefa/edit-tarefa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        const data = await response.json();
        this.confirmEditDesc = false;
        this.selectedItemEdit = {} as { ID_TAREFA: number; DESC_TAREFA: string };
        await this.getTarefas();
        if (data.success) {
          eventBus.value.showToast("Tarefa editada com sucesso", "success");
        } else {
          eventBus.value.showToast("Erro ao editar tarefa", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        eventBus.value.showToast("Erro ao editar tarefa", "error");
      }
    },
  },

  async mounted() {
    await this.getTarefas();
  },
});
</script>

<style scoped>
.container {
  background: #1a1a1a;
  padding: 20px;
}

.card-gasto {
  background: #212121 !important;
  border: 2px solid #33b3b3;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3) !important;
}

.title {
  color: #33b3b3 !important;
  font-size: 24px !important;
  font-weight: 600 !important;
  padding: 24px 24px 0 24px !important;
}

.subtitle {
  color: #858585 !important;
  padding: 0 24px 16px 24px !important;
}

.input-card {
  margin: 0 16px;
  background: #2d2d2d !important;
  border: 1px solid #3d3d3d;
}

.add-button {
  font-size: 28px;
}

.gasto-item {
  background: #2d2d2d !important;
  margin-bottom: 8px;
  max-height: 100px !important;
  border-radius: 8px;
  border-left: 4px solid #33b3b3;
}

.v-divider {
  border-color: #33b3b3 !important;
  opacity: 0.3;
}

.scrollable-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
}
</style>
