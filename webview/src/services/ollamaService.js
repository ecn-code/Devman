const API_PATH = "http://localhost:11434";
const MODEL = "deepseek-r1:8b";

export async function handleOllama(prompt) {
    console.debug("Handling Ollama event");
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
};