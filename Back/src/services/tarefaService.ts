import pool from '../db';

const tarefaService = {
    getTarefas: async () => {
        try {
            const sql = `
            SELECT "ID_TAREFA", "DESC_TAREFA" FROM "TAREFAS"
          `;
            const resp = await pool.query(sql);
            return resp.rows;
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            throw error;
        }
    },

    addTarefa: async (params: any) => {
        try {
            const sql = `
            INSERT INTO "TAREFAS" ("DESC_TAREFA")
            VALUES ($1)
            RETURNING *;
          `;
            const values = [params.descricao];
            const resp = await pool.query(sql, values);
            return resp.rows[0];
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            throw error;
        }
    },

    endTarefa: async (params: any) => {
        try {
            const sql = `
            DELETE FROM "TAREFAS" WHERE "ID_TAREFA" = $1
          `;
            const values = [params.id_tarefa];
            const resp = await pool.query(sql, values);
            return resp.rows[0];
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            throw error;
        }
    },

    editTarefa: async (params: any) => {
        try {
            const sql = `
            UPDATE "TAREFAS" SET "DESC_TAREFA" = $1
            WHERE "ID_TAREFA" = $2
            RETURNING *;
          `;
            const values = [params.descricao, params.id_tarefa];
            const resp = await pool.query(sql, values);
            return resp.rows[0];
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            throw error;
        }
    },
}

export default tarefaService;

