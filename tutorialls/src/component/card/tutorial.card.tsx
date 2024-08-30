import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { CardHeader } from './atom/title.card';
import { CardBody } from './atom/body.card';
import { CardFooter } from './atom/footer.card';
import { UpdateCardButton } from '../button/modal/card/update.button';
import { DeleteCardButton } from '../button/modal/card/delete.button';

export const TutorialCard = ({
  data,
}: {
  data: ITutorialDTO;
  key?: string;
}) => {
  return (
    <div className="flex flex-col ease-in-out duration-300 w-full h-fit p-5 shadow-md shadow-[#76ff00] hover:shadow-lg hover:shadow-[#76ff02] hover:scale-105 bg-[#171717] rounded-lg">
      <CardHeader>
        <h1>{data.title}</h1>
        <DeleteCardButton key={data.id!} />
      </CardHeader>
      <CardBody>{data.content} </CardBody>
      <CardFooter>
        {data.author}
        <UpdateCardButton data={data} />
      </CardFooter>
    </div>
  );
};
