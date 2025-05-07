import { Request, Response } from 'express';
import loginService from '../services/loginService';

const loginController = {
    async login(req: Request, res: Response) {
        try {
            const { login, senha } = req.body;
            const isValid = await loginService.validarLogin(login, senha);

            if (!isValid) {
                res.status(401).json({login: "error", message: 'Login ou senha inválidos' });
              }

              res.status(200).json({ login: "success", message: 'Login bem-sucedido' });
        } catch (error) {
            res.status(500).json({ message: 'Erro Fazer Login, verifique se o Usuário e a Senha estão Corretos!' });
        }
    },
};

export default loginController;