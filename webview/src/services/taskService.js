import { processFeature } from "./ollamaService";

export function handleTaskEvents() {
    window.addEventListener("continue-ai", (event) => {
        console.debug("Task added:", event.detail);
        //handleOllama(event.detail.prompt);
    });

    window.addEventListener("start-ai", async (event) => {
        console.debug("Start AI:", event.detail);
        const task = event.detail;
        const response = await processFeature(task.feature, task.description);
        task.description += response;

        window.dispatchEvent(
            new CustomEvent("updatetask", { detail: { ...task } })
        );
    });
}
