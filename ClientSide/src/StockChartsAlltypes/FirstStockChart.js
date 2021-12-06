import React from "react"
import ChartComponent from './AreaChartZoom'
import CandleStick from './CandleStickStart'
import CandleStickTwo from './CandleStickTwoStart'
export default () => {
    return (
        <div>
        <CandleStickTwo/>
        <CandleStick/>
        <ChartComponent/>
        
        </div>
    )
}
