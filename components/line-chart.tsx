'use client';

import { Props } from 'react-apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartConfig: Props = {
  type: 'line',
  height: 350,
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {},
    dataLabels: {
      enabled: false,
    },
    colors: ['#b7d0ed'],
    stroke: {
      lineCap: 'round',
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      categories: ['F', 'D', 'C', 'B', 'A'],
    },
    yaxis: {
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: { opacity: 0.8 },
    tooltip: {
      theme: 'light',
    },
  },
};
interface LineChartProps extends React.HTMLProps<HTMLDivElement> {
  chartData: number[];
}

const LineChart: React.FC<LineChartProps> = ({ chartData, ...props }) => {
  return (
    <div {...props}>
      <Chart
        series={[
          {
            name: 'Students',
            data: chartData,
          },
        ]}
        {...chartConfig}
      />
    </div>
  );
};

export default LineChart;
