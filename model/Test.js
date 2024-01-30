import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
    option1:{
        type : String,
    },
    option2:{
        type : String,
    },
    option3:{
        type : String,
    },
    option4:{
        type : String,
    },

});


export const Tags = mongoose.models.Tags  || mongoose.model("OTP",tagsSchema );