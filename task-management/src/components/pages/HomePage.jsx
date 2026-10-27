import axios from "axios";
import TaskForm from "../TaskForm";
import TaskList from "../TaskList";
import { useEffect, useState } from "react";

//-------------------------------------- API URL
// Địa chỉ JSON Server dùng để GET, POST, PUT, DELETE
const API_URL = "http://localhost:3001/listTasks";

function HomePage() {
  //-------------------------------------- QUẢN LÝ STATE
  // tasks: Danh sách công việc lấy từ API
  const [tasks, setTasks] = useState([]);

  // editingTask: Lưu task đang chỉnh sửa, null nghĩa là đang ở chế độ Add
  const [editingTask, setEditingTask] = useState(null);

  // search: Từ khóa tìm kiếm theo tiêu đề task
  const [search, setSearch] = useState("");

  // filterPriority: Lọc task theo Low, Medium, High
  const [filterPriority, setFilterPriority] = useState("All");

  // filterStatus: Lọc task theo Pending hoặc Completed
  const [filterStatus, setFilterStatus] = useState("All");

  // sortOrder: Thứ tự sắp xếp theo Status
  const [sortOrder, setSortOrder] = useState("default");

  // currentPage: Trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // tasksPerPage: Số lượng task hiển thị trên mỗi trang
  const tasksPerPage = 5;

  //-------------------------------------- GET ALL TASKS
  // useEffect chạy khi component được mount
  // Gọi API để lấy danh sách task và lưu vào state
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("GET ERROR:", error);
      });
  }, []);

  //-------------------------------------- CREATE TASK
  // POST: Gửi task mới lên JSON Server
  // Nếu thành công, thêm task vào state để cập nhật giao diện
  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post(API_URL, newTask);

      setTasks((prevTasks) => [...prevTasks, response.data]);

      return true;
    } catch (error) {
      console.error("POST ERROR:", error);
      alert("Thêm task thất bại!");
      return false;
    }
  };

  //-------------------------------------- DELETE TASK
  // DELETE: Xóa task dựa vào ID
  // filter(): Loại bỏ task đã xóa khỏi danh sách
  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa task này không?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      // Nếu đang chỉnh sửa task vừa xóa thì thoát chế độ Edit
      setEditingTask((current) => (current?.id === id ? null : current));
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Xóa task thất bại!");
    }
  };

  //-------------------------------------- SELECT TASK TO EDIT
  // Lưu task được chọn vào editingTask
  // TaskForm sẽ nhận dữ liệu này và hiển thị lên form
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  //-------------------------------------- UPDATE TASK
  // PUT: Cập nhật task theo ID
  // map(): Thay thế task cũ bằng task mới trong state
  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await axios.put(
        `${API_URL}/${updatedTask.id}`,
        updatedTask,
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? response.data : task,
        ),
      );

      // Thoát chế độ Edit sau khi cập nhật thành công
      setEditingTask(null);

      return true;
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      alert("Cập nhật task thất bại!");
      return false;
    }
  };

  //-------------------------------------- SEARCH & FILTER
  // filter(): Chỉ lấy những task thỏa mãn tất cả điều kiện
  const filteredTasks = tasks.filter((task) => {
    // Tìm kiếm theo Title, không phân biệt chữ hoa và chữ thường
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    // Lọc theo Priority
    const matchPriority =
      filterPriority === "All" || task.priority === filterPriority;

    // Lọc theo Status
    const matchStatus = filterStatus === "All" || task.status === filterStatus;

    // Task phải thỏa mãn cả 3 điều kiện
    return matchSearch && matchPriority && matchStatus;
  });

  //-------------------------------------- SORT BY STATUS
  // Quy đổi Status thành số để dễ sắp xếp
  const statusOrder = {
    Pending: 1,
    Completed: 2,
  };

  // Tạo bản sao filteredTasks để không thay đổi mảng gốc
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // ASC: Pending -> Completed
    if (sortOrder === "asc") {
      return statusOrder[a.status] - statusOrder[b.status];
    }

    // DESC: Completed -> Pending
    if (sortOrder === "desc") {
      return statusOrder[b.status] - statusOrder[a.status];
    }

    // Default: Giữ nguyên thứ tự
    return 0;
  });

  //-------------------------------------- PAGINATION
  // Math.ceil(): Làm tròn lên để tính tổng số trang
  // Math.max(): Đảm bảo có tối thiểu 1 trang khi danh sách rỗng
  const totalPages = Math.max(1, Math.ceil(sortedTasks.length / tasksPerPage));

  // Giới hạn trang hiển thị trong khoảng hợp lệ
  const safeCurrentPage = Math.min(currentPage, totalPages);

  // Tính vị trí bắt đầu của trang hiện tại
  // Ví dụ: Trang 2, mỗi trang 5 task -> startIndex = 5
  const startIndex = (safeCurrentPage - 1) * tasksPerPage;

  // slice(): Lấy tối đa 5 task của trang hiện tại
  const paginatedTasks = sortedTasks.slice(
    startIndex,
    startIndex + tasksPerPage,
  );

  //-------------------------------------- RESET PAGINATION
  // Khi Search, Filter hoặc Sort thay đổi thì quay về trang 1
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterPriority, filterStatus, sortOrder]);

  //-------------------------------------- FIX INVALID PAGE
  // Khi xóa task khiến số trang giảm, tự điều chỉnh currentPage
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  //-------------------------------------- RENDER UI
  return (
    <div className="App">
      <h1>Task Management App</h1>

      {/*-------------------------------------- TASK FORM */}
      {/* Form dùng chung cho Add và Update */}
      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      {/*-------------------------------------- SEARCH */}
      <div>
        <label>Search Task: </label>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/*-------------------------------------- FILTER PRIORITY */}
      <div>
        <label>Filter by Priority: </label>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/*-------------------------------------- FILTER STATUS */}
      <div>
        <label>Filter by Status: </label>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/*-------------------------------------- SORT STATUS */}
      <div>
        <label>Sort by Status: </label>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="asc">Pending → Completed</option>
          <option value="desc">Completed → Pending</option>
        </select>
      </div>

      {/*-------------------------------------- TASK LIST */}
      {/* Chỉ hiển thị danh sách đã Search, Filter, Sort và phân trang */}
      <TaskList
        task={paginatedTasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />

      {/*-------------------------------------- PAGINATION CONTROLS */}
      <div>
        <button
          disabled={safeCurrentPage <= 1}
          onClick={() => setCurrentPage(safeCurrentPage - 1)}
        >
          Previous
        </button>

        <span>
          {" "}
          Page {safeCurrentPage} / {totalPages}{" "}
        </span>

        <button
          disabled={safeCurrentPage >= totalPages}
          onClick={() => setCurrentPage(safeCurrentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;
