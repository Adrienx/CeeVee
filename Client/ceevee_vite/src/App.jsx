import React, { useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import DataContext from "./data/DataContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  const [prompt, setPrompt] = useState("") // state to store user entered prompt
  const [result, setResult] = useState("") // state to store image link retrieved from API
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState("")

  return (
    <div className="App">
      <DataContext.Provider
        value={{
          prompt,
          setPrompt,
          result,
          setResult,
          loading,
          setLoading,
          user,
          setUser,
        }}
      >
        <Header />
        <Main />
      </DataContext.Provider>
    </div>
  )
}

export default App
