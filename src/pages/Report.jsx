import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { DatePicker, Divider, Statistic, Space, Typography, Radio } from "antd";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Line, getDatasetAtEvent, getElementAtEvent } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { getListRevenue } from "../api/revenue.api"

dayjs.extend(customParseFormat);

const { Text } = Typography;
const monthFormat = 'YYYY/MM';
const yearFormat = 'YYYY';

const Report = () => {
  const [data, setData] = useState([
    { day: "01-04-2024", weddingnumber: 2, revenue: 200 },
    { day: "02-04-2024", weddingnumber: 1, revenue: 250 },
    { day: "03-04-2024", weddingnumber: 5, revenue: 300 },
    { day: "04-04-2024", weddingnumber: 6, revenue: 100 },
    { day: "05-04-2024", weddingnumber: 8, revenue: 50 },
    { day: "06-04-2024", weddingnumber: 5, revenue: 120 },
    { day: "07-04-2024", weddingnumber: 3, revenue: 290 },
    { day: "08-04-2024", weddingnumber: 4, revenue: 80 },
    { day: "09-04-2024", weddingnumber: 3, revenue: 100 },
    { day: "10-04-2024", weddingnumber: 2, revenue: 300 },
    { day: "11-04-2024", weddingnumber: 7, revenue: 400 },
    { day: "12-04-2024", weddingnumber: 3, revenue: 500 },
    { day: "13-04-2024", weddingnumber: 1, revenue: 350 },
    { day: "14-04-2024", weddingnumber: 4, revenue: 200 },
    { day: "15-04-2024", weddingnumber: 4, revenue: 300 },
    { day: "16-04-2024", weddingnumber: 4, revenue: 100 },
    { day: "17-04-2024", weddingnumber: 4, revenue: 500 },
    { day: "18-04-2024", weddingnumber: 4, revenue: 200 },
    { day: "19-04-2024", weddingnumber: 4, revenue: 700 },
    { day: "20-04-2024", weddingnumber: 4, revenue: 900 },
    { day: "21-04-2024", weddingnumber: 4, revenue: 100 },
    { day: "22-04-2024", weddingnumber: 4, revenue: 500 },
    { day: "23-04-2024", weddingnumber: 4, revenue: 200 },
    { day: "24-04-2024", weddingnumber: 4, revenue: 400 },
    { day: "25-04-2024", weddingnumber: 4, revenue: 300 },
    { day: "26-04-2024", weddingnumber: 4, revenue: 200 },
    { day: "27-04-2024", weddingnumber: 4, revenue: 600 },
    { day: "28-04-2024", weddingnumber: 4, revenue: 700 },
    { day: "29-04-2024", weddingnumber: 4, revenue: 300 },
    { day: "30-04-2024", weddingnumber: 4, revenue: 200 },
    { day: "01-05-2024", weddingnumber: 2, revenue: 200 },
    { day: "02-05-2024", weddingnumber: 1, revenue: 250 },
    { day: "03-05-2024", weddingnumber: 5, revenue: 300 },
    { day: "04-05-2024", weddingnumber: 6, revenue: 100 },
    { day: "05-05-2024", weddingnumber: 8, revenue: 50 },
    { day: "06-05-2024", weddingnumber: 5, revenue: 120 },
    { day: "07-05-2024", weddingnumber: 3, revenue: 290 },
    { day: "08-05-2024", weddingnumber: 4, revenue: 80 },
    { day: "09-05-2024", weddingnumber: 3, revenue: 100 },
    { day: "10-05-2024", weddingnumber: 2, revenue: 300 },
    { day: "11-05-2024", weddingnumber: 7, revenue: 400 },
    { day: "12-05-2024", weddingnumber: 3, revenue: 500 },
    { day: "13-05-2024", weddingnumber: 1, revenue: 350 },
    { day: "14-05-2024", weddingnumber: 3, revenue: 200 },
    { day: "15-05-2024", weddingnumber: 3, revenue: 300 },
    { day: "16-05-2024", weddingnumber: 2, revenue: 100 },
    { day: "17-05-2024", weddingnumber: 1, revenue: 500 },
    { day: "18-05-2024", weddingnumber: 2, revenue: 200 },
    { day: "19-05-2024", weddingnumber: 4, revenue: 700 },
    { day: "20-05-2024", weddingnumber: 3, revenue: 900 },
    { day: "21-05-2024", weddingnumber: 1, revenue: 100 },
    { day: "22-05-2024", weddingnumber: 2, revenue: 500 },
    { day: "23-05-2024", weddingnumber: 1, revenue: 200 },
    { day: "24-05-2024", weddingnumber: 4, revenue: 400 },
    { day: "25-05-2024", weddingnumber: 5, revenue: 300 },
    { day: "26-05-2024", weddingnumber: 6, revenue: 200 },
    { day: "27-05-2024", weddingnumber: 2, revenue: 600 },
    { day: "28-05-2024", weddingnumber: 5, revenue: 700 },
    { day: "29-05-2024", weddingnumber: 5, revenue: 300 },
    { day: "30-05-2024", weddingnumber: 2, revenue: 200 },
    { day: "31-05-2024", weddingnumber: 6, revenue: 200 },
    { day: "2-06-2024", weddingnumber: 9, revenue: 600 },
    { day: "7-06-2024", weddingnumber: 5, revenue: 800 },
    { day: "20-06-2024", weddingnumber: 4, revenue: 200 },
  ]);

  useEffect(() => {
    const fetchDataRevenue = async () => {
      try{
        const res = await getListRevenue();
        setData(res.data)

      } catch(error) {
        console.log(error.message);
      }

    }

    fetchDataRevenue()
  },[])

  if(data) {
    return (
      <ReportInner data={data} />
    )
  }
}

const ReportInner = (p) => {
  const { data } = p
  const [showFollowBy, setShowFollowBy] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [getChart, setChart] = useState("1");
  const handleSettingClick = () => {
    setShowFollowBy(!showFollowBy);
  };
  const handleRadioChange = (e) => {
    setShowMonthPicker(e.target.value === "month");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReloadClick = () => {
    window.location.reload();
  };

  const filteredData = data.filter(item => {
    if (showMonthPicker) {
      return dayjs(item.day, "DD-MM-YYYY").format("YYYY-MM") === selectedDate.format("YYYY-MM");
    } else {
      return dayjs(item.day, "DD-MM-YYYY").format("YYYY") === selectedDate.format("YYYY");
    }
  });

  const monthlyData = filteredData.reduce((acc, cur) => {
    const monthYear = dayjs(cur.day, "DD-MM-YYYY").format("MM/YYYY");
    if (!acc[monthYear]) {
      acc[monthYear] = { weddingNumber: 0, revenue: 0 };
    }
    acc[monthYear].weddingNumber += cur.weddingnumber;
    acc[monthYear].revenue += cur.revenue;
    return acc;
  }, {});


  const monthlyLabels = Object.keys(monthlyData);
  const monthlyWeddingNumbers = monthlyLabels.map(label => monthlyData[label].weddingNumber);
  const monthlyRevenues = monthlyLabels.map(label => monthlyData[label].revenue);

  const totalYearlyRevenue = monthlyRevenues.reduce((acc, cur) => acc + cur, 0);
  const yearlyRatio = totalYearlyRevenue === 0 ? 0 : (totalYearlyRevenue / (showMonthPicker ? 32444 : 324440)).toFixed(2);

  const totalWeddingNumber = filteredData.reduce((acc, cur) => acc + cur.weddingnumber, 0);
  const totalRevenue = filteredData.reduce((acc, cur) => acc + cur.revenue, 0);
  const ratio = totalRevenue === 0 ? 0 : (totalRevenue / (showMonthPicker ? 32444 : 324440)).toFixed(2);


  const ChartDataMonth = {
    labels: showMonthPicker ? filteredData.map(item => dayjs(item.day, "DD-MM-YYYY").format("DD")) : filteredData.map(item => dayjs(item.day, "DD-MM-YYYY").format("MM")),
    datasets: [
      {
        label: 'Wedding Number',
        data: filteredData.map(item => item.weddingnumber),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y1',
      },
      {
        label: 'Revenue',
        data: filteredData.map(item => item.revenue),
        fill: false,
        borderColor: 'rgb(53, 162, 235)',
        yAxisID: 'y',
      }
    ],
  };
  const ChartDataYear = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Wedding Number',
        data: monthlyWeddingNumbers,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y1',
      },
      {
        label: 'Revenue',
        data: monthlyRevenues,
        fill: false,
        borderColor: 'rgb(53, 162, 235)',
        yAxisID: 'y',
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Sales report',
        font: {
          size: 25
        }
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    onClick: function(e) {   
      // const canvasPosition = Chart.helpers.getRelativePosition(e, chart);

      // // Substitute the appropriate scale IDs
      // const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
      // const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
    }
  };

  const chartRef = useRef();

  const handleClickChart = (e) => {
    const point = getElementAtEvent(chartRef.current, e);
    console.log(point[0].element.$context);
  }



  return (
    <Container>
      <Card>
        <Space align="baseline" style={{ marginBottom: 24 }}>
          <Statistic title="Wedding Number" value={totalWeddingNumber} />
          <Statistic title="Current Revenue" value={totalRevenue} prefix="VND" />
          <Statistic title="Estimate Revenue" value={totalRevenue} prefix="VND" />
          <Divider type="vertical" style={{ height: "auto" }} />
          {showMonthPicker ? (
            <DatePicker value={selectedDate} onChange={handleDateChange} picker="month"/>
          ) : (
            <DatePicker value={selectedDate} onChange={handleDateChange} picker="year" />
          )}
          <Space>
            <ReloadOutlined onClick={handleReloadClick} />
            <SettingOutlined onClick={handleSettingClick} />
            {showFollowBy && (
              <FollowByBox>
                <Text>Follow by</Text>
                <Radio.Group defaultValue="month" onChange={handleRadioChange}>
                  <Radio value="month" onClick={() => setChart("1")}>Month</Radio>
                  <Radio value="year" onClick={() => setChart("2")}>Year</Radio>
                </Radio.Group>
              </FollowByBox>
            )}

          </Space>
        </Space>
        {getChart === "1" &&
          <LineChartContainer>
            <div className="inner">
              <Line data={ChartDataMonth} options={options} onClick={handleClickChart} ref={chartRef}/>
            </div>
          </LineChartContainer>
        }
        {getChart === "2" &&
          <LineChartContainer>
            <div className="inner">
              <Line data={ChartDataYear} options={options} />
            </div>
          </LineChartContainer>
        }
        {getChart === "1" &&
          <TableContainerMonth>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Wedding Number</th>
                  <th>Revenue ($)</th>
                  <th>Ratio</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{showMonthPicker ? dayjs(item.day, "DD-MM-YYYY").format("DD/MM") : dayjs(item.day, "DD-MM-YYYY").format("MM/YYYY")}</td>
                    <td>{item.weddingnumber}</td>
                    <td>{item.revenue}</td>
                    <td>{ratio}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainerMonth>
        }
        {getChart === "2" &&
          <TableContainerYear>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Wedding Number</th>
                  <th>Revenue ($)</th>
                  <th>Ratio</th>
                </tr>
              </thead>
              <tbody>
                {monthlyLabels.map((label, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{label}</td>
                    <td>{monthlyWeddingNumbers[index]}</td>
                    <td>{monthlyRevenues[index]}</td>
                    <td>{yearlyRatio}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainerYear>
        }
      </Card>
      <ButtonContainer>
        <Button>Export File</Button>
      </ButtonContainer>

    </Container>
  );
};

const Container = styled.div`
  // padding: 24px;
  height: 100vh;
  overflow: auto;
`;

// const Card1 = styled.div`
//   background-color: #fff;
//   border: 1px solid #d9d9d9;
//   border-radius: 2px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 16px;
//   margin-bottom: 24px;
// `;
const Card = styled.div`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;
const TableContainerMonth = styled.div`
  height: 55vh;
  overflow-y: auto;
`;
const TableContainerYear = styled.div`
  height: 55vh;
  overflow-y: auto;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #d9d9d9;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const Button = styled.button`
  background-color: #ffcc00;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ffb300;
  }
`;

const FollowByBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-top: 16px;
`;
const LineChartContainer = styled.div`
  margin: 40px; 
  display: flex;
  justify-content: center;

  .inner {
    max-width: 1200px;
    width: 100%;
  }

`;
export default Report;
