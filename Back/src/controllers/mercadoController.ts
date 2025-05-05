import { Request, Response } from 'express';
import mercadoService from '../services/mercadoService';

const mercadoController = {
    async addItem(req: Request, res: Response) {
        try {
            const resp = await mercadoService.addItem(req.body);
            res.status(200).json({ resp, message: 'Item adicionado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar item!' });
        }
    },
    async deleteItem(req: Request, res: Response) {
        try {
            const resp = await mercadoService.deleteItem(req.body);
            res.status(200).json({ resp, message: 'Item deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar item!' });
        }
    },
    async getItens(req: Request, res: Response) {
        try {
            const resp = await mercadoService.getItens();
            res.status(200).json({ resp });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar itens!' });
        }
    },
    async editItem(req: Request, res: Response) {
        try {
            const resp = await mercadoService.editItem(req.body);
            res.status(200).json({ success: true, resp, message: 'Descrição do Item editada com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao editar Descrição do Item!' });
        }
    },
    async editValor(req: Request, res: Response) {
        try {
            const resp = await mercadoService.editValor(req.body);
            res.status(200).json({ success: true, resp, message: 'Valor do Item editado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao editar Valor do Item!' });
        }
    },
    async endShopping(req: Request, res: Response) {
        try {
            const resp = await mercadoService.endShopping(req.body);
            res.status(200).json({ success: true, resp, message: 'Compras Finalizadas com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao finalizar Compras' });
        }
    },
};

export default mercadoController;