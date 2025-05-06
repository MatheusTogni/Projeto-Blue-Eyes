import { Request, Response } from 'express';
import tarefaService from '../services/tarefaService';

const tarefaController = {
    async getTarefas(req: Request, res: Response) {
        try {
            const resp = await tarefaService.getTarefas();
            res.status(200).json({ resp });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar tarefas!' });
        }
    },
    async addTarefa(req: Request, res: Response) {
        try {
            const resp = await tarefaService.addTarefa(req.body);
            res.status(200).json({ resp, message: "Tarefa adicionada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar tarefa!' });
        }
    },
    async endTarefa(req: Request, res: Response) {
        try {
            const resp = await tarefaService.endTarefa(req.body);
            res.status(200).json({ resp, message: "Tarefa finalizada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao finalizar tarefa!' });
        }
    },
    async editTarefa(req: Request, res: Response) {
        try {
            const resp = await tarefaService.editTarefa(req.body);
            res.status(200).json({ resp, message: "Tarefa editada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao editar tarefa!' });
        }
    },
}

export default tarefaController