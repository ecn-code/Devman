<script>
    import { onMount } from "svelte";
    import TaskCreator from "./TaskCreator.svelte";

    const maxSize = '80%';
    const minSize = '20%';
    let tasks = [];
    let taskListWidth = maxSize;
    let taskListPosition = "0";

    onMount(() => {
        window.addEventListener("addtask", (event) => {
            tasks = [...tasks, event.detail];
        });
        window.addEventListener("edittask", (event) => {
            if (event.detail) {
                taskListWidth = minSize;
                taskListPosition = "0";
            } else {
                taskListWidth = maxSize;
                taskListPosition = "0";
            }
        });
    });

    function selectTask(task) {
        const event = new CustomEvent("edittask", { detail: { ...task } });
        window.dispatchEvent(event);
    }
</script>

<div
    class="task-list"
    style="width: {taskListWidth};"
>
    <TaskCreator />
    <ul>
        {#each tasks as task}
            <li class="mb-2 p-0 border rounded">
                <a href="#top" on:click={() => selectTask(task)}
                    class="w-full h-full p-2 text-left block">{task.title}</a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .task-list {
        transition:
            width 0.5s,
    }

    a {
        color: var(--vscode-textLink-foreground);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    a:focus {
        outline: 1px solid var(--vscode-focusBorder);
    }
</style>
