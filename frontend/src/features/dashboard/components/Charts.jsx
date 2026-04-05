import React from 'react'
import LineChartComponent from './LineChartComponent'
import DonutChart from './DonutChart'

const Charts = ({data}) => {
    if (!data) {
        return <div>Loading charts...</div>
    }
  return (
    <div className='grid grid-cols-3 gap-5 mb-6'>
      <LineChartComponent  monthlyStats={data?.monthlyStats} />
      <DonutChart statusStats={data?.statusStats} />
    </div>
  )
}

export default Charts
