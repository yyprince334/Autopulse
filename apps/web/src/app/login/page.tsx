"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Activity, ArrowRight, Github } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setAccessToken } = useAuth();

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    try {
      const res = await login(email, password);

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      setAccessToken(res.accessToken);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-xl bg-black/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <Activity className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold">AutoPulse</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500">Don't have an account?</span>
            <a
              href="#"
              className="text-sm text-white hover:text-neutral-300 transition-colors"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="relative flex items-center justify-center min-h-screen px-6 py-24">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-neutral-500">
              Sign in to continue to AutoPulse
            </p>
          </div>

          {/* Form Card */}
          <Card className="border border-white/10 bg-black/50 backdrop-blur-sm rounded-2xl shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-neutral-300"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="you@company.com"
                    className="h-11 bg-white/[0.02] border-white/10 text-white placeholder:text-neutral-600 rounded-lg
                             focus:bg-white/[0.04] focus:border-white/20 focus:ring-0
                             hover:bg-white/[0.03] hover:border-white/15
                             transition-all"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-neutral-300"
                    >
                      Password
                    </Label>
                    <a
                      href="#"
                      className="text-xs text-neutral-500 hover:text-white transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="••••••••"
                    className="h-11 bg-white/[0.02] border-white/10 text-white placeholder:text-neutral-600 rounded-lg
                             focus:bg-white/[0.04] focus:border-white/20 focus:ring-0
                             hover:bg-white/[0.03] hover:border-white/15
                             transition-all"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Sign In Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group w-full h-11 bg-white text-black rounded-lg text-sm font-medium 
                           hover:bg-neutral-200 transition-all flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-black px-3 text-neutral-600">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-11 bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/15
                             text-white transition-all rounded-lg"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-sm">Google</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-11 bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/15
                             text-white transition-all rounded-lg"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    <span className="text-sm">GitHub</span>
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-center gap-3 text-xs text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Secure access
                  </span>
                  <span>•</span>
                  <span>Enterprise ready</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Text */}
          <p className="text-center text-sm text-neutral-600 mt-8">
            By signing in, you agree to our{" "}
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}