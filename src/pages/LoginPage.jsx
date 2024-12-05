import { Link } from "react-router"
import FormField from "./FormField"

const loginUrl = "http://localhost:3000/api/login/"

const LoginPage = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    
    const response = await fetch(loginUrl, {method: "POST", headers: {"Content-Type": "application/json"}, mode: "cors", body: JSON.stringify(values)});
    if (response.status === 404) {
      console.log("Email not found")
      return;
    } else if (response.status === 401) {
      console.log("Incorrect password")
      return;
    } else if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5">
      <h1 className="h1-style"><Link to="/">Blog It</Link></h1>
      <div className="form-container flex justify-center w-8/12">
        <form id="login" className="w-1/2" action="GET" onSubmit={handleSubmit}>
          <FormField labelName="Email" fieldName="email" inputType="email"/>
          <FormField labelName="Password" fieldName="password" inputType="password"/>
            <button className="w-full mt-6 bg-deepOrange hover:bg-burntSienna active:bg-richBrown focus:ring-2 focus:ring-goldenrod text-white px-4 py-2" 
            type="submit"
            >Log In</button>
        </form>
      </div>
      <p>Don't have an account yet? <Link className="underline" to="/register">Create an account</Link></p>
    </div>
  )
}

export default LoginPage;