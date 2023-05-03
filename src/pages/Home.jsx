import {Button, DatePicker, Input, InputNumber} from "antd";
import {Row, Col} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import {useEffect, useState} from "react";
import Item from "../components/Item.jsx";
import { useNavigate } from "react-router-dom";
import numWords from "num-words";

const Home = () => {

  const [product, setProduct] = useState([])
  const [buyName, setBuyName] = useState()
  const [buyAddress, setBuyAddress] = useState()
  const [itemTitle, setItemTitle] = useState()
  const [itemDescription, setItemDescription] = useState()
  const [rate, setRate] = useState()
  const [gst, setGst] = useState()
  const [total, setTotal] = useState(0)
  const [counter, setCounter] = useState(0)
  const [billNo, setBillNo] = useState()
  const [date, setDate] = useState()

  const history = useNavigate()

  const addProduct = () => {
    setCounter(counter+1)
    setTotal(total => total + rate + ((rate*(gst/2))/100)*2)
    setProduct(product => [...product,
      {
        id:  counter,
        buyName: buyName,
        buyAddress: buyAddress,
        itemTitle: itemTitle,
        itemDescription: itemDescription,
        rate: rate,
        gst: gst,
      }]
    )
  }

  useEffect(() => {
    // product.map(item => setTotal(item.rate + ((item.rate*(item.gst/2))/100)*2))
    console.log(product)
  },[product])
  //
  // useEffect(() => {
  //   console.log(numWords(total))
  // },[total])

  const handleClick = () => {
    history("/bill", {state:
      {
        product:product,
        total: total,
        billNo: billNo,
        date: date,
    }});
  }

  const handleDate = (date ,dateString) => {
    setDate(dateString)
    console.log(dateString)
  };

  return (
    <>
      <h1>Invoice Generator</h1>
      <Row gutter={[16,16]}>
        <Col span={4}>
          Buyer Name
        </Col>
        <Col span={8}>
          <Input onChange={(e) =>  setBuyName(e.target.value)}/>
        </Col>
        <Col span={4}>
          Buyer Address
        </Col>
        <Col span={8}>
          <TextArea
            onChange={(e) => setBuyAddress(e.target.value)}
            autoSize={{
              minRows: 3,
              maxRows: 6,
            }}
          />
        </Col>
      </Row>
      <hr/>
      <h2 style={{marginTop: 0}}>Items</h2>
      <Row gutter={[16,16]}>
        <Col span={4}>
          Bill Number
        </Col>
        <Col span={8}>
          <Input onChange={(e) =>  setBillNo(e.target.value)}/>
        </Col>
        <Col span={4}>
          Date
        </Col>
        <Col span={8}>
          <DatePicker onChange={handleDate}  format="DD/MM/YY"/>
        </Col>
      </Row>
      <br/>
      <Row gutter={[16,16]}>
        <Col span={4}>
          Item Title
        </Col>
        <Col span={8}>
          <Input onChange={(e) =>  setItemTitle(e.target.value)}/>
        </Col>
        <Col span={4}>
          Item Description
        </Col>
        <Col span={8}>
          <TextArea
            onChange={(e) => setItemDescription(e.target.value)}
            autoSize={{
              maxRows: 6,
            }}
          />
        </Col>
      </Row>
      <br/>
      <Row gutter={[16,16]}>
        <Col span={4}>
          Rate
        </Col>
        <Col span={8}>
          <InputNumber min={0}  defaultValue={0} onChange={(value) =>  setRate(value)} />
        </Col>
        <Col span={4}>
          GST
        </Col>
        <Col span={8}>
          <InputNumber min={0} defaultValue={0} onChange={(value) =>  setGst(value)} />
        </Col>
      </Row>
      <br/>
      <Row>
        <Col span={2}>
          <Button type={"default"} onClick={addProduct}>Add</Button>
        </Col>
        <Col span={2}>
          <Button type={"primary"} onClick={handleClick}>Generate</Button>
        </Col>
      </Row>
      <hr/>
      {
        product.map(prod =>
          // eslint-disable-next-line react/jsx-key
          <Item
            title={prod.buyName}
            description={prod.itemTitle}
            amount={prod.rate}
        />)
      }
    </>
  )
}

export default Home