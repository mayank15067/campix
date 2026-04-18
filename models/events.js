const { time } = require("console");
const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const eventSchema= new Schema({
    organized: {
        type: String,
        required: true,
    },
    headname : {
        type: String,
        required:true,
    },
    contact: {
        type: String,
        required: true,
    },
    title:{ 
        type: String,
        required: true,
    },   
    description:{ 
        type: String,
        required: true,
    },   
    venue:{
        type:String,
        required: true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
});
const Event=mongoose.model("Event",eventSchema);
module.exports=Event;