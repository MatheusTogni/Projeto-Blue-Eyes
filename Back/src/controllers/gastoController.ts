import { Request, Response } from 'express';
import gastoService from '../services/gastoService';

const gastoController = {
    async addGasto(req: Request, res: Response) {
        try {
            const resp = await gastoService.addGasto(req.body);
            res.status(200).json({ resp, message: 'Gasto adicionado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar gasto!' });
        }
    },
    async deleteGasto(req: Request, res: Response) {
        try {
            const resp = await gastoService.deleteGasto(req.body);
            res.status(200).json({ resp, message: 'Gasto deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar gasto!' });
        }
    },
    async getGastos(req: Request, res: Response) {
        try {
            const resp = await gastoService.getGastos();
            res.status(200).json({ resp });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar gastos!' });
        }
    },
    async editGasto(req: Request, res: Response) {
        try {
            const resp = await gastoService.editGasto(req.body);
            res.status(200).json({ resp, message: 'Descrição do Gasto editada com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao editar Descrição do Gasto!' });
        }
    },
    async editValorGasto(req: Request, res: Response) {
        try {
            const resp = await gastoService.editValorGasto(req.body);
            res.status(200).json({ resp, message: 'Valor do Gasto editada com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao editar Valor do Gasto!' });
        }
    },
};

export default gastoController;