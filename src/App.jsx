import { BrowserRouter, Route, Routes } from "react-router-dom"
import Gateway from "./components/Gateway"
import Master from "./components/Master"
import MasterForm from "./components/create/MasterForm"
import MasterAlterFilter from "./components/alter/MasterAlterFilter"






function App() {
  

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gateway />} />
          <Route path=":master" element = {<Master />} />
          <Route path="/list/:create" element={<MasterForm />} />
          <Route path="/alter/:altFilter" element={<MasterAlterFilter />} />
          
          
        </Routes>
      </BrowserRouter>
      
      

    </>
  )
}

export default App