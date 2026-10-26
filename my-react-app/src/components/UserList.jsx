function UserList() {
    const users = [ 
        {id: 1, name: "An", age: 20},
        {id: 2, name: "Binh", age: 22},
        {id: 3, name: "Chi", age: 21},
        {id: 4, name: "Duc", age: 23}
     ];

     return (
        <div>
            <h2>User List</h2>
            {users.map((user)=> (
                <div key ={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Age: {user.age}</p>
                </div>
            ))}
        </div>
        
     );
}

export default UserList;