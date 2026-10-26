import { useState } from "react";

function WelcomeForm() {
    const [name, setName] = useState("");
    const [submittedName, setSubmittedName] = useState("");

    const handldeSubmit = () => {
        setSubmittedName(name.trim());
    }

    return (
        <div>
            <h2>Welcome Form</h2>

            <input type="text" placeholder="Enter name here" value={name} onChange={(event) => setName(event.target.value)} />

            <button onClick={handldeSubmit}>Submit</button>
            {submittedName && <h3>Hello, {submittedName}!</h3>}
            <h3>hello, {submittedName}</h3>
            <hr />
            <h3>Hello, {name || "GUEST"}!</h3>
        </div>
    );
}
export default WelcomeForm;