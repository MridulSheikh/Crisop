import AuthForm from "@/components/ui/auth/AuthForm";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="login" />
    </div>
  );
}
