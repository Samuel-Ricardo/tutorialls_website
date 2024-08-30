import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { TutorialCard } from '../card/tutorial.card';

export const ListTutorialContainer = async ({
  data,
}: {
  data: ITutorialDTO[];
}) => {
  return (
    <ul className="flex flex-col gap-4 p-5 my-10">
      {data.map(tutorial => (
        <li key={tutorial.id}>
          <TutorialCard data={tutorial} />
        </li>
      ))}
    </ul>
  );
};
