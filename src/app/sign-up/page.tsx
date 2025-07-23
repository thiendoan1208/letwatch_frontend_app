import SignUpForm from "@/app_components/form/SignUpForm";
import Image from "next/image";

function SignInPage() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start md:justify-center">
      <div className="mt-15 md:mt-0">
        <Image
          className="w-[200px]"
          src="/logo_name.png"
          alt="logo-name"
          width={100}
          height={100}
          priority
        />
      </div>

      <div className="w-full flex justify-center px-4">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignInPage;
