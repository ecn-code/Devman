<script>
    import { fly } from "svelte/transition";

    let task = { title: "", detail: "" };
    let selectedTask = null;

    window.addEventListener("edittask", (event) => {
        selectedTask = event.detail;
    });

    function updateTask() {
        const event = new CustomEvent("updatetask", { detail: { ...task } });
        window.dispatchEvent(event);
    }

    function closePanel() {
        const event = new CustomEvent("edittask", { detail: null });
        window.dispatchEvent(event);
    }
</script>

{#if selectedTask}
    <div class="panel" transition:fly={{ x: 500, duration: 600 }}>
        <button class="close-button" on:click={closePanel} aria-label="Close">x</button>
        <h2 class="text-xl mb-4">Edit Task</h2>

        <input
            type="text"
            bind:value={selectedTask.title}
            placeholder="Enter task title"
            class="border p-2 rounded w-full mb-4"
            style="background-color: var(--vscode-editor-background); color: var(--vscode-editor-foreground);"
        />

        <button
            on:click={updateTask}
            class="p-2 bg-blue-500 text-white rounded w-full"
            aria-label="Update Task"
        >
            Update Task
        </button>
    </div>
{/if}

<style>
    .panel {
        height: 100%;
        position: fixed;
        right: 10px;
        left: 10px;
        top: 10px;
        background-color: var(--vscode-editor-background);
        padding: 1rem;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    }

    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--vscode-editor-foreground);
    }
</style>
