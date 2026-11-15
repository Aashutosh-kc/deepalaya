import { useState,useEffect,useRef } from "react";
import './App.css'
import Whiteboard from "./components/Whiteboard";
export default function App(){
  return(
    <div className="app">
      <Whiteboard />
    </div>
  )
}