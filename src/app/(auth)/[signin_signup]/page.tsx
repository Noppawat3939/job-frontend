"use client";

import type { RolesParams } from "@/types";
import JobSeekerImage from "@/assets/signin_signup_jobseeker.jpg";
import EmployerImage from "@/assets/signin-signup_employer.jpg";
import Image from "next/image";
import { eq } from "@/lib";
import { Button, Card, Input, Label, Tabs } from "@/components";
import { Eye, EyeOff } from "lucide-react";
import { useToggle } from "@/hooks";

type SignInSignUpPageProps = {
  params: { signin_signup: string };
  searchParams: { selected: RolesParams };
};

export default function SignInSignUpPage({
  searchParams,
}: SignInSignUpPageProps) {
  const { selected } = searchParams;

  const {
    state: { active: showPassword },
    handle: { toggle: onToggleShowPassword },
  } = useToggle();

  return (
    <section className="max-md:px-4">
      <div className="flex items-center w-fit border-2 mx-auto max-md:flex-col">
        <Image
          width={500}
          className="object-contain"
          src={eq(selected, "jobseeker") ? JobSeekerImage : EmployerImage}
          alt="signin-signup"
        />
        <Tabs.Tabs defaultValue="signin" className="w-[500px]">
          <Tabs.TabsList>
            <Tabs.TabsTrigger value="signin">{"Sign in"}</Tabs.TabsTrigger>
            <Tabs.TabsTrigger value="signup">{"Sign up"}</Tabs.TabsTrigger>
          </Tabs.TabsList>
          <Tabs.TabsContent value="signin">
            <Card.Card>
              <Card.CardHeader>
                <Card.CardTitle>Sign in</Card.CardTitle>
              </Card.CardHeader>
              <Card.CardContent>
                <div className="space-y-1">
                  <Label htmlFor="email">{"Email"}</Label>
                  <Input name="email" placeholder="Enter your name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">{"Password"}</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="*********"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={onToggleShowPassword}
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </Card.CardContent>
            </Card.Card>
          </Tabs.TabsContent>
        </Tabs.Tabs>
      </div>
    </section>
  );
}
