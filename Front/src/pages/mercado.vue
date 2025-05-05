<template>
  <Drawer>
    <div class="container">
      <v-card class="card-mercado">
        <v-card-title class="title">
          <v-icon left color="#33b3b3">mdi-cart-variant</v-icon>
          Mercado
        </v-card-title>
        <div class="px-4">
          <v-list class="transparent scrollable-list" bg-color="transparent">
            <v-list-item
              v-for="item in items"
              :key="item.ID_MERCADO"
              class="mercado-item"
            >
              <v-btn class="pa-0" variant="text" @click="openDialogEditDesc(item)">
                <v-list-item-title class="descricao">{{
                  item.DESC_MERCADO
                }}</v-list-item-title>
              </v-btn>
              <template v-slot:append>
                <v-btn class="pa-0" variant="text" @click="openDialogEditValue(item)">
                  <span class="valor">
                    R$
                    {{
                      item.VALOR_MERCADO.toLocaleString("pt-BR", {
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
          <span class="total-mercado">Total: {{ totalItems }}</span>
        </v-card>
        <v-card class="input-card mb-6 mt-6">
          <v-row align="center" class="pa-4">
            <v-col cols="12" md="7" lg="7">
              <v-text-field
                label="Item"
                variant="outlined"
                density="comfortable"
                color="#33b3b3"
                prepend-inner-icon="mdi-cart-arrow-down"
                v-model="descricao"
                hide-details
                single-line
                @keydown.enter="addItem"
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
                single-line
                @input="handleInput"
                @keydown.enter="addItem"
              />
            </v-col>

            <v-col cols="12" md="1" lg="1" class="text-center">
              <v-btn
                class="add-button"
                color="#33b3b3"
                block
                size="large"
                elevation="2"
                fab
                @click="addItem"
                >+</v-btn
              >
            </v-col>

            <v-col cols="12" md="1" lg="1" class="text-center">
              <v-btn
                class="add-button"
                color="success"
                block
                size="large"
                elevation="2"
                :disabled="items.length == 0"
                @click="openDialogEndShopping"
                >✔</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card>
      <v-dialog v-model="confirmDelete" max-width="600px">
        <v-card>
          <span class="title">Excluir Item</span>
          <v-card-text>Você tem certeza que deseja excluir este item?</v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn
              style="background-color: grey; color: white"
              @click="confirmDelete = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              style="background-color: #f44336; color: white"
              @click="selectedItem && deleteItem(selectedItem)"
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
            v-model="selectedItemEdit.DESC_MERCADO"
            hide-details
            @keydown.enter="selectedItemEdit && editItem(selectedItemEdit)"
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
              @click="selectedItemEdit && editItem(selectedItemEdit)"
            >
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmEndShopping" max-width="600px">
        <v-card class="pa-2">
          <span class="title">Finalizar Compras</span>
          <v-card-actions class="d-flex justify-end mt-4">
            <v-btn
              style="background-color: grey; color: white"
              @click="confirmEndShopping = false"
            >
              Cancelar
            </v-btn>
            <v-btn style="background-color: #33b3b3; color: white" @click="endShopping">
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
            v-model="selectedValueEdit.VALOR_MERCADO"
            hide-details
            @input="handleInputValue"
            @keydown.enter="selectedValueEdit && editValor(selectedValueEdit)"
            single-line
          />
          <v-card-actions class="d-flex justify-end mt-4">
            <v-btn
              style="background-color: grey; color: white"
              @click="confirmEditValue = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              style="background-color: #33b3b3; color: white"
              @click="selectedValueEdit && editValor(selectedValueEdit)"
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
import type { Mercado } from "@/interfaces/Mercado";
export default defineComponent({
  components: {
    Drawer,
  },
  data() {
    return {
      descricao: "",
      valor: "",
      items: [] as Mercado[],
      confirmDelete: false,
      confirmEditDesc: false,
      confirmEditValue: false,
      confirmEndShopping: false,
      total: 0,
      selectedItem: null as Mercado | null,
      selectedItemEdit: null as any,
      selectedValueEdit: null as any,
    };
  },

  computed: {
    totalItems(): string {
      this.total = this.items.reduce((sum, item) => sum + Number(item.VALOR_MERCADO), 0);
      return this.total.toLocaleString("pt-BR", {
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
          style: "currency",
          currency: "BRL",
        })
        .replace("R$", "")
        .trim();
    },

    handleInput(event: Event) {
      const input = event.target as HTMLInputElement;
      this.valor = this.formatCurrency(input.value);
    },

    handleInputValue(event: Event) {
      const input = event.target as HTMLInputElement;
      this.selectedValueEdit.VALOR_MERCADO = this.formatCurrency(input.value);
    },

    openDialog(item: Mercado) {
      this.selectedItem = item;
      this.confirmDelete = true;
    },

    openDialogEditDesc(item: Mercado) {
      this.selectedItemEdit = { ...item };
      this.confirmEditDesc = true;

      this.$nextTick(() => {
        (this.$refs.editDescField as HTMLInputElement).focus();
      });
    },

    openDialogEditValue(item: Mercado) {
      this.selectedValueEdit = { ...item };
      this.confirmEditValue = true;

      this.$nextTick(() => {
        (this.$refs.editValueField as HTMLInputElement).focus();
      });
    },

    openDialogEndShopping() {
      this.confirmEndShopping = true;
    },

    async editItem(item: Mercado) {
      if (
        !this.selectedItemEdit.DESC_MERCADO ||
        this.selectedItemEdit.DESC_MERCADO.trim() === ""
      ) {
        eventBus.value.showToast("Por favor preencha a nova descrição do item", "info");
        return;
      }
      await this.HTTP("post", "/mercado/edit-item", item)
        .then(async (resp) => {
          eventBus.value.showToast(resp.message, "success");
          this.confirmEditDesc = false;
          await this.getAllItems();
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
        });
    },

    async deleteItem(item: Mercado) {
      await this.HTTP("delete", "/mercado/delete-item", item)
        .then(async (resp) => {
          eventBus.value.showToast(resp.message, "success");
          this.confirmDelete = false;
          await this.getAllItems();
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
        });
    },

    async editValor(item: Mercado) {
      const valorFormatado = this.selectedValueEdit.VALOR_MERCADO?.toString() || "";
      const valorNumerico = Number(
        valorFormatado.replace(/\s/g, "").replace(/\./g, "").replace(",", ".")
      );

      if (!valorNumerico || valorNumerico === 0) {
        eventBus.value.showToast("Por favor preencha o novo valor do item", "info");
        return;
      }

      item.VALOR_MERCADO = valorNumerico;

      await this.HTTP("post", "/mercado/edit-valor", item)
        .then(async (resp) => {
          eventBus.value.showToast(resp.message, "success");
          this.confirmEditValue = false;
          await this.getAllItems();
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
        });
    },

    async addItem() {
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

      await this.HTTP("post", "/mercado/add-item", params)
        .then((resp) => {
          eventBus.value.showToast(resp.message, "success");
          this.getAllItems();
          (this.descricao = ""), (this.valor = "");
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
        });
    },

    async getAllItems() {
      try {
        const resp = await this.HTTP("get", "/mercado/get-items");
        this.items = resp.resp;
      } catch (error) {
        console.error("Error:", error);
        eventBus.value.showToast("Erro ao buscar items.", "error");
      }
    },

    async endShopping() {
      let params = {
        total: this.total.toFixed(2),
      };
      await this.HTTP("post", "/mercado/end-shopping", params)
        .then((resp) => {
          eventBus.value.showToast(resp.message, "success");
          this.getAllItems();
          this.confirmEndShopping = false;
        })
        .catch((error) => {
          console.error("Error:", error);
          eventBus.value.showToast(error.message, "error");
        });
    },
  },
  async mounted() {
    await this.getAllItems();
  },
});
</script>

<style scoped>
.container {
  background: #1a1a1a;
  padding: 20px;
}

.card-mercado {
  background: #212121 !important;
  border: 2px solid #33b3b3;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3) !important;
}

.total-mercado {
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

.mercado-item {
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
