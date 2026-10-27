import axios from "axios";
import TaskForm from "../TaskForm";
import TaskList from "../TaskList";
import { useEffect, useState } from "react";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/listTasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("API ERROR:", error);
      });
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/listTasks",
        newTask,
      );
      setTasks((prevTask) => [...prevTask, response.data]);

      return true;
    } catch (error) {
      console.error("POST ERROR: ", error);
      alert("Thêm thất bại");
      return false;
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa task này không?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/listTasks/${id}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Xóa task thất bại!");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/listTasks/${updatedTask.id}`,
        updatedTask,
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? response.data : task,
        ),
      );

      setEditingTask(null);
      return true;
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      alert("Cập nhật thất bại!");
      return false;
    }
  };

  //-------------------------------------- Chia cho de nhin :)))
  return (
    <div className="App">
      <h1>Task Management App</h1>
      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <TaskList
        task={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}
export default HomePage;
