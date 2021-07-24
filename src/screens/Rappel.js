
const mongoose = require('mongoose');

const{Schema} = mongoose;


const  rappel = new Schema({
    coachId:{type:String},
    content:{type:String},
    date:{type:Date},
    
});

mongoose.model('Rappel', rappel);

