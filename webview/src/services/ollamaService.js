const API_PATH = "http://localhost:11434";
const MODEL = "llama3.1:8b";

async function generate(prompt) {
    console.debug("Handling Ollama event", prompt);
    const response = await fetch(`${API_PATH}/api/generate`, {
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

async function chat(step, messages) {
    console.debug("Handling Ollama event", messages);
    const response = await fetch(`${API_PATH}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL,
            messages,
            stream: false,
            tools: [findClasses, findFiles, humanAction]
        }),
    });

    let result = await response.json();
    console.debug(result);

    if(result?.message?.tool_calls?.length > 0) {
        const toolCall = result.message.tool_calls[0];
        const functionName = toolCall.function.name;
        const parameters = toolCall.function.arguments;
        
        console.log('Calling utility: ', functionName, parameters);
        result = await callUtility(functionName, step, parameters);
        console.log('chat utility', result);

        return {role: 'tool', content: result};
    }

    return {role: 'assistant', content: result.response};
};

const findClasses = {
    type: 'function',
    function: {
        name: 'findClasses',
        description: 'Find classes from a feature',
        parameters: {
            type: 'object',
            required: ['sentence'],
            properties: {
                sentence: {
                    type: 'string',
                    description: 'The sentence to find classes from'
                }
            }
        }
    }
};

const findFiles = {
    type: 'function',
    function: {
        name: 'findFiles',
        description: 'Find files from one or more class names',
        parameters: {
            type: 'object',
            required: ['classnames'],
            properties: {
                classnames: {
                    type: 'string',
                    description: 'List of class names to find files from'
                }
            }
        }
    }
};

const humanAction = {
    type: 'function',
    function: {
        name: 'humanAction',
        description: 'When the task is finish or need human action',
        parameters: {
            type: 'object',
            required: ['response'],
            properties: {
                response: {
                    type: 'string',
                    description: 'Some context to continue the task'
                }
            }
        }
    }
};

export async function processFeature(step, prompt) {
    const messages = [
        {
            "role": "system",
            "content": "Tu tarea es completar los 3 pasos de manera automática, sin necesidad de intervención del usuario. Si un paso ya ha sido realizado, usa sus resultados para llamar a la siguiente herramienta hasta completar los 3 pasos. No respondas hasta que todos los pasos estén completados."
        },
        {
            role: 'user',
            content: prompt
        }
    ];
    while(step < 3) {
        messages.push(await chat(step, messages));
        if(messages[messages.length - 1].role === 'tool') {
            messages.push({
                "role": "system",
                "content": "Tu tarea es completar los 3 pasos de manera automática, sin necesidad de intervención del usuario. Si un paso ya ha sido realizado, usa sus resultados para llamar a la siguiente herramienta hasta completar los 3 pasos. No respondas hasta que todos los pasos estén completados."
            });
        }
        step++;
    }
    return messages;
};

async function callUtility(functionName, step, params) {
    let prompt = '';
    switch (functionName) {
        case 'findClasses':
            prompt = extractClasses(params.sentence);
            break;
        case 'findFiles':
            console.log(functionName, step, params);
        case 'end':
        case 'requestHumanAction':
            return 'END';
            break;
        case 'findFunctionsByNames':
        case 'findClassesByNames':
        default:
            throw new Error(`callUtility ${functionName} ${step} ${params}`);
            
    };

    const result = await generate(prompt);

    console.log(result.response);

    return `
    ${result.response}
    `;
}

function extractClasses(sentence) {
    console.debug('Extracting classes from sentence:', sentence);
    const entitiesTable = `
        user -> usuario,
        product -> producto,
        order -> pedido,
        cart -> carrito,
    `;
    return `   
    
        Tabla de traducción: ${entitiesTable}

        Feature: "${sentence}".

        Tomando la tabla traduce la feature a clases, solo clases que aparezcan en la feature.
        Responde diciendo: Paso 1 - ClassNames = [<Clases separadas por coma>]
    `;
};