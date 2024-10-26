import Container from "@/@common/container/Container";
import { userHistory } from "@/apis/user";
import DoneTask from "@/components/tasks/taskList/DoneTask";
import { DoneTaskType } from "@/dtos/TaskDtos";
import { formatToKorDate } from "@/utils/convertDate";

export default async function MyHistoryPage() {
  const { tasksDone } = await userHistory();

  const deletedDateList = tasksDone.map((list: DoneTaskType) => list.doneAt);

  const dateFilter = (list: string[], item: Date) => {
    const formatDate = formatToKorDate(item);
    return list.includes(formatDate) ? list : [...list, formatDate];
  };

  const deletedDate = deletedDateList.reduce((list: [], item: Date) => {
    return dateFilter(list, item);
  }, []);

  return (
    <Container>
      <div className="pt-10">
        <h1 className="mb-6 text-xl font-bold text-default-light">
          마이 히스토리
        </h1>
        {deletedDate.map((date: string) => (
          <div key={date} className="flex flex-col gap-4 pb-8">
            <h2>{date}</h2>
            {tasksDone
              .filter(
                (data: DoneTaskType) => formatToKorDate(data.doneAt) === date,
              )
              .map((data: DoneTaskType) => (
                <DoneTask key={data.id} task={data} />
              ))}
          </div>
        ))}
      </div>
    </Container>
  );
}
