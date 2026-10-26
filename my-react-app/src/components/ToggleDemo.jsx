import useToggle from "../hooks/useToggle";

function ToggleDemo() {
  const { value, toggle } = useToggle(false);

  return (
    <div>
      <h2>Custom Hook Demo</h2>

      <button onClick={toggle}>{value ? "Hide" : "Show"}</button>

      {value && <p>Hello! This is a Custom Hook.</p>}
    </div>
  );
}

export default ToggleDemo;
