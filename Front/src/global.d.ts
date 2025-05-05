import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    HTTP: (
      method: "get" | "post" | "put" | "delete",
      url: string,
      data?: any
    ) => Promise<any>;
  }
}
