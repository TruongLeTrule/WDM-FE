import React from "react";
import styled from "styled-components";
import { Divider, Statistic, Select, Space, Switch, Typography } from "antd";
import { Line } from "@ant-design/charts";

const { Text } = Typography;
const { Option } = Select;

const Report = () => {

  const data = [
    { month: "Jan", revenue: 200 },
    { month: "Feb", revenue: 230 },
    { month: "Mar", revenue: 250 },
    { month: "Apr", revenue: 240 },
    { month: "May", revenue: 260 },
    { month: "Jun", revenue: 280 },
    { month: "Jul", revenue: 300 },
    { month: "Aug", revenue: 310 },
    { month: "Sep", revenue: 320 },
    { month: "Oct", revenue: 310 },
    { month: "Nov", revenue: 300 },
    { month: "Dec", revenue: 290 },
  ];


  const config = {
    data: data,
    xField: "month",
    yField: "revenue",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  return (
    <Container>
      {/* Header Card */}
      <Card>
        <Space align="baseline">
          <Text strong>Wedding</Text>
          <Divider type="vertical" style={{ height: "auto" }} />
          <Space>
            <Statistic title="Number" value={10} />
            <Statistic title="Revenue" value={15000} prefix="$" />
          </Space>
        </Space>
      </Card>

      {/* Line Chart */}
      <Card>
        <Space align="baseline" style={{ marginBottom: 24 }}>
          <Text strong>Revenue ($)</Text>
          <Divider type="vertical" style={{ height: "auto" }} />
          <Select defaultValue="This month" style={{ width: 120 }} />
          <Space>
            <Switch />
            <Text>Follow by</Text>
            <Select defaultValue="Month" style={{ width: 80 }} />
          </Space>
        </Space>
        <Line {...config} />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 24px;
`;

export default Report;