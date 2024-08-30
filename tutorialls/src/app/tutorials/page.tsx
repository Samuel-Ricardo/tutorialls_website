import { LazyParagraph } from '@/component/lazy/paragraph.component';
import { ListAllTutorial } from '@/component/list/all/tutorials.component';
import { SearchTutorial } from '@/component/search/tutorial.component';
import { H1 } from '@/component/typography/h1.component';
import { AuthWall } from '@/component/wall/auth.wall';

export default function Tutorials() {
  return (
    //    <AuthWall>
    <main className="flex flex-col min-h-screen min-w-screen bg-[#171717] justify-center items-center p-10">
      <H1>
        <LazyParagraph
          id="h1_tutorials_welcome"
          defaultValue="WELCOME TO TUTORIALLS"
        />
      </H1>
      <div className="w-full h-full">
        <SearchTutorial />
      </div>
      <div className="w-full h-full">
        <ListAllTutorial />
      </div>
    </main>
    //    </AuthWall>
  );
}
