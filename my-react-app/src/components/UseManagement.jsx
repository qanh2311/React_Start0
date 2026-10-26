import { useState } from "react";

function UserManagement() {
    const [users, setUsers] = useState([
        {id: 1, name: "An", age: 20},
        {id: 2, name: "Binh", age: 22},
        {id: 3, name: "Chi", age: 21},
        {id: 4, name: "Duc", age: 23}
    ]);

    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    }

    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleAdd = () => {
        const newName = name.trim();
        const newAge = Number(age);

        if(!newName || age.trim() === "" || newAge < 1 || newAge > 120 || !Number.isInteger(newAge)){
            alert("Please enter a valid name and age (1-120).");
            return;
        }

        const newUser = {
            id:crypto.randomUUID(),
            name: newName,
            age: newAge
        };

        setUsers([...users, newUser]);
        setName("");
        setAge("");
    }

    const [editingId, setEditingId] = useState(null);

    const handleEdit = (user) => {
        setEditingId(user.id);
        setName(user.name);
        setAge(String(user.age));
    }

    const handleUpdate = () => {
        const updatedName = name.trim();
        const updatedAge = Number(age);

        if(!updatedName || age.trim() === "" || updatedAge < 1 || updatedAge > 120 || !Number.isInteger(updatedAge)){
            alert("Please enter a valid name and age (1-120).");
            return;
        }
        setUsers(users.map((user) => user.id === editingId ? {...user, name: updatedName, age: updatedAge} : user));
        setEditingId(null);
        setName("");
        setAge("");
    }

    return (
        <div>
            <h2>User Management</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <button onClick={editingId === null ? handleAdd : handleUpdate}>
                {editingId === null ? "Add" : "Update"}
            </button>

            {users.map((user) => (
                <div key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Age: {user.age}</p>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                </div>
            ))}
        </div>
    )
}

export default UserManagement;