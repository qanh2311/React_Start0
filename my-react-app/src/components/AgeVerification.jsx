import { useState } from "react";

function AgeVerification() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = () => {
    const ageNumber = Number(age);
    const fullName = name.trim();

    if (fullName === "") {
      setSubmitted("Please enter your name.");
    }

    if (age.trim() === "") {
        setSubmitted("Please enter your age.");
    }

    if(!Number.isInteger(ageNumber) || ageNumber < 1 || ageNumber >120){
        setSubmitted("Please enter a valid age between 1 and 120.");
    }

    if(ageNumber >=18){
        setSubmitted(`${fullName}, is old enough!`);
    }else{
        setSubmitted(`${fullName}, is under 18!`);
    }


  };

  return (
    <div>
      <h2>Age Verification</h2>
      <input
        type="text"
        placeholder="Enter name here"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Enter age here"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {submitted && <h3>Hello {submitted}!</h3>}
    </div>
  );
}

export default AgeVerification;
