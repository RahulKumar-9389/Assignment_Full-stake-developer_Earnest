import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    status: 'pending' | 'completed';
    dueDate: Date;
    userId: mongoose.Schema.Types.ObjectId;
}


const taskSchema: Schema<ITask> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: [true, 'Due Date is required']
    },
    userId:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,
    }
);


export default mongoose.model<ITask>("Task", taskSchema);