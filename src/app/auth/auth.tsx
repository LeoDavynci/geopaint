import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
   return (
      <div className="flex flex-col items-center justify-center h-screen">
         <h1 className="text-4xl font-bold mb-4">Login or Sign Up</h1>
         <AuthForm />
      </div>
   );
}
