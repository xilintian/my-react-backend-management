import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

const lineOption = {
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "5%",
    right: "1%",
    top: "10%",
    bottom: "20%",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [],
      type: "line",
      name: "",
    },
  ],
};

const barOption = {
  tooltip: {
    trigger: "axis",
  },
  grid: {
    top: "10%",
    bottom: "10%",
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [],
      type: "bar",
      name: "",
    },
  ],
};

const pieOption = {
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: "90%",
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

const getLineSeries = (data) => {
  const keys = Object.keys(data[0]);
  return keys.map((key) => {
    return {
      data: data.map((item) => item[key]),
      name: key,
      type: "line",
    };
  });
};

const getBarSeries = (data) => {
  const keys = Object.keys(data[0]);
  return keys.map((key) => {
    return { data: data.map((item) => item[key]), name: key, type: "bar" };
  });
};

const Echarts = ({ style, chartData, chartType }) => {
  const chartRef = useRef(null);
  let chart = null;

  const getOption = (data, type) => {
    if (type === "line") {
      return {
        ...lineOption,
        xAxis: {
          ...lineOption.xAxis,
          data: data.date,
        },
        series: getLineSeries(data.data),
      };
    } else if (type === "bar") {
      return {
        ...barOption,
        xAxis: {
          ...lineOption.xAxis,
          data: getBarSeries(data)[0].data,
        },
        series: getBarSeries(data).filter((_, index) => index !== 0),
      };
    } else {
      return { ...pieOption, series: [{ ...pieOption.series[0], data }] };
    }
  };

  const resizeEcharts = () => {
    chart?.resize();
  };

  useEffect(() => {
    chart = echarts.init(chartRef.current);
    chart?.setOption(getOption(chartData, chartType));
    window.addEventListener("resize", resizeEcharts);
    return () => {
      window.removeEventListener("resize", resizeEcharts);
    };
  }, [chartData]);

  return <div style={style} ref={chartRef}></div>;
};

export default Echarts;
