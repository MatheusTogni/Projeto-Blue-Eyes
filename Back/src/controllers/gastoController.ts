import { Request, Response } from 'express';
import gastoService from '../services/gastoService';

const gastoController = {
    addGasto: async (req: Request, res: Response) => {
        try {
            const resp = await gastoService.addGasto(req.body);
            res.status(200).json({ success: true, resp, message: 'Gasto adicionado com sucesso!' });
        } catch (error) {
            console.error('Erro ao adicionar gasto:', error);
            res.status(500).json({ success: false, message: 'Erro ao adicionar gasto!' });
        }
    },
    deleteGasto: async (req: Request, res: Response) => {
        try {
            const resp = await gastoService.deleteGasto(req.body);
            res.status(200).json({ success: true, resp, message: 'Gasto deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar gasto:', error);
            res.status(500).json({ success: false, message: 'Erro ao deletar gasto!' });
        }
    },
    getGastos: async (req: Request, res: Response) => {
        try {
            const resp = await gastoService.getGastos();
            res.status(200).json({ success: true, resp });
        } catch (error) {
            console.error('Erro ao buscar gastos!', error);
            res.status(500).json({ success: false, message: 'Erro ao buscar gastos!' });
        }
    },
    editGasto: async (req: Request, res: Response) => {
        try {
            const resp = await gastoService.editGasto(req.body);
            res.status(200).json({ success: true, resp, message: 'Descrição do Gasto editada com sucesso!' });
        } catch (error) {
            console.error('Erro ao editar Descrição do Gasto!', error);
            res.status(500).json({ success: false, message: 'Erro ao editar Descrição do Gasto!' });
        }
    },
    editValorGasto: async (req: Request, res: Response) => {
        try {
            const resp = await gastoService.editValorGasto(req.body);
            res.status(200).json({ success: true, resp, message: 'Valor do Gasto editada com sucesso!' });
        } catch (error) {
            console.error('Erro ao editar Valor do Gasto!', error);
            res.status(500).json({ success: false, message: 'Erro ao editar Valor do Gasto!' });
        }
    },
};

export default gastoController;