import pool from '../db';

const mercadoService = {
  async addItem(params: any) {
    try {
      const sql = `
        INSERT INTO "MERCADO" ("DESC_MERCADO", "VALOR_MERCADO")
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [params.descricao, params.valor];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao inserir item:", error);
      throw error;
    }
  },

  async deleteItem(params: any) {
    try {
      const sql = `
        DELETE FROM "MERCADO" WHERE "ID_MERCADO" = $1
      `;
      const values = [params.ID_MERCADO];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      throw error;
    }
  },

  async getItens() {
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

  async editItem(params: any) {
    try {
      const sql = `
        UPDATE "MERCADO" 
        SET "DESC_MERCADO" = $1 
        WHERE "ID_MERCADO" = $2
      `;
      const values = [params.DESC_MERCADO, params.ID_MERCADO];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao editar descrição do item:", error);
      throw error;
    }
  },

  async editValor(params: any) {
    try {
      const sql = `
        UPDATE "MERCADO" 
        SET "VALOR_MERCADO" = $1 
        WHERE "ID_MERCADO" = $2
      `;
      const values = [params.VALOR_MERCADO, params.ID_MERCADO];
      const resp = await pool.query(sql, values);

      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao editar valor do item:", error);
      throw error;
    }
  },

  async endShopping(params: any) {
    try {
      const sqlInsert = `
        INSERT INTO "GASTOS" ("DESC_GASTO", "VALOR_GASTO")
        VALUES ('Mercado', $1)
      `;
      const values = [params.total];
      const resp = await pool.query(sqlInsert, values);

      const sqlDelete = `DELETE FROM "MERCADO"
      `
      await pool.query(sqlDelete)
      return resp.rows[0];
    } catch (error) {
      console.error("Erro ao finalizar as compras:", error);
      throw error;
    }
  }
};

export default mercadoService;
