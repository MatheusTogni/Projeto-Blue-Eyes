import { Router } from 'express';
import tarefaController from '../controllers/tarefaController';

const router = Router();

router.get('/get-tarefas', tarefaController.getTarefas);
router.post('/add-tarefa', tarefaController.addTarefa);
router.post('/end-tarefa', tarefaController.endTarefa);
router.post('/edit-tarefa', tarefaController.editTarefa);

export default router;