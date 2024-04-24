const mongoose= require("mongoose")

const GithubUserSchema=mongoose.Schema({
  
    first_name:{
        type: String,
        required: true
    },
 
    last_name: {
        type: String,
  
    },
    email: {
        type:String,
        required : true,
        index: true, 
        unique: true
    },
    password:{
        type: String,
  
    },
    age: {
        type: Number,
     
    }
});

const GithubUserModel = mongoose.model("userGithub", GithubUserSchema);
module.exports = GithubUserModel;