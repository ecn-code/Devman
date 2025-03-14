const API_PATH = "http://localhost:11434";
const MODEL = "llama3:8b";

async function handleOllama(prompt) {
    console.debug("Handling Ollama event", prompt);
    const response = await fetch(`${API_PATH}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODEL,
            prompt,
            stream: false
        }),
    });

    const result = await response.json();
    console.debug(result);

    const functionCall = callFunction(result.response);
    console.debug(functionCall);
    if (functionCall) {
        return await callUtility(functionCall.functionName, functionCall.param1, functionCall.param2);
    }

    return result.response;
};

export async function processFeature(feature, context) {
        const prompt = `
            The objective is to implement a feature.
            To achieve it, we need to find which functions and how will be affected.
            But before to have the functions we need to find the classes that will be affected.
            And to find the classes we need to know the entities that will be affected.

            1. Find the classes from the sentence.
            2. Find the classes that will be affected.
            3. Find the functions that will be affected.

            To achieve it you can call some utilities. Every time you call an utility the result will be appended to the prompt.
            Functions has always two parameters, the first is the step where you are, it is used to know later where you are.
            The second is the parameters itself, is an array with every parameter that you need to pass to the utility.

            If in any moment you have a doubt, you are not progressing or you can not continue, call the function requestHumanAction().
            If you have you times the same Step call requestHumanAction().
            If you end call end or requestHumanAction

            Example: utility1(1, ["parameter1"])

            When call an utility only response with something like the example.

            Available utilities:
            - extractClasses(step, feature)
            - findFunctionsByNames(step, entity)
            - findClassesByNames(step, entity)
            - requestHumanAction()
            - end()

            Feature: ${feature}

            Current state:
            ${context}

            Please, response only with the name of the function you want to call, and not forget the parentesis.
        `;
        return await handleOllama(prompt);
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
        case 'extractClasses':
            prompt = extractClasses(params);
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

    return `
    
    Step: ${step} 
    ---------------

    ${await handleOllama(prompt)}
    
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
    return `   ${entitiesTable}

        Se te dará una frase. Utilizando solo las palabras que coinciden con las de la tabla de traducciones, crea una lista de objetos con la clave "nombre" y el valor correspondiente a la parte derecha de la tabla. Ignora todas las demás palabras. 

        Frase: "${sentence}"

        Por favor, asegúrate de solo devolver los objetos para las palabras que están en la tabla de traducciones. Solo devuelve el valor de la parte derecha de la tabla de traducciones. 
        Devuelve la lista con formato \`\`\` <RESPONSE>\`\`\`.
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