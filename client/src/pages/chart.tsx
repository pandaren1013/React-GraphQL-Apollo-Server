import React from "react";
import BarChart from "components/BarChart";
import { MdArrowDropUp } from "react-icons/md";
import { RecordObj } from "../types/user-types";
import { useQuery, gql } from "@apollo/client";
import Card from "components/card";
export const GET_RECORDS = gql`
  query GetRecords {
    records {
      id
      name
      position
      score
      level
    }
  }
`;


export const barChartDataDailyTraffic: { name: string, data: number[] }[] = [
  {
    name: "Daily Traffic",
    data: [],
  },
];

export const barChartOptionsDailyTraffic: {
  chart: {
    toolbar: {
      show: boolean;
    };
  };
  tooltip: {
    style: {
      fontSize: string;
      fontFamily: string | undefined;
      backgroundColor: string;
    };
    onDatasetHover: {
      style: {
        fontSize: string;
        fontFamily: string | undefined;
      };
    };
    theme: string;
  };
  xaxis: {
    categories: string[];
    show: boolean;
    labels: {
      show: boolean;
      style: {
        colors: string;
        fontSize: string;
        fontWeight: string;
      };
    };
    axisBorder: {
      show: boolean;
    };
    axisTicks: {
      show: boolean;
    };
  };
  yaxis: {
    show: boolean;
    color: string;
    labels: {
      show: boolean;
      style: {
        colors: string;
        fontSize: string;
      };
    };
  };
  grid: {
    show: boolean;
    strokeDashArray: number;
    yaxis: {
      lines: {
        show: boolean;
      };
    };
    xaxis: {
      lines: {
        show: boolean;
      };
    };
  };
  fill: {
    type: string;
    gradient: {
      type: string;
      shadeIntensity: number;
      opacityFrom: number;
      opacityTo: number;
      colorStops: {
        offset: number;
        color: string;
        opacity: number;
      }[];
    };
  };
  dataLabels: {
    enabled: boolean;
  };
  plotOptions: {
    bar: {
      borderRadius: number;
      columnWidth: string;
    };
  };
} = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000",
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["00", "04", "08"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        {
          offset: 0,
          color: "#4318FF",
          opacity: 1,
        },
        {
          offset: 100,
          color: "rgba(67, 24, 255, 1)",
          opacity: 0.28,
        },
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
    },
  },
};

const DailyTraffic = () => {
  const { loading, error, data } = useQuery(GET_RECORDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  5620.
  
  barChartDataDailyTraffic[0].data = data?.records.map(
    (record:RecordObj) => record.score
  );
  barChartOptionsDailyTraffic.xaxis.categories= data?.records.map(
    (record:RecordObj) => record.name
  );

  // xaxis: {
  //   categories: string[];
  return (
    <div className="my-16">
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-3xl font-medium leading-4 text-gray-600">
          Members Scores
          </p>
         
        </div>
        <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold"> +2.45% </p>
          </div>
        </div>
      </div>

      <div className="h-[500px] w-full pt-10 pb-0">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </div>
    </Card>
    </div>
  );
};

export default DailyTraffic;
