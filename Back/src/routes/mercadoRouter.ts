import { Router } from 'express';
import mercadoController from '../controllers/mercadoController';

const router = Router();

router.post('/add-item', mercadoController.addItem)
router.post('/edit-item', mercadoController.editItem)
router.post('/edit-valor', mercadoController.editValor)
router.post('/end-shopping', mercadoController.endShopping)
router.delete('/delete-item', mercadoController.deleteItem)
router.get('/get-items', mercadoController.getItens)


export default router;