import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const {userId, prompt, tag} = await req.json();

    try {

        await connectDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        console.log(newPrompt);
        
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 200})

    } catch (error) {
        return new Response("Failed to create a new prompt", {status: 500})
    }
}