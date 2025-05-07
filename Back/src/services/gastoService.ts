import pool from '../db';

const gastoService = {
  async addGasto(params: any) {
    console.log(params)
    try {
      const sql = `
        INSERT INTO "GASTOS" ("DESC_GASTO", "VALOR_GASTO")
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [params.descricao, params.valor];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao inserir gasto:", error);
      throw error;
    }
  },

  async deleteGasto(params: any) {
    try {
      const sql = `
        DELETE FROM "GASTOS" WHERE "ID_GASTO" = $1
      `;
      const values = [params.id];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao inserir gasto:", error);
      throw error;
    }
  },

  async getGastos() {
    try {
      const sql = `
        SELECT "DESC_GASTO", "VALOR_GASTO", "ID_GASTO" FROM "GASTOS"
      `;
      const resp = await pool.query(sql);
      return resp.rows;
    } catch (error) {
      console.error("Erro ao inserir gasto:", error);
      throw error;
    }
  },

  async editGasto(params: any) {
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
      console.error("Erro ao editar descrição do gasto:", error);
      throw error;
    }
  },

  async editValorGasto(params: any) {
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
      console.error("Erro ao editar valor do gasto:", error);
      throw error;
    }
  }
};

export default gastoService;
