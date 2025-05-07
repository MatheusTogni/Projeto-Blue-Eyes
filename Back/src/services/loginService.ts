import pool from '../db';
import bcrypt from 'bcrypt';

const loginService = {
    async validarLogin(login: string, senha: string) {
        try {
            const sql = `SELECT "SENHA_HASH" FROM "USUARIOS" WHERE "LOGIN_USUARIO" = $1`;
            const result = await pool.query(sql, [login]);

            if (result.rows.length === 0) {
                return false;
            }
            const senhaHash = result.rows[0].SENHA_HASH;
            const senhaCorreta = await bcrypt.compare(senha, senhaHash);

            return senhaCorreta;
        } catch (error) {
            console.error('Erro na validação de login:', error);
            throw error;
        }
    },
};

export default loginService;
