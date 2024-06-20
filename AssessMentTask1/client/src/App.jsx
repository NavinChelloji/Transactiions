import {useState } from "react"
import TranscictionStats from "./components/TranscictionStats"
import SearchKeyWord from "./components/SearchKeyWord"
import './App.css'
function App() {
  
  const [month,setMonth]=useState(3)
  return (
    <>
   <SearchKeyWord month={month} setMonth={setMonth}>
    </SearchKeyWord>
    
    <TranscictionStats key={month} month={month==0?3:month} ></TranscictionStats>
    
    </>
    
  )
}

export default App
