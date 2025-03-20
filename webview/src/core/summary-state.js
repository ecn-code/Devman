import { generate } from "../services/ollamaService";

export function newSummaryState(context) {
    return {
        context,
        async run() {
            this.context.messages.push({ role: "user", content: "Con toda la información obtenida, responde de forma directa y concisa al objetivo inicial" });

            const result = await generate(this.context.messages.reduce((acc, message) => {
                return `${acc}
                ${message.role} says: ${message.content}`;
            }, ""));
            console.debug('newSummaryState', result);

            this.context.endFunction(result.response);
        },
    };
};