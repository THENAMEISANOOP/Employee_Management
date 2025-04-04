const mongoose =require('mongoose');

const MONGO_URL=process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('mongo connected successfully');
}).catch((err)=>{
    console.log('Error in mongoDB connection ....',err)

})