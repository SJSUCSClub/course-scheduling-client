'use client';

import dynamic from 'next/dynamic';
import { Props as ChartConfigProps } from 'react-apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  name: string;
  data: number[];
  categories: (string | number)[];
}

export const BarChart: React.FC<Props> = ({ name, data, categories }) => {
  const chartDarkConfig: ChartConfigProps = {
    series: [
      {
        name,
        data,
      },
    ],
    type: 'bar',
    height: 350,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#77A4D7'],
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
            colors: '#dddddd',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
        categories,
      },
      yaxis: {
        labels: {
          style: {
            colors: '#dddddd',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#575757',
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
        theme: 'dark',
      },
    },
  };
  const chartLightConfig: ChartConfigProps = {
    series: [
      {
        name,
        data,
      },
    ],
    type: 'bar',
    height: 350,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
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
        categories,
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

  return (
    <div className="h-[350px]">
      <div className="dark:hidden">
        <Chart {...chartLightConfig} />
      </div>
      <div className="hidden dark:block">
        <Chart {...chartDarkConfig} />
      </div>
    </div>
  );
};
