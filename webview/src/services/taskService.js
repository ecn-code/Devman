import { handleOllama } from "./ollamaService";

export function handleTaskEvents() {
    window.addEventListener("call-ai", (event) => {
        console.debug("Task added:", event.detail);
        handleOllama(event.detail.prompt);
    });
}
