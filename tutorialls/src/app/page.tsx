import { LazyParagraph } from '@/component/lazy/paragraph.component';
import { NavigateButton } from '@/component/button/navigate.componente';
import { LazyImage } from '@/component/lazy/image.component';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen min-w-screen bg-[#111101] justify-center items-center">
      <h1 className="text-[#73eb12] text-6xl font-bold text-center mb-24">
        <LazyParagraph id="home_welcome" defaultValue="WELCOME TO TUTORIALLS" />
      </h1>

      <LazyImage
        id="home_img"
        src="https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="home"
        width={600}
        height={300}
        className="mb-16 rounded-3xl"
      />

      <NavigateButton id="home_login" label="LOGIN" to="/login" />
    </main>
  );
}
