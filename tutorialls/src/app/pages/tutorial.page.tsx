import { ToggleCreateTutorialModalButton } from '@/component/button/modal/card/create.button';
import { LazyParagraph } from '@/component/lazy/paragraph.component';
import { ListAllTutorial } from '@/component/list/all/tutorials.component';
import { DynamicTutorialList } from '@/component/list/dynamic.component';
import { CreateTutorialModal } from '@/component/modal/form/tutorial/create.modal';
import { UpdateTutorialModal } from '@/component/modal/form/tutorial/update.modal';
import { SearchTutorial } from '@/component/search/tutorial.component';
import { H1 } from '@/component/typography/h1.component';

export const TutorialsPage = () => {
  return (
    <>
      <H1>
        <LazyParagraph
          id="h1_tutorials_welcome"
          defaultValue="WELCOME TO TUTORIALLS"
        />
      </H1>
      <div className="w-full h-full">
        <SearchTutorial />
      </div>
      <div className="flex w-full h-full my-5 justify-center items-center">
        <ToggleCreateTutorialModalButton />
      </div>
      <div className="w-full h-full">
        <DynamicTutorialList>
          <ListAllTutorial />
        </DynamicTutorialList>
      </div>

      <CreateTutorialModal />
      <UpdateTutorialModal />
    </>
  );
};
