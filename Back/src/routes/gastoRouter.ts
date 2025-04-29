import { Router } from 'express';
import gastoController from '../controllers/gastoController';

const router = Router();

router.post('/add-gasto', gastoController.addGasto)
router.post('/edit-gasto', gastoController.editGasto)
router.post('/edit-valor', gastoController.editValorGasto)
router.delete('/delete-gasto', gastoController.deleteGasto)
router.get('/get-gastos', gastoController.getGastos)


export default router;