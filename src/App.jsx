import './App.css'
import Bill from "./components/Bill.jsx";
import {Col, Row} from "antd";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {

  return (
    <>
      <Row>
        <Col span={3}></Col>
        <Col span={18} >
          <Routes>
            <Route path="/" element={
              <Home/>
            }/>
            <Route path="/bill" element={
              <Bill/>
            }/>
          </Routes>
        </Col>
        <Col span={3}></Col>
      </Row>
    </>
  )
}

export default App
