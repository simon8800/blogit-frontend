import { Link, useNavigate } from "react-router"
import FormField from "./FormField"

const loginUrl = "http://localhost:3000/api/login/"

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch(loginUrl, {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        mode: "cors", 
        body: JSON.stringify(values)
      });

      if (response.status === 404) {
        alert("Email not found");
        return;
      } else if (response.status === 401) {
        alert("Incorrect password");
        return;
      } else if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate('/home');
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5 bg-gradient-to-br from-amber-50 to-orange-50">
      <h1 className="text-4xl font-bold text-amber-900">
        <Link to="/" className="hover:text-amber-700 transition-colors">Blog It</Link>
      </h1>
      <div className="form-container flex justify-center w-8/12">
        <form id="login" className="w-1/2 bg-white p-8 rounded-lg shadow-md border border-amber-100" onSubmit={handleSubmit}>
          <FormField labelName="Email" fieldName="email" inputType="email"/>
          <FormField labelName="Password" fieldName="password" inputType="password"/>
          <button 
            className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" 
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
      <p className="text-gray-700">
        Don't have an account? <Link className="text-amber-600 hover:text-amber-700 underline" to="/register">Sign up</Link>
      </p>
    </div>
  )
}

export default LoginPage;