"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Card } from "@nextui-org/react";
import { login } from "./lib/auth";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login success!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Wrong Email or Password", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image
        src={"/images/logo-2.svg"}
        width={200}
        height={200}
        alt="logo"
        className="mb-8"
      />
      <Card className="max-w-md w-full p-8">
        <h1 className="text-2xl font-bold mb-6 text-primary">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Masukkan Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            clearable
          />
          <Input
            label="Masukkan Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            clearable
          />
          <Button
            type="submit"
            color="primary"
            className="w-full bg-primary"
            variant="shadow">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
