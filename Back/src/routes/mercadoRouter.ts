import { Router } from 'express';
import mercadoController from '../controllers/mercadoController';

const router = Router();

router.post('/add-gasto', mercadoController.addGasto)
router.post('/edit-gasto', mercadoController.editGasto)
router.post('/edit-valor', mercadoController.editValorGasto)
router.delete('/delete-gasto', mercadoController.deleteGasto)
router.get('/get-items', mercadoController.getItens)


export default router;