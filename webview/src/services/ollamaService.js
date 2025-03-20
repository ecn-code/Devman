const OLLAMA_API = "http://localhost:11434";
const MODEL = "qwen2.5:7b";

// Simulación de herramientas en backend
async function findClasses(feature) {
    return { step: 1, classNames: ["Usuario", "Pedido"] };
}

async function findFiles(classNames) {
    return { step: 2, fileNames: ["usuario.php", "pedido.php"] };
}

async function findFunctions(fileNames) {
    return { step: 3, functions: ["crearPedido", "cancelarPedido"] };
}

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

const finishTaskt = {
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
}

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
                tools: [...functionDefs, finishTaskt],
                options: {
                    temperature: 0,
                }
            }),
    });

    return response.json();
}

export async function runAgent() {
    let messages = [
        {
            role: "system",
            content: `Eres un agente que poco a poco va resolviendo un problema con multiples llamadas a herramientas. 
            Establece un plan de acción para resolver la siguiente tarea. Nombrando las herramientas a utilizar y los parámetros necesarios.`
        },
        { role: "user", content: "Quiero saber el nombre de las funciones que están involucrados en esta feature: 'Users can create orders'." },
        { role: "tool", content: JSON.stringify({ step: 1, classNames: ["Usuario", "Pedido"] }) }
    ];

    let response = await fetchOllama(messages);
    console.log("🔍 Respuesta inicial:", response);

    while (response?.message?.tool_calls) {
        const toolCall = response.message.tool_calls[0];
            const toolName = toolCall.function.name;
            const toolParams = toolCall.function.arguments;

            console.log(`🛠️ Llamando a la herramienta: ${toolName} con ${toolParams}`);

            let toolResponse;

            if (toolName === "findClasses") {
                toolResponse = await findClasses(toolParams.feature);
            } else if (toolName === "findFiles") {
                toolResponse = await findFiles(toolParams.classNames);
            } else if (toolName === "findFunctions") {
                toolResponse = await findFunctions(toolParams.fileNames);
            }

            messages.push({ role: "tool", content: JSON.stringify(toolResponse) });

        response = await chat(messages); // Repetir hasta obtener respuesta final
    }

    messages.push({ role: "user", content: 'Haz un resumen con la información obtenida' });
    messages.push(response.message);

    response = await chat(messages);
    console.log("✅ Respuesta final:", response.message);

    console.log("📝 Mensajes:", messages);
}