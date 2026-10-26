import AgeVerification from "./components/AgeVerification";
import AxiosDemo from "./components/AxiosDemo";
import Counter from "./components/Counter";
import EffectDemo from "./components/EffectDemo";
import UserManagement from "./components/UseManagement";
import UserApi from "./components/UserApi";
import UserCard from "./components/UserCard";
import UserList from "./components/UserList";
import WelcomeForm from "./components/WelcomeForm";

function App() {
  return (
    <div>
      <h1>User Management</h1>

      <UserCard name="An" age={20} role="Frontend Developer" />

      <UserCard name="Binh" age={22} role="Backend Developer" />

      <UserCard name="Chi" age={21} role="Fullstack Developer" />

      <hr />

      <Counter />

      <hr />

      <WelcomeForm />

      <hr />
      <AgeVerification />

      <hr />
      <UserList />

      <hr />
      <UserManagement />

      <EffectDemo />

      <hr />
      <UserApi />

      <hr />
      <AxiosDemo />
    </div>
  );
}

export default App;
