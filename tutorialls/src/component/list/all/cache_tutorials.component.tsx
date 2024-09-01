import { MODULES } from '@/@module/app.facotry';
import { ListTutorialContainer } from '../container.component';

export const CachedListAllTutorial = async () => {
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
