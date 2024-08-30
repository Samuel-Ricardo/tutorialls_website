import { ListTutorialContainer } from '../container.component';

export const ListAllTutorial = async () => {
  //  const list = await MODULES.APPLICATION.CONTROLLER.TUTORIAL().listAll({
  //    pagination: { limit: 20, page: 1 },
  //  });

  const list = {
    items: [
      {
        id: '1',
        title: 'title',
        content: 'content',
        author: 'author',
      },
    ],
  };

  return <ListTutorialContainer data={list.items} />;
};
