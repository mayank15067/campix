let express=require("express");
let app= express();
let path=require("path");
const { v4: uuidv4 } = require('uuid');
const mongoose=require("mongoose");
const ejs=require("ejs");
const methodOverride = require('method-override');
require("dotenv").config();

const Complaint= require("./models/complaints.js");
const Event= require("./models/events.js");



app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:"true"}));

main().then(()=>{
    console.log ("connection succesful");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(process.env.MONGO_URL)};

let port=3000;
app.listen(port,()=>{
    console.log("server is listening on the port ");
})
app.get("/",(req,res)=>{
    res.render("home.ejs");
})
app.get("/newcomplaints",(req,res)=>{
    res.render("newcomplaint.ejs");
})
app.get("/newevent",(req,res)=>{
    res.render("newevent.ejs");
})
app.post("/newcomplaints",async(req,res)=>{
    const complaints= new Complaint(req.body);
    console.log(complaints);
    await complaints.save();
    res.send(" data added succesfully ");
})
app.post("/newevent",async(req,res)=>{
    const events= new Event(req.body);
    await events.save();
    res.send(" data added succesfully ");
})
app.get("/allcomplaints",async(req,res)=>{
     const complaints=await Complaint.find({});
    res.render("allcomplaints.ejs",{complaints});
    });
app.get("/allcomplaints/upvote/:id", async (req, res) => {
    let id = req.params.id;

    const updated = await Complaint.findByIdAndUpdate(
        id,
        { $inc: { votes: 1 } },
        { new: true }   // VERY IMPORTANT
    );

    res.json({ votes: updated.votes });
});


app.get("/allcomplaints/downvote/:id", async (req, res) => {
    let id = req.params.id;

    const updated = await Complaint.findByIdAndUpdate(
        id,
        { $inc: { votes: -1 } },
        { new: true }
    );

    res.json({ votes: updated.votes });
});
app.get("/allevents",async(req,res)=>{
     const events =await Event.find({});
    res.render("allevents.ejs",{events});
    });
app.get("/admin",async(req,res)=>{
    res.render("adminindex.ejs");
})
app.get("/admin/complaints",async(req,res)=>{
 const complaints=await Complaint.find({});
    res.render("allcomplainadmin.ejs",{complaints});
})
app.get("/admin/complaints/:id/:status",async(req,res)=>{
    let id=req.params.id;
    let status= req.params.status;
    console.log(status,id);
    await Complaint.findByIdAndUpdate(id,{"status":status});
    const complaints=await Complaint.find({});
    res.render("allcomplainadmin.ejs",{complaints});
});
app.get("/admin/events",async(req,res)=>{
    const events =await Event.find({});
    res.render("alladminevents.ejs",{events});
})
