let express = require('express');
let app = express();


//BODY PARSER
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//STATIC FOLDER
app.use(express.static(__dirname + '/public/dist'));

//MONGO DB
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/examV3');

const path = require('path')

var Schema = mongoose.Schema;



// //MODEL SCHEMAS
let UserSchema = new mongoose.Schema({
    name: {type: String},
})

let BidSchema = new mongoose.Schema({
    bid1 :{ amount:0, product:''},
    bid2 :{ amount:0, product:''},
    bid3 :{ amount:0, product:''},
    _userName:''
})



// //DECLEARING MODELS
mongoose.model('User', UserSchema);
mongoose.model('Bid', BidSchema);


let User = mongoose.model('User');
let Bid = mongoose.model('Bid');


// //ROUTES

// //CREATE USER
app.post('/users',(req, res)=>{
    User.findOne({name:req.body.name},(err, user)=>{
        if(user){
            return res.json(user)

        }else if(user == null){
            User.create(req.body, (err,user)=>{
                if(err){
                    console.log(err)
                }else{
                    return res.json(user)
                }
            })
        }else{
            console.log(err)
        }
    })
}) 

// GET ALL USERS
// app.get('/getAllUsers',(req,res)=>{
//     User.find({},(err, users)=>{
//         if(err){
//             console.log(err)
//         }else{
//             return res.json(users);
//         }
//     })
// })

// GET ALL BIDS
app.get('/getAllBids',(req,res)=>{
    Bid.find({},(err, bids)=>{
        if(err){
            console.log(err)
        }else{
            console.log('at server', bids)
            return res.json(bids);
        }
    })
})


//CREATE BID
app.post("/newBid", function (req, response){ 

    var newBid = new Bid(req.body)
    newBid.save(function(err){
        if(err){
            console.log('error saving bid',err)    
        } else {
            Bid.find({},(err, bids)=>{
                if(err){
                    console.log('error finding all bids',err)
                }else{
                    return response.json(bids);
                }
            })
            }
    });
})

// DELETE BIDS
app.delete('/deleteAllBids',(req,res, next)=>{
    Bid.remove({},(err, data)=>{
        if(err){
            console.log(err)
        }else{
            console.log('deleting')
            return res.json(data);
        }
    })
})



//GET ONE QUESTION
// app.get('/getOneQuestion/:id',(req,res)=>{
//     console.log('question ID', req.params.id)
//     Question.findOne({_id:req.params.id},(err, question)=>{
//         if(err){
//             console.log(err)
//         }else{
//             return res.json(question);
//         }
//     })
// })

// //GET ALL QUESTIONS
// app.get('/getQuestions',(req,res)=>{
//     Question.find({},(err, questions)=>{
//         if(err){
//             console.log(err)
//         }else{
//             return res.json(questions);
//         }
//     })
// })




// //CREATE ANSWER
// app.post("/answer", function (req, response){
//     console.log('@server Rout /ANSWER', req.body)    
//     Question.findOne({_id:req.body._questionId}, function(err, question){
//         console.log('found the QUESTION!', question)    
//         var newAnswer = new Answer(
//             {
//                 answer: req.body.answer,    
//                 detail: req.body.detail,
//             })
//         newAnswer._questionId = question._id
//         newAnswer._userId = req.body._userId
//         console.log("at server after updateing answer",newAnswer)

//         newAnswer.save(function(err){
//             if(err){
//                 console.log(err)    
//             } else {
//                 question._answerId.push(newAnswer)    
//                 question.save(function(err){
//                 if(err){
//                     console.log("error saving user")    
                    
//                 }else{
//                     return response.json(newAnswer)    
//                 }
//             })
//         }
//         });
//     })
// })






// //UPDATE ONE QUESTION's VOTES
// app.post('/update',(req,res)=>{
//     console.log('at server, updating', req.body)
//     Question.update({_id:req.body._id},req.body,function (err, data){
//         if(err){
//             console.log(err)
//         }else{
//             return res.json(data)
//         }
//     })
// })





app.all('*', (req, res, next)=>{
    res.sendfile(path.resolve('./public/dist/index.html'))    
})

//SERVER PORT LISTENING
app.listen(1337, ()=> console.log("Connected to port 1337"))