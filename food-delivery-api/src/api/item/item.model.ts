import { Schema, model } from 'mongoose';

let ItemSchema: Schema = new Schema({
    id: {
      type: Number,
    },
    title: {
        type: String,
        required: true,
        unique: true
      },
    type: {
        type: String,
        required: true,
        default: ''
      },
    desc: {
        type: String,
        default:'',
      },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        default: ''
      },
    inStock: {
      type: Number,
      default: 0,
      required: true
    }
});


export default model('Item', ItemSchema);