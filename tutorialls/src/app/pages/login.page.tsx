import { ToggleSignupModalButton } from '@/component/button/modal/signup.component';
import { LoginForm } from '@/component/form/login.form';
import { SignupModal } from '@/component/modal/form/signup.modal';
import { H1 } from '@/component/typography/h1.component';

export const LoginPage = () => {
  return (
    <main className="flex flex-col min-h-screen min-w-screen bg-[#111101] p-5">
      <H1>Login</H1>

      <LoginForm />
      <ToggleSignupModalButton />

      <SignupModal />
    </main>
  );
};
