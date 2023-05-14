import mongoose,{ Schema , model , models} from "mongoose";

const PromptSchema = new Schema({
    creator : {
            type : Schema.Types.ObjectId,
            ref : "User"
    },
    prompt : {
        type : String,
        required : [true , "Prompt is required."]
    ,
    tag : {
        type : String,
        required : [true , "Prompt is required."]
    },

}
});

const Prompt = models.prompt || new model("Prompt" ,PromptSchema)

export default Prompt;