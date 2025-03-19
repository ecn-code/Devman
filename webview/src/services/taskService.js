import { processFeature } from "./ollamaService";

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
        await processFeature(1, prompt);
        

        console.debug("2-Start AI:", task);
    });
}
