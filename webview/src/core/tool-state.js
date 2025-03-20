import { newInitialState } from "./initial-state";
import { newSummaryState } from "./summary-state";

export function newToolState(context) {
    return {
        context,
        functions: {...context.functions, finishTask},
        async run() {
            console.log("Tool state running");
            const toolCall = this.context.toolCall;
            console.log("Tool call:", toolCall);
            this.functions[toolCall.name](context, toolCall.arguments);
        }
    };
};

export async function forward(context, functionResult) {
    context.messages.push({ role: "tool", content: JSON.stringify(functionResult) });
    console.log(context.messages);
    context.toolCall = null;

    context.transitTo(newInitialState(context));
}

async function finishTask(context) {
    context.transitTo(newSummaryState(context));
}