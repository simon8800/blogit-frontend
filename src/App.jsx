import { Link } from "react-router";

function App() {
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <h1 className="h1-style">Blog It</h1>
      <nav className="flex flex-col p-5 gap-1">
        <Link to="/login">Log In</Link>
        <Link to="/register">Sign Up</Link>
      </nav>
    </div>
  )
}

export default App;