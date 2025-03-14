<script>
    import { onMount } from "svelte";
    import { handleTaskEvents } from "../services/taskService";

    const task = { id: "", title: "", description: "" };
    let isEditing = false;

    onMount(() => {
        window.addEventListener("edittask", (event) => {
            if (event.detail) {
                isEditing = true;
            } else {
                isEditing = false;
            }
        });

        handleTaskEvents();
    });

    function addTask() {
        if (task.title.trim()) {
            task.id = Date.now().toString();
            const event = new CustomEvent("addtask", { detail: { ...task } });
            window.dispatchEvent(event);

            window.dispatchEvent(
                new CustomEvent("start-ai", {
                    detail: { ...task},
                }),
            );

            //change
            task.title = "";
            task.id = "";
        }
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }
</script>

{#if !isEditing}
    <input
        type="text"
        bind:value={task.title}
        placeholder="Enter task title"
        class="border p-2 rounded w-full"
        on:keypress={handleKeyPress}
        style="background-color: var(--vscode-input-background); color: var(--vscode-editor-foreground); border: 1px solid var(--vscode-input-border, transparent);"
    />
{/if}

<style>
    input:focus {
        outline: none;
    }
    input:focus-visible {
        outline: 1px solid var(--vscode-focusBorder);
    }
</style>
