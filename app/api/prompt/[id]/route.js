import Prompt from "@models/prompt";
import { connectDB } from "@utils/database"


export const GET =async (request,{params})=>{
    try{
        await connectDB();

        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found",{status:404})
        
        return new Response(JSON.stringify(prompt),{status:200})
    }catch(error){
        return new Response("Failed to fetch all prompts",{status:500})
    }
}

export const PATCH =async (request,{params})=>{
    const {prompt,tag}=await request.json();
    try{
        await connectDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Promt not found",{status:404})
        
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt),{status:201})
    }
    catch (error){
        return new Response("Failed to fetch all prompts",{status:500})
    }
}

export const DELETE = async (request,{params})=>{
    try {
        await connectDB();
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt delete successfully",{status:200})
    } catch (error) {
        return new Response("Failed to delete prompt",{status:500})
    }
}