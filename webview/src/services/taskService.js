import { processFeature } from "./ollamaService";

export function handleTaskEvents() {
    window.addEventListener("continue-ai", (event) => {
        console.debug("Task added:", event.detail);
        //handleOllama(event.detail.prompt);
    });

    window.addEventListener("start-ai", async (event) => {
        console.debug("1-Start AI:", event.detail);
        const task = event.detail;
        const response = await processFeature(task.title, task.description);
        task.description += response;

        console.debug("2-Start AI:", task);
    });
}
