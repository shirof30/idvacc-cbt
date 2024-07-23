import SplashLogin from "@public/SplashLogin.webp"
import VatsimLogo from "@public/vatsim.png"
import Image from "next/image";
import { auth, signIn } from "@auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";


type LoginPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const LoginPage: React.FC<LoginPageProps> = async ({ searchParams }) => {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
  
  return (
    <div className="flex min-h-screen">
      <div className="image-full card rounded-none w-[70dvw] h-screen bg-cover before:!rounded-none">
        <figure className="rounded-none">
          <Image src={SplashLogin} alt="Image Login" />
        </figure>
        <div className="card-body">
          <div className="mt-auto font-semibold">
            <img src="https://idvacc.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fidvacc-logo.69d8c535.png&w=256&q=75" alt="IDvACC Logo" />
            <h1 className="text-6xl text-[#29b473]"><span className="text-red-600">I</span><span className="text-white">D</span>vACC <span className="text-white">CBT</span></h1>
            <p>Indonesia vACC CBT Website</p>
            <span className="text-xs font-light">v{process.env.APP_VERSION}</span>
          </div>
        </div>
      </div>
      <div className="relative flex-1 w-full p-3 font-semibold">
        <div className="text-center">
          <h1 className="mt-8 text-4xl">Login Page</h1>
          <p className="mt-2 font-normal">Welcome Back!</p>
        </div>
        <form action={
          async () => {
            "use server"
            try {
              await signIn("vatsim");
            }
            catch (e) {
              if (e instanceof AuthError) {
                return redirect(`/error?error=${e.type}`);
              }
              throw e
            }
          }
        } className="flex items-center justify-center mt-12">
          <button className="p-4 h-1/6 flex justify-center items-center text-lg bg-[#29b473] btn hover:bg-[#197249] hover:text-white" type="submit">
            <Image src={VatsimLogo} width={50} alt="VATSIM Logo"/>
            <p>Sign In with VATSIM SSO</p>
          </button>
        </form>
        { searchParams && searchParams.error && <div className="mt-5 text-center text-red-500">Error: {searchParams.error}</div> }
        <div className="absolute bottom-2 right-3">
          &copy; {new Date().getFullYear()} IDvACC
        </div>
      </div>
    </div>
  )
}

export default LoginPage;