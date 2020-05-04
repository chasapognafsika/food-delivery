import { Request, Response, NextFunction } from 'express';
import OrderModel from './order.model';

export default class OrderController {

 /**
     * Get all
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            let result = await OrderModel.find().exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'it works! We got all orders',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get orders',
                err: err
            });
        }
    }

        /**
     * getUser
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    public static async getOrder(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            const _id: String = req.params.id;
            let result = await OrderModel.findOne({ _id }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Successfull got an order',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get the order',
                err: err
            });
        }
    }

    /**
     * Get all
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async createOrder(req: Request, res: Response, next: NextFunction) {
        let items  = Array.from(req.body.items);
        let grossTotal = req.body.grossTotal;
        let currency = req.body.orderCurrency;
        let deliveryAddress = req.body.orderAddress;
 
        // Create model
        let orderModel = new OrderModel({
            items,
            grossTotal,
            currency,
            deliveryAddress
        });

        // Save
        await orderModel.save();

        res.send({
            message: `Created order with the id: ${orderModel._id}`,
            model: orderModel
        });
    }

    public static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const _id:String = req.params;
        
        try {

            // 
            // Get data
            let result = await OrderModel.findOneAndRemove({ _id }, {
                ...req.body,
                deletedAt: new Date()
            }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Sucessfully deleted order',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not delete the order',
                err: err
            });
        }
    }

    public static async updateOrder(req: Request, res: Response, next: NextFunction) {
        const _id:String = req.params;
        
        try {

            // Get data
            let result = await OrderModel.findOneAndUpdate({ _id }, {
                ...req.body,
                updatedAt: new Date()
            }).exec();
            const status = res.statusCode;

            // Response
            res.send({
                message: 'Sucessfully updated order',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not create the order',
                err: err
            });
        }
    }
    
}