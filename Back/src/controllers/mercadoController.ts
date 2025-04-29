import { Request, Response } from 'express';
import mercadoService from '../services/mercadoService';

const mercadoController = {
    addGasto: async (req: Request, res: Response) => {
        try {
            const resp = await mercadoService.addGasto(req.body);
            res.status(200).json({ success: true, resp, message: 'Gasto adicionado com sucesso!' });
        } catch (error) {
            console.error('Erro ao adicionar gasto:', error);
            res.status(500).json({ success: false, message: 'Erro ao adicionar gasto!' });
        }
    },
    deleteGasto: async (req: Request, res: Response) => {
        try {
            const resp = await mercadoService.deleteGasto(req.body);
            res.status(200).json({ success: true, resp, message: 'Gasto deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar gasto:', error);
            res.status(500).json({ success: false, message: 'Erro ao deletar gasto!' });
        }
    },
    getItens: async (req: Request, res: Response) => {
        try {
            const resp = await mercadoService.getItens();
            res.status(200).json({ success: true, resp });
        } catch (error) {
            console.error('Erro ao buscar gastos!', error);
            res.status(500).json({ success: false, message: 'Erro ao buscar gastos!' });
        }
    },
    editGasto: async (req: Request, res: Response) => {
        try {
            const resp = await mercadoService.editGasto(req.body);
            res.status(200).json({ success: true, resp, message: 'Descrição do Gasto editada com sucesso!' });
        } catch (error) {
            console.error('Erro ao editar Descrição do Gasto!', error);
            res.status(500).json({ success: false, message: 'Erro ao editar Descrição do Gasto!' });
        }
    },
    editValorGasto: async (req: Request, res: Response) => {
        try {
            const resp = await mercadoService.editValorGasto(req.body);
            res.status(200).json({ success: true, resp, message: 'Valor do Gasto editada com sucesso!' });
        } catch (error) {
            console.error('Erro ao editar Valor do Gasto!', error);
            res.status(500).json({ success: false, message: 'Erro ao editar Valor do Gasto!' });
        }
    },
};

export default mercadoController;