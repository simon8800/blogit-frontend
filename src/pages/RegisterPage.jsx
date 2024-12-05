import FormField from "./FormField"
import { Link, useNavigate } from "react-router"
const signupUrl = "http://localhost:3000/api/signup/"

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    if (values.password !== values.confirmpassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        mode: "cors",
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          alert("Email already exists");
        } else {
          throw new Error("Registration failed");
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate('/home');
    } catch (error) {
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5 bg-gradient-to-br from-amber-50 to-orange-50">
      <h1 className="text-4xl font-bold text-amber-900">
        <Link to="/" className="hover:text-amber-700 transition-colors">Blog It</Link>
      </h1>
      <div className="form-container flex justify-center w-8/12">
        <form id="register" className="w-1/2 bg-white p-8 rounded-lg shadow-md border border-amber-100" onSubmit={handleSubmit}>
          <FormField labelName="Email" fieldName="email" inputType="email"/>
          <FormField labelName="Password" fieldName="password" inputType="password"/>
          <FormField labelName="Confirm Password" fieldName="confirmpassword" inputType="password"/>
          <button 
            className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" 
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
      <p className="text-gray-700">
        Have an account already? <Link className="text-amber-600 hover:text-amber-700 underline" to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;