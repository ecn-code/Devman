import { newContext } from "@/core/context";
import { newInitialState } from "@/core/initial-state";
import { forward } from "@/core/tool-state";

export function handleTaskEvents() {
    window.addEventListener("continue-ai", (event) => {
        console.debug("Task added:", event.detail);
        //handleOllama(event.detail.prompt);
    });

    window.addEventListener("start-ai", async (event) => {
        console.debug("1-Start AI:", event.detail);
        const task = event.detail;
        const prompt = `
            Paso 1-Get the classes of the feature
            Paso 2-Get the possible files involved using the classname of the paso 1
            Paso 3-Get the possible functions involved using the files of the paso 2

            Feature: "${task.title}"
            --------------------------------
        `;
        
        //await runAgent();
        const context = newContext(
            `Quiero saber el nombre de los metodos que están involucrados en esta feature: '${task.title}'.`,
            {findClasses, findFiles, findMethods},
            [findClassesDef, findFunctionsDef, findFilesDef],
            (problemSolved) => window.dispatchEvent(new CustomEvent("updatetask", { detail: { ...task, description: problemSolved } })));
        await context.transitTo(newInitialState(context));

        console.debug("2-Start AI:", task);
    });
}

async function findClasses(context, feature) {
    console.log('findClasses', feature);
    const response = { classNames: ["Usuario", "Pedido"] };
    forward(context, response);
}

async function findFiles(context, classNames) {
    console.log('findFiles', classNames);
    const response =  { fileNames: ["usuario.php", "pedido.php"] };
    forward(context, response);
}

async function findMethods(context, fileNames) {
    console.log('findMethods', fileNames);
    if(fileNames.fileNames.indexOf("usuario.php") != -1 || fileNames.fileNames.indexOf("pedido.php") != -1) {
        const response = { functions: ["pedido.php -> crearPedido", "pedido.php -> cancelarPedido"] };
        forward(context, response);
    } else {
        const response = { error: `classes those files not found, did you call findFile before?` };
        forward(context, response);
    }
}

const findClassesDef = {
    type: 'function',
    function: {
        name: 'findClasses',
        description: 'Find relevant class names from a feature description.',
        parameters: {
            type: 'object',
            properties: {
                feature: {
                    type: 'string',
                    description: 'A description of the feature to analyze.'
                }
            },
            required: ['feature']
        }
    }
};

const findFilesDef = {
    type: 'function',
    function: {
        name: 'findFiles',
        description: 'Find files from a class names. If you need class names call findClasses first.',
        parameters: {
            type: 'object',
            properties: {
                classNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'List of class names to find files for.'
                }
            },
            required: ['classNames']
        }
    }
};

const findFunctionsDef = {
    type: 'function',
    function: {
        name: 'findMethods',
        description: 'Find name of methods inside an existing file. If you need file names call findFiles first.',
        parameters: {
            type: 'object',
            properties: {
                fileNames: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'List of filenames to extract methods from.'
                }
            },
            required: ['fileNames']
        }
    }
};