import { Request, Response, NextFunction } from 'express';
import ItemModel from './item.model';

export default class ItemController {

    /**
     * Get all
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // Get data
            let result = await ItemModel.find().exec();
            const status = res.statusCode;

            // Response
            res.send({
                message: 'it works! We got all items',
                result: result,
                status: status
            });
        } catch (err) {
 
            // Error response
            res.send({
                message: 'Could not get items',
                err: err
            });
        }
    }

    /**
     * getItem
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    public static async getItem(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            const id: String = req.params._id;
            let result = await ItemModel.findOne({ id }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Successfull got an item',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get item',
                err: err
            });
        }
    }

    /**
     * Create
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async createItem(req: Request, res: Response, next: NextFunction) {
        
        const title:String = req.body.title;
        const id:Number = req.body.id;
        const type:String = req.body.type;
        const desc:String = req.body.desc;
        const photo:String = req.body.photo;
        const price:Number = req.body.price;
        const inStock:Number = req.body.inStock;
    

        // Create model
        let model = new ItemModel({
            id,
            title,
            type,
            desc,
            photo,
            price,
            inStock
        });
        // 
        // Save
        await model.save();

        res.send({
            message: 'Created!',
            model: model
        });
    }

    public static async deleteItem(req: Request, res: Response, next: NextFunction) {
        const _id:String = req.params;
        
        try {

            // 
            // Get data
            let result = await ItemModel.findOneAndRemove({ _id }, {
                ...req.body,
                deletedAt: new Date()
            }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Sucessfully deleted item',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not delete the item',
                err: err
            });
        }
    }

    public static async updateItem(req: Request, res: Response, next: NextFunction) {
        const _id:String = req.params;
        
        try {

            // 
            // Get data
            const username: String = req.params._id;
            let result = await ItemModel.findOneAndUpdate({ _id }, {
                ...req.body,
                updatedAt: new Date()
            }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Sucessfully updated item',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not create the item',
                err: err
            });
        }
    }
}