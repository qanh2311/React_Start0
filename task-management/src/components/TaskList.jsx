import TaskItem from "./TaskItem";

function TaskList({task, onDelete, onEdit}) {
    return (
        <div>
            {task.map((task)=>(
                <TaskItem key={task.id} task={task} onDelete={onDelete}  onEdit={onEdit}/>
            ))}
        </div>
    );
}
export default TaskList;