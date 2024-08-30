import { LazyParagraph } from '@/component/lazy/paragraph.component';
import { H1 } from '@/component/typography/h1.component';
import { AuthWall } from '@/component/wall/auth.wall';

export default function Tutorials() {
  return (
    //    <AuthWall>
    <main className="flex min-h-screen min-w-screen bg-[#171717] justify-center items-center">
      <H1>
        <LazyParagraph
          id="h1_tutorials_welcome"
          defaultValue="WELCOME TO TUTORIALLS"
        />
      </H1>
    </main>
    //    </AuthWall>
  );
}
