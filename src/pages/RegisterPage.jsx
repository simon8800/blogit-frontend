import FormField from "./FormField"
import { Link } from "react-router"
const signupUrl = "http://localhost:3000/api/signup/"

const RegisterPage = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(values));
    // fetch(signupUrl, {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   mode: "cors", // default value
    //   body: JSON.stringify(values),
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     localStorage.setItem("token", data.token);
    //   })
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5">
      <h1 className="h1-style"><Link to="/">Blog It</Link></h1>
      <div className="form-container flex justify-center w-8/12">
        <form id="login" className="w-1/2" action="GET" onSubmit={handleSubmit}>
          <FormField labelName="Email" fieldName="email" inputType="email"/>
          <FormField labelName="Password" fieldName="password" inputType="password"/>
          <FormField labelName="Confirm Password" fieldName="confirmpassword" inputType="password"/>
            <button className="w-full mt-6 bg-deepOrange hover:bg-burntSienna active:bg-richBrown focus:ring-2 focus:ring-goldenrod text-white px-4 py-2" 
            type="submit"
            >Log In</button>
        </form>
      </div>
      <p>Have an account already? <Link className="underline" to="/login">Sign in</Link></p>
    </div>
  )
}

export default RegisterPage;