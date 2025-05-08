<template>
  <Drawer>
    <div class="container">
      <v-card class="card-gasto">
        <v-card-title class="title">
          <v-icon left color="#33b3b3">mdi-cash-remove</v-icon>
          Gastos
        </v-card-title>
        <div class="px-4">
          <v-list class="transparent scrollable-list" bg-color="transparent">
            <v-list-item v-for="item in gastos" :key="item.ID_GASTO" class="gasto-item">
              <v-btn class="pa-0" variant="text" @click="openDialogEditDesc(item)">
                <v-list-item-title class="descricao">{{
                  item.DESC_GASTO
                }}</v-list-item-title>
              </v-btn>
              <template v-slot:append>
                <v-btn class="pa-0" variant="text" @click="openDialogEditValue(item)">
                  <span class="valor">
                    R$
                    {{
                      item.VALOR_GASTO.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })
                    }}</span
                  >
                </v-btn>
                <v-icon class="ml-3" color="red" @click="openDialog(item)"
                  >mdi-delete</v-icon
                >
              </template>
            </v-list-item>
          </v-list>
        </div>

        <v-divider class="my-3 mx-4"></v-divider>

        <v-card class="subtitle">
          <span class="total-gastos">Total: {{ totalGastos }}</span>
        </v-card>
        <v-card class="input-card mb-6 mt-6">
          <v-row align="center" class="pa-4">
            <v-col cols="12" md="8" lg="8">
              <v-text-field
                label="Descrição"
                variant="outlined"
                density="comfortable"
                color="#33b3b3"
                prepend-inner-icon="mdi-text-box"
                v-model="descricao"
                hide-details
                @keydown.enter="addGasto"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" lg="3">
              <v-text-field
                label="Valor"
                variant="outlined"
                density="comfortable"
                color="#33b3b3"
                prepend-inner-icon="mdi-cash"
                v-model="valor"
                hide-details
                @input="handleInput"
                @keydown.enter="addGasto"
              />
            </v-col>

            <v-col cols="12" md="1" lg="1" class="text-center">
              <v-btn
                class="add-button"
                color="#33b3b3"
                block
                size="large"
                elevation="2"
                :loading="loading"
                fab
                @click="addGasto"
                >+</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card>
      <v-dialog v-model="confirmDelete" max-width="600px">
        <v-card>
          <span class="title">Excluir Gasto</span>
          <v-card-text>Você tem certeza que deseja excluir este gasto?</v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn
              style="background-color: grey; color: white"
              @click="confirmDelete = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              :loading="loading"
              style="background-color: #f44336; color: white"
              @click="selectedItem && deleteGasto(selectedItem)"
            >
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
            v-model="selectedItemEdit.DESC_GASTO"
            hide-details
            @keydown.enter="editGasto(selectedItemEdit)"
          />
          <v-card-actions class="d-flex justify-end mt-4">
            <v-btn
              style="background-color: grey; color: white"
              @click="confirmEditDesc = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              :loading="loading"
              style="background-color: #33b3b3; color: white"
              @click="editGasto(selectedItemEdit)"
            >
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmEditValue" max-width="600px">
        <v-card class="pa-2">
          <span class="title">Editar Valor</span>
          <v-text-field
            ref="editValueField"
            class="mt-4"
            label="Descrição"
            variant="outlined"
            density="comfortable"
            color="#33b3b3"
            prepend-inner-icon="mdi-cash"
            v-model="selectedValueEdit.VALOR_GASTO"
            hide-details
            @input="handleInputValueGasto"
            @keydown.enter="editValor(selectedValueEdit)"
          />
          <v-card-actions class="d-flex justify-end mt-4">
            <v-btn
              style="background-color: grey; color: white"
              @click="confirmEditValue = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              :loading="loading"
              style="background-color: #33b3b3; color: white"
              @click="editValor(selectedValueEdit)"
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
import { defineComponent } from "vue";
import Drawer from "@/components/Drawer.vue";
import { eventBus } from "@/event-bus";
import type { Gasto } from "@/interfaces/Gasto";

export default defineComponent({
  components: {
    Drawer,
  },
  data() {
    return {
      descricao: "",
      loading: false,
      valor: "" as string,
      gastos: [] as Gasto[],
      confirmDelete: false,
      confirmEditDesc: false,
      confirmEditValue: false,
      selectedItem: null as Gasto | null,
      selectedItemEdit: {
        DESC_GASTO: "",
        VALOR_GASTO: 0,
        ID_GASTO: 0,
      } as Gasto,
      selectedValueEdit: {
        DESC_GASTO: "",
        VALOR_GASTO: 0,
        ID_GASTO: 0,
      } as any,
    };
  },

  computed: {
    totalGastos(): string {
      const total = this.gastos.reduce(
        (sum, gasto) => sum + Number(gasto.VALOR_GASTO),
        0
      );

      return total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },

  methods: {
    formatCurrency(value: string | number): string {
      const numberValue = Number(value.toString().replace(/\D/g, "")) / 100;
      return numberValue
        .toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace("R$", "")
        .trim();
    },

    handleInput(event: Event) {
      const input = event.target as HTMLInputElement;
      this.valor = this.formatCurrency(input.value);
    },

    handleInputValueGasto(event: Event) {
      const input = event.target as HTMLInputElement;
      this.selectedValueEdit.VALOR_GASTO = this.formatCurrency(input.value);
    },

    async addGasto() {
      this.loading = true
      const valorNumerico = this.valor
        ? Number(this.valor.replace(/\./g, "").replace(",", "."))
        : 0;
      if (!this.descricao || !valorNumerico) {
        eventBus.value.showToast("Preencha todos os campos.", "info");
        return;
      }

      let params = {
        descricao: this.descricao,
        valor: valorNumerico,
      };

      await this.HTTP("post", "/gasto/add-gasto", params)
        .then(async (resp) => {
          await this.getAllGastos();
          eventBus.value.showToast(resp.message, "success");
          this.descricao = "";
          this.valor = "";
          this.loading = false
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
          this.loading = false
        });
    },

    openDialog(item: Gasto) {
      this.selectedItem = item;
      this.confirmDelete = true;
    },

    openDialogEditDesc(item: Gasto) {
      this.selectedItemEdit = { ...item };
      this.confirmEditDesc = true;

      this.$nextTick(() => {
        (this.$refs.editDescField as HTMLInputElement).focus();
      });
    },

    openDialogEditValue(item: Gasto) {
      this.selectedValueEdit = { ...item };
      this.confirmEditValue = true;

      this.$nextTick(() => {
        (this.$refs.editValueField as HTMLInputElement).focus();
      });
    },

    async editGasto(item: Gasto) {
      this.loading = true
      await this.HTTP("post", "/gasto/edit-gasto", item)
        .then(async (resp) => {
          await this.getAllGastos();
          eventBus.value.showToast(resp.message, "success");
          this.confirmEditDesc = false;
          this.loading = false
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
          this.loading = false
        });
    },

    async editValor(item: Gasto) {
      this.loading = true
      const valorFormatado = this.selectedValueEdit.VALOR_GASTO?.toString() || "";
      const valorNumerico = Number(
        valorFormatado.replace(/\s/g, "").replace(/\./g, "").replace(",", ".")
      );

      if (!valorNumerico || valorNumerico === 0) {
        eventBus.value.showToast("Por favor preencha o novo valor do gasto", "info");
        return;
      }

      item.VALOR_GASTO = valorNumerico;

      await this.HTTP("post", "/gasto/edit-valor", item)
        .then(async (resp) => {
          await this.getAllGastos();
          this.confirmEditValue = false;
          eventBus.value.showToast(resp.message, "success");
          this.loading = false
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
          this.loading = false
        });
    },

    async deleteGasto(item: Gasto) {
      this.loading = true
      let params = {
        id: item.ID_GASTO,
      };

      await this.HTTP("delete", "/gasto/delete-gasto", params)
        .then(async (resp) => {
          await this.getAllGastos();
          eventBus.value.showToast(resp.message, "success");
          this.selectedItem = null;
          this.confirmDelete = false;
          this.loading = false
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
          this.loading = false
        });
    },

    async getAllGastos() {
      await this.HTTP("get", "/gasto/get-gastos")
        .then(async (resp) => {
          this.gastos = resp.resp
            .map((gasto: Gasto) => ({
              ID_GASTO: gasto.ID_GASTO,
              DESC_GASTO: gasto.DESC_GASTO,
              VALOR_GASTO: gasto.VALOR_GASTO,
            }))
            .sort((a: any, b: any) => a.ID_GASTO - b.ID_GASTO);
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
        });
    },
  },
  async mounted() {
    await this.getAllGastos();
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

.total-gastos {
  display: block;
  margin-top: 8px;
  color: #33b3b3;
  font-weight: bold;
  font-size: 16px;
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
  border-radius: 8px;
  border-left: 4px solid #33b3b3;
}

.valor {
  color: #33b3b3;
  font-weight: 600;
  font-size: 15px;
}

.descricao {
  color: #ffffff;
  font-size: 15px;
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
