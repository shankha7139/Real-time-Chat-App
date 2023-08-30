const mongoose = require ('mongoose')

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true ,
            useUnifiedTopology : true,
        })
        console.log(`DATABASE CONNECTED - ${conn.connection.host}`)
    }catch(error){
        console.log(error.message)
    }
}

module.exports = connectDB