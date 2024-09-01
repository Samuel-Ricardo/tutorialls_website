import { MODULES } from '@/@module/app.facotry';
import { ListTutorialContainer } from '../container.component';

export const revalidate = 3;
export const dynamicParams = true;

export const ListAllTutorial = async () => {
  try {
    const list = await MODULES.APPLICATION.CONTROLLER.TUTORIAL().listAll({
      pagination: { limit: 10, page: 1 },
    });
    return (
      <>{list?.items ? <ListTutorialContainer data={list.items} /> : <></>}</>
    );
  } catch (e) {
    console.log(e);
    return <></>;
  }
};
