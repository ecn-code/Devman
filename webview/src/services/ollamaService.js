const OLLAMA_API = "http://localhost:11434";
const MODEL = "qwen2.5:7b";

const finishTaskDef = {
    type: 'function',
    function: {
        name: 'finishTask',
        description: 'Finish the task and provide the final result.',
        parameters: {
            type: 'object',
            properties: {
                result: {
                    type: 'string',
                    description: 'Final result of the task.'
                }
            },
            required: ['result']
        }
    }
};

export async function generate(prompt) {
    console.debug("Handling Ollama event", prompt);
    const response = await fetch(`${OLLAMA_API}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL,
            prompt,
            stream: false,
        }),
    });
    console.debug("Response from generate", response);

    return await response.json();
};

export async function chat(messages, functionDefs) {
    console.log(messages);
    const response = await fetch(`${OLLAMA_API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            { 
                model: MODEL, 
                messages, 
                stream: false, 
                tools: [...functionDefs, finishTaskDef],
                options: {
                    temperature: 0,
                }
            }),
    });

    return response.json();
};

const responseFormat = {
    type: 'object',
    properties: {
        tool: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                arguments: { type: 'object' }
            }
        },
        message: {
            type: 'string'
        }
    },
    required: ['message']
};