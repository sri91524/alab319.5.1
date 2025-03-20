import mongoose from "mongoose";


const gradeSchema = new mongoose.Schema({
    learner_id:{
        type: Number,
        required: true
    },
    class_id:{
        type: Number,
        required: true
    },
    scores:[{
        type: {
            type: String,
            enum: ['exam', 'quiz', 'homework'],
            required: true
        },
        score: {
            type: mongoose.Schema.Types.Decimal128,
            required: true
        }       
    }]
});

export default mongoose.model("grade", gradeSchema);