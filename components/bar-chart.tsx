'use client';

import { Props } from 'react-apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartConfig: Props = {
  type: 'bar',
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
    plotOptions: {
      bar: {
        columnWidth: '80%',
        borderRadius: 6,
      },
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
      categories: [5, 4, 3, 2, 1],
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

interface BarChartProps extends React.HTMLProps<HTMLDivElement> {
  chartData: number[];
}

const BarChart: React.FC<BarChartProps> = ({ chartData, ...props }) => {
  return (
    <div {...props}>
      <Chart
        series={[
          {
            name: 'Reviews',
            data: chartData,
          },
        ]}
        {...chartConfig}
      />
    </div>
  );
};

export default BarChart;