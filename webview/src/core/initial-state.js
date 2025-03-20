import { chat } from "../services/ollamaService";
import { newToolState } from "./tool-state";

export function newInitialState(context) {
    return {
        context,
        async run() {
            const response = await chat(context.messages, context.functionDefs);

            if(response?.message?.tool_calls) {
                console.log(response);
                const toolCall = response.message.tool_calls[0].function;
                this.context.toolCall = toolCall;
                this.context.transitTo(newToolState(this.context));
            } else {
                console.log(response);
                throw new Error("No tool calls found");
            }
        }
    };
};