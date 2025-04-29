import pool from '../db';

const mercadoService = {
  addGasto: async (params: any) => {
    try {
      const sql = `
        INSERT INTO "GASTOS" ("DESC_GASTO", "VALOR_GASTO", "DATA_GASTO")
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [params.descricao, params.valor, params.data];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao inserir item:", error);
      throw error;
    }
  },

  deleteGasto: async (params: any) => {
    try {
      const sql = `
        DELETE FROM "GASTOS" WHERE "ID_GASTO" = $1
      `;
      const values = [params.id];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      throw error;
    }
  },

  getItens: async () => {
    try {
      const sql = `
        SELECT "DESC_MERCADO", "VALOR_MERCADO", "ID_MERCADO" FROM "MERCADO"
      `;
      const resp = await pool.query(sql);
      return resp.rows;
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      throw error;
    }
  },

  editGasto: async (params: any) => {
    try {
      const sql = `
        UPDATE "GASTOS" 
        SET "DESC_GASTO" = $1 
        WHERE "ID_GASTO" = $2
      `;
      const values = [params.DESC_GASTO, params.ID_GASTO];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao editar descrição do item:", error);
      throw error;
    }
  },

  editValorGasto: async (params: any) => {
    try {
      const sql = `
        UPDATE "GASTOS" 
        SET "VALOR_GASTO" = $1 
        WHERE "ID_GASTO" = $2
      `;
      const values = [params.VALOR_GASTO, params.ID_GASTO];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao editar valor do item:", error);
      throw error;
    }
  }
};

export default mercadoService;
