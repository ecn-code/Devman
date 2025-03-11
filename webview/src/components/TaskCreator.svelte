<script>
    let task = { title: "" };

    function addTask() {
        if (task.title.trim()) {
            const event = new CustomEvent("addtask", { detail: { ...task } });
            window.dispatchEvent(event);
            task.title = "";
        }
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }
</script>

<input
    type="text"
    bind:value={task.title}
    placeholder="Enter task title"
    class="border p-2 rounded w-full"
    on:keypress={handleKeyPress}
    style="background-color: var(--vscode-editor-background); color: var(--vscode-editor-foreground);"
/>
