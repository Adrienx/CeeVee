import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import GenerateDocument from "./GenerateDocument"
import Documents from "./Documents"
import UserProfile from "./UserProfile"

const Main = () => {
  return (
    <div className="routes-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GenerateDocument" element={<GenerateDocument />} />
        <Route path="/Documents" element={<Documents />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default Main
