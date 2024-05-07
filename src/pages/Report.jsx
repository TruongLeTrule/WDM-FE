import React, { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { DatePicker, Divider, Statistic, Space, Typography, Radio } from "antd";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Line, getDatasetAtEvent, getElementAtEvent } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { getListRevenue, getTotalRevenue } from "../api/revenue.api"
import ExportCSVButton from "../components/ExportCSVBtn";
import Loading from "../components/Loading";


dayjs.extend(customParseFormat);

const { Text } = Typography;
const monthFormat = 'YYYY/MM';
const yearFormat = 'YYYY';

const Report = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [isExtraFee, setIsExtraFee] = useState(false)
  const [isLoad, setLoad] = useState(false)
  const newDate = new Date()
  const [dateReport, setDateReport] = useState({
    month: newDate.getMonth() + 1,
    year: newDate.getFullYear()
  })
  useEffect(() => {
    const fetchDataRevenue = async () => {
      setLoad(true)
      try{
        const res = await getListRevenue(isExtraFee);
        const year = dateReport.year
        const month = dateReport.month
        const totalRevenueData = await getTotalRevenue(year, month)
        setData(res.data)
        setTotalRevenue(totalRevenueData.data)
        setLoad(false)
      } catch(error) {
        setLoad(false)
        console.log(error.message);
      }

    }

    fetchDataRevenue()
  },[isExtraFee, dateReport])

  const handleToggleExtraFee = () => {
    setIsExtraFee(!isExtraFee)
  }

  if(data) {
    const newData = data.reverse()
    return (
      <Fragment>
        {isLoad && <Loading minsize="35px" />}
        <ReportInner 
          setDateReport={setDateReport}
          data={newData} 
          totalRevenue={totalRevenue} 
          isExtraFee={isExtraFee}
          handleToggleExtraFee={handleToggleExtraFee}
          />
      </Fragment>
    )
  }
}

const ReportInner = (p) => {
  const { data, totalRevenue, handleToggleExtraFee, setDateReport } = p
  const [showFollowBy, setShowFollowBy] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [getChart, setChart] = useState("1");
  const handleSettingClick = () => {
    setShowFollowBy(!showFollowBy);
  };
  // const handleRadioChange = (e) => {
  //   setShowMonthPicker(e.target.value === "month");
  // };
// 
  const handleDateChange = (date) => {
    const newDate = new Date(date.$d);

    // Get the month (getMonth() returns month from 0-11, so add 1 to match normal 1-12 format)
    const month = newDate.getMonth() + 1;

    // Get the year
    const year = newDate.getFullYear();

    setDateReport({month, year})
    setSelectedDate(date);
  };

  // const handleReloadClick = () => {
  //   window.location.reload();
  // };

  let filteredData = data.filter(item => {
    if (showMonthPicker) {
      return dayjs(item.day, "DD-MM-YYYY").format("YYYY-MM") === selectedDate.format("YYYY-MM");
    } else {
      return dayjs(item.day, "DD-MM-YYYY").format("YYYY") === selectedDate.format("YYYY");
    }
  });

  // filteredData = filteredData.reverse()

  const monthlyData = filteredData.reduce((acc, cur) => {
    const monthYear = dayjs(cur.day, "DD-MM-YYYY").format("MM/YYYY");
    if (!acc[monthYear]) {
      acc[monthYear] = { weddingNumber: 0, estimate_revenue: 0 };
    }
    acc[monthYear].weddingNumber += cur.weddingnumber;
    acc[monthYear].estimate_revenue += cur.estimate_revenue;
    return acc;
  }, {});


  const monthlyLabels = Object.keys(monthlyData);
  const monthlyWeddingNumbers = monthlyLabels.map(label => monthlyData[label].weddingNumber);
  const monthlyRevenues = monthlyLabels.map(label => monthlyData[label].estimate_revenue);
  const monthlyRealeRevenues = monthlyLabels.map(label => monthlyData[label].real_revenue);

  const totalYearlyRevenue = monthlyRevenues.reduce((acc, cur) => acc + cur, 0);
  const yearlyRatio = totalYearlyRevenue === 0 ? 0 : (totalYearlyRevenue / (showMonthPicker ? 32444 : 324440)).toFixed(2);

  const totalWeddingNumber = filteredData.reduce((acc, cur) => acc + cur.weddingnumber, 0);
  // const totalRevenue = filteredData.reduce((acc, cur) => acc + cur.estimate_revenue, 0);


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
        label: 'Real Revenue',
        data: filteredData.map(item => item.real_revenue),
        fill: false,
        borderColor: 'rgb(7, 174, 18)',
        yAxisID: 'y',
      },
      {
        label: 'Estimate Revenue',
        data: filteredData.map(item => item.estimate_revenue),
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
        <ActionBtn>
          {showMonthPicker ? (
              <DatePicker value={selectedDate} onChange={handleDateChange} picker="month"/>
            ) : (
              <DatePicker value={selectedDate} onChange={handleDateChange} picker="year" />
            )}
          <ShowExtraBtn onClick={handleToggleExtraFee}>show extra fee</ShowExtraBtn>
          
            <ExportCSVButton data={data}>Export File</ExportCSVButton>
          
        </ActionBtn>

        <Space align="baseline" style={{ marginBottom: 24 }}>
          <Statistic title="Wedding Number" value={totalRevenue.weddingNum} />
          <Statistic title="Current Revenue" value={totalRevenue.realRevenue} prefix="VND" />
          <Statistic title="Estimate Revenue" value={totalRevenue.estimateRevenue} prefix="VND" />
          {/* <Divider type="vertical" style={{ height: "auto" }} /> */}
         {/*  <Space>
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

          </Space> */}
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
                  <th>Real Revenue ($)</th>
                  <th>Ratio</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{showMonthPicker ? dayjs(item.day, "DD-MM-YYYY").format("DD/MM") : dayjs(item.day, "DD-MM-YYYY").format("MM/YYYY")}</td>
                    <td>{item.weddingnumber}</td>
                    <td>{item.estimate_revenue}</td>
                    <td>{item.real_revenue}</td>
                    <td>{item.ratio}</td>
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
                  <th>Real Revenue ($)</th>
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
                    <td>{monthlyRealeRevenues[index]}</td>
                    <td>{yearlyRatio}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainerYear>
        }
     
      </Card>

    </Container>
  );
};

const Container = styled.div`
  // padding: 24px;
  height: 100vh;
  overflow: auto;

  .ant-space {
    margin-bottom: 24px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 29px;
  }

  .ant-space-item {
    border-radius: 10px!important;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px!important;
    padding: 10px!important;

    .ant-statistic-content-prefix {
      font-size: 0.8rem!important;
      font-style: italic!important;
    }

    .ant-statistic-title {
      font-weight: 700!important;
      color: #0f0537!important;
      font-size: 1.1rem!important;
    }

    .ant-statistic-content-value-int {
      font-size: 1.3rem!important;
      text-align: center;
    }

    .ant-statistic-content{
      text-align: center;
    }
  }
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
const ShowExtraBtn = styled.button`
    background-color: #1a00ff;
    padding: 10px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
`
const ActionBtn = styled.button`
    display: flex;
    align-items: center;
    margin: 10px;
    gap: 10px;
    width: 100%;
    justify-content: flex-start;
`

export default Report;
