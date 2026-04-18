const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const complaintSchema= new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname : {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description:{ 
        type: String,
        required: true,},   
    enrollment:{
        type:String,
        required: true,
    },
    year:{
        type:Number,
        required:true,
    },
    sem:{
        type:Number,
        required:true,
    },
    votes:{
        type:Number,
        default:0,
    },
    status:{
        type:String,
        default:"pending",
    },
});
const Complaint=mongoose.model("Complaint",complaintSchema);
module.exports= Complaint;