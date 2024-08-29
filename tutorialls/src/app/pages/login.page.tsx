import { ToggleSignupModalButton } from '@/component/button/modal/signup.component';
import { LoginForm } from '@/component/form/login.form';
import { SignupModal } from '@/component/modal/signup.modal';

export const LoginPage = () => {
  return (
    <main className="flex flex-col min-h-screen min-w-screen bg-[#171717] p-5">
      <h1 className="text-[#73eb12] text-6xl font-bold text-center mb-24">
        Login
      </h1>

      <LoginForm />
      <ToggleSignupModalButton />

      <SignupModal />
    </main>
  );
};
