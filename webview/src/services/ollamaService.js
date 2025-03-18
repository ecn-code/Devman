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

async function chat(prompt) {
    console.debug("Handling Ollama event", prompt);
    const response = await fetch(`${API_PATH}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            stream: false,
            tools: [findClasses]
        }),
    });

    const result = await response.json();
    console.debug(result);

    if(result?.message?.tool_calls.length > 0) {
        const toolCall = result.message.tool_calls[0];
        const functionName = toolCall.function.name;
        const parameters = toolCall.function.arguments;
        
        console.log('Calling utility: ', functionName, parameters);
        return await callUtility(functionName, 1, parameters);
    }

    return result.response;
};

const findClasses = {
    type: 'function',
    function: {
        name: 'findClasses',
        description: 'Find classes from a feature',
        parameters: {
            type: 'objects',
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

export async function processFeature(feature, context) {
        const prompt = `
            Get the classes feature: "${feature}"
        `;
        return await chat(prompt);
};

function callFunction(funcString) {
    const regex = /^([a-zA-Z0-9_]+)\((.*)\)$/;
    const match = funcString.match(regex);

    if (match) {
        const functionName = match[1];
        const paramsString = match[2];
        const paramArray = [];
        let openBrackets = 0;
        let currentParam = '';

        for (let i = 0; i < paramsString.length; i++) {
            const char = paramsString[i];

            if (char === '[') openBrackets++;
            if (char === ']') openBrackets--;
            if (char === ',' && openBrackets === 0) {
                paramArray.push(currentParam.trim());
                currentParam = '';
            } else {
                currentParam += char;
            }
        }

        if (currentParam.trim()) {
            paramArray.push(currentParam.trim());
        }

        const param1 = paramArray[0] ? paramArray[0] : null;
        const param2 = paramArray[1] ? paramArray[1] : null;

        console.debug(`Function name: ${functionName}`);
        console.debug(`Param 1: ${param1}`);
        console.debug(`Param 2: ${param2}`);

        return {
            functionName,
            param1,
            param2
        };
    }

    return null;    
};

async function callUtility(functionName, step, params) {
    let prompt = '';
    switch (functionName) {
        case 'findClasses':
            prompt = extractClasses(params.sentence);
            break;
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
    
    Step: ${step} 
    ---------------

    ${result.response}
    
    ---------------`;
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
    `;
};

function extractJson(text) {
    const regex = /\[.*?\]/s;
    const match = text.match(regex);

    if (match) {
        try {
            return JSON.parse(match[0]);
        } catch (error) {
            console.error('Error al parsear el JSON:', error);
        }
    } else {
        console.log('No se encontró un JSON válido en la respuesta.');
        return null;
    }
}