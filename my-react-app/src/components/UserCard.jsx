function UserCard({ name, age, role }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Role: {role}</p>
        </div> 
    );
}

export default UserCard;