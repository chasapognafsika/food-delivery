import { Router } from 'express';
import ItemController from './item.controller';

export class ItemRouter {

    public router: Router

    /*--------  Constructor  --------*/
    constructor() {
        // Set router
        this.router = Router();
        this.init();
    }

    /*--------  Methods  --------*/
    /**
     * Init all routes in this router
     */
    init () {
        this.router.put('/:_id', ItemController.updateItem);
        this.router.get('/', ItemController.getAll);
        this.router.get('/:_id', ItemController.getItem);
        this.router.post('/', ItemController.createItem);
        this.router.delete('/:_id', ItemController.deleteItem);
    }
}

export default new ItemRouter().router;