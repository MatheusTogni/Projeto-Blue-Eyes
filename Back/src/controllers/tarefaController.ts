import { Request, Response } from 'express';
import tarefaService from '../services/tarefaService';

const tarefaController = {
    getTarefas: async (req: Request, res: Response) => {
        try {
            const resp = await tarefaService.getTarefas();
            res.status(200).json({ success: true, resp });
        } catch (error) {
            console.error('Erro ao buscar tarefas!', error);
            res.status(500).json({ success: false, message: 'Erro ao buscar tarefas!' });
        }
    },
    addTarefa: async (req: Request, res: Response) => {
        try {
            const resp = await tarefaService.addTarefa(req.body);
            res.status(200).json({ success: true, resp });
        } catch (error) {
            console.error('Erro ao adicionar tarefa!', error);
            res.status(500).json({ success: false, message: 'Erro ao adicionar tarefa!' });
        }
    },
    endTarefa: async (req: Request, res: Response) => {
        try {
            const resp = await tarefaService.endTarefa(req.body);
            res.status(200).json({ success: true, resp });
        } catch (error) {
            console.error('Erro ao finalizar tarefa!', error);
            res.status(500).json({ success: false, message: 'Erro ao finalizar tarefa!' });
        }
    },
    editTarefa: async (req: Request, res: Response) => {
        try {
            const resp = await tarefaService.editTarefa(req.body);
            res.status(200).json({ success: true, resp });
        } catch (error) {
            console.error('Erro ao editar tarefa!', error);
            res.status(500).json({ success: false, message: 'Erro ao editar tarefa!' });
        }
    },
}

export default tarefaController