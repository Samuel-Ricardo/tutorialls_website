import { AuthWall } from '@/component/wall/auth.wall';
import { TutorialsPage } from '../pages/tutorial.page';

export default function Tutorials() {
  return (
    <AuthWall>
      <main className="flex flex-col min-h-screen min-w-screen bg-[#111101] justify-center items-center p-10">
        <TutorialsPage />
      </main>
    </AuthWall>
  );
}
