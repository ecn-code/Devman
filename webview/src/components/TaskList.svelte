<script>
    import { onMount } from "svelte";
    import TaskCreator from "./TaskCreator.svelte";

    let tasks = [];
    let taskListWidth = "100%";
    let taskListPosition = "0";

    onMount(() => {
        window.addEventListener("addtask", (event) => {
            tasks = [...tasks, event.detail];
        });
        window.addEventListener("edittask", (event) => {
            if (event.detail) {
                taskListWidth = "20%";
                taskListPosition = "0";
            } else {
                taskListWidth = "100%";
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
    style="width: {taskListWidth}; left: {taskListPosition};"
>
    <TaskCreator />
    <ul>
        {#each tasks as task}
            <li class="mb-2 p-0 border rounded">
                <button
                    on:click={() => selectTask(task)}
                    class="w-full h-full p-2 text-left">{task.title}</button
                >
            </li>
        {/each}
    </ul>
</div>

<style>
    .task-list {
        transition:
            width 0.5s,
            left 0.5s;
        position: absolute;
        top: 0;
    }
</style>
