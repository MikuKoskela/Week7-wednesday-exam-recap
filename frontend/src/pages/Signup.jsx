import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const name = useField("text");  
  const email = useField("email");
  const password = useField("password");
  const role = useField("text");
  const lastLogin = useField("date");
  const bio = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
      email: email.value,
      password: password.value,
      name: name.value,
      role: role.value,
      lastLogin: lastLogin.value,
      bio: bio.value,
    });
    if (!error) {
      
      sessionStorage.setItem("isAuthenticated", "true");

       setIsAuthenticated(true)
      console.log("success");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Email:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>Role:</label>
        <input {...role} />
        <label>Last Login:</label>
        <input {...lastLogin} />
        <label>Bio:</label>
        <input {...bio} />
        
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
