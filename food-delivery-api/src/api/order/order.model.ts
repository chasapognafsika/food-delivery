import { Schema, model, Document } from 'mongoose';

let OrderSchema: Schema = new Schema({
    items: {
        type: Array,
        required: true,
        default: []
    },
    grossTotal: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    }
});

interface OrderSchemaDoc extends Document {}

export default model<OrderSchemaDoc>('Order', OrderSchema);

