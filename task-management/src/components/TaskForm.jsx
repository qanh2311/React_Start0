import { useState, useEffect } from "react";

function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");

  // Khi nhấn Edit, đưa dữ liệu task cũ vào form
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Low");
      setStatus("Pending");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title không được để trống!");
      return;
    }

    const taskData = {
      title: title.trim(),
      description,
      priority,
      status,
    };

    let success;

    if (editingTask) {
      success = await onUpdateTask({
        ...taskData,
        id: editingTask.id,
      });
    } else {
      success = await onAddTask(taskData);
    }

    if (success) {
      setTitle("");
      setDescription("");
      setPriority("Low");
      setStatus("Pending");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>{editingTask ? "Update Task" : "Add Task"}</h2>

        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Nhập tiêu đề ở đây..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder="Nhập mô tả ở đây..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Priority</label>

          {["Low", "Medium", "High"].map((item) => (
            <div key={item}>
              <input
                type="radio"
                name="priority"
                value={item}
                checked={priority === item}
                onChange={(e) => setPriority(e.target.value)}
              />
              <label>{item}</label>
            </div>
          ))}
        </div>

        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
