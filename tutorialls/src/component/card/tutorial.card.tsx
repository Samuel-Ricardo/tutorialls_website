import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';

export const TutorialCard = ({
  data,
}: {
  data: ITutorialDTO;
  key?: string;
}) => {
  return <div>{JSON.stringify(data)}</div>;
};
