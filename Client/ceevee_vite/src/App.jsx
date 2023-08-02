import React, { useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import DataContext from "./data/DataContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

function App() {
  const [prompt, setPrompt] = useState("") // state to store user entered prompt
  const [result, setResult] = useState("") // state to store image link retrieved from API
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState("")

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container)
  }, [])

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
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#000000", // black background
              },
              // You can replace this gradient with black, grays, gold, cream, light reds
              image:
                "linear-gradient(19deg, #000000 0%, #D4AF37 50%, #F5E6C4 100%)",
            },
            particles: {
              number: { value: 10, density: { enable: true, value_area: 600 } },
              color: { value: ["#D4AF37", "#808080", "#F5E6C4", "#FFC0CB"] }, // gold, grey, cream, light red
              shape: {
                type: "square",
                stroke: { width: 0, color: "#000000" }, // black stroke
                polygon: { nb_sides: 5 },
              },
              opacity: {
                value: 0.25,
                random: true,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 29,
                random: true,
                anim: { enable: false, speed: 2, size_min: 0.1, sync: false },
              },
              line_linked: {
                enable: false,
                distance: 300,
                color: "#808080", // grey lines
                opacity: 0,
                width: 0,
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: "top",
                straight: true,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: false, mode: "repulse" },
                onclick: { enable: false, mode: "push" },
                resize: true,
              },
              modes: {
                grab: { distance: 800, line_linked: { opacity: 1 } },
                bubble: {
                  distance: 790,
                  size: 79,
                  duration: 2,
                  opacity: 0.8,
                  speed: 3,
                },
                repulse: { distance: 400, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
              },
            },
            retina_detect: true,
          }}
        />

        <Header />
        <Main />
      </DataContext.Provider>
    </div>
  )
}

export default App
