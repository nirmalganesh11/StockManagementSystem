
import React from "react";
import Chartist from "react-chartist";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { useState } from "react";
//import Plot from 'react-plotly.js';
import ChartComponent from '../StockChartsAlltypes/AreaChartZoom'

export const SalesValueChart = () => {
  
  const API_KEY = '78O6MN886Q0H2TLV';
  let StockSymbol = 'FB';
  let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
  let stockChartXValuesFunction = [];
  let stockChartYValuesFunction = [];
  // const [data, setData] =useState({
  //     labels: [],
  //   series: [[]] 
  // })

  const datal ={
    labels :[],
     series :[[]]
  }
  
   fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);
          var count =0;

          for (var key in data['Time Series (Daily)']) {
            count =count+1;
            if(count === 7){
              break;
            }
            stockChartXValuesFunction.push(String(key));
        
            stockChartYValuesFunction.push( Number(data['Time Series (Daily)'][key]['1. open']));
          
          }
          console.log(stockChartXValuesFunction)
          console.log(stockChartYValuesFunction)
          datal.labels = stockChartXValuesFunction
          datal.series[0] = stockChartYValuesFunction
          console.log(datal)
          console.log(data)
          
          // setData({
          //   labels:stockChartXValuesFunction,
          //   series:stockChartYValuesFunction
          // })
        }
      )

     




  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [[1, 2, 2, 3, 3, 4, 3] ]
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: 'end',
      showGrid: true
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: value => `$${value / 1}k`
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <div>
    
     <ChartComponent />
     {/* 
    <Chartist data={datal} options={{...options, plugins}} type="Line" className="ct-series-g ct-double-octave" />
  */}

  </div>

  );
};

export const SalesValueChartphone = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [[1, 2, 2, 3, 3, 4, 3]]
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: false,
    axisX: {
      position: 'end',
      showGrid: true
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: value => `$${value / 1}k`
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{...options, plugins}} type="Line" className="ct-series-g ct-major-tenth" />
  );
};

export const CircleChart = (props) => {
  const { series = [], donutWidth = 20 } = props;
  const sum = (a, b) => a + b;

  const options = {
    low: 0,
    high: 8,
    donutWidth,
    donut: true,
    donutSolid: true,
    fullWidth: false,
    showLabel: false,
    labelInterpolationFnc: value => `${Math.round(value / series.reduce(sum) * 100)}%`,
  }

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={{ series }} options={{...options, plugins}} type="Pie" className="ct-golden-section" />
  );
};

export const BarChart = (props) => {
  const { labels = [], series = [], chartClassName = "ct-golden-section" } = props;
  const data = { labels, series };

  const options = {
    low: 0,
    showArea: true,
    axisX: {
      position: 'end'
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0
    }
  };

  const plugins = [
    ChartistTooltip()
  ]

  return (
    <Chartist data={data} options={{...options, plugins}} type="Bar" className={chartClassName} />
  );
};
