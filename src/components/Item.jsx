import {Card} from "antd";

// eslint-disable-next-line react/prop-types
const Item = ({title, description, amount}) => {
  return (
    <Card title={title} bordered={true} hoverable={true} style={{margin: 10}}>
      {description}<br/>
      Amount: {amount}
    </Card>
  )
}

export default Item