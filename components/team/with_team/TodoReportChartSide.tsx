import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJs, ArcElement } from "chart.js";

ChartJs.register(ArcElement);

interface TodoReportChartSideProps {
  tasksCount: number;
  doneTasksCount: number;
}

export default function TodoReportChartSide({
  tasksCount,
  doneTasksCount,
}: TodoReportChartSideProps) {
  const dataTasksCount = tasksCount ? tasksCount - doneTasksCount : 1;
  const progressPercentage = tasksCount
    ? Math.ceil((doneTasksCount / tasksCount) * 100)
    : 0;

  const chartData = {
    labels: ["오늘의 할 일", "한 일"],
    datasets: [
      {
        data: [dataTasksCount, doneTasksCount],
        backgroundColor: ["#f5be7e", "#ff810d"],
        borderWidth: 0,
        borderRadius: 9999,
        spacing: -20,
        weight: 1,
        rotation: 180,
        cutout: "70%",
      },
    ],
  };

  // hover가 실제로 동작하는 option임에도 type 에러가 떠서 @ts-ignore 사용함
  const chartOptions = {
    responsive: true,
    hover: { mode: null },
  };

  return (
    <>
      <div className="relative mx-auto h-[170px] w-[170px] tab:h-[200px] tab:w-[200px]">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 text-center tab:hidden">
          <div className="md-medium mb-1 text-default-light">진행</div>
          <div className="2xl-bold text-brand-active">
            {progressPercentage}%
          </div>
        </div>
      </div>
      <div className="hidden tab:block">
        <div className="md-medium text-default-light">
          오늘의
          <br />
          진행 상황
        </div>
        <div className="4xl-bold text-brand-active">{progressPercentage}%</div>
      </div>
    </>
  );
}
