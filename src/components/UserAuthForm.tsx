'use client'
import React, { FC, useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {toast}=useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
        // throw new Error("kuch")
      await signIn("google");
    } catch (error) {
      //toast notification
      toast({
        title: 'There was a problem',
        description: 'There was an error logging in with Google',
        variant: 'destructive'
      })

    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        size="sm"
        onClick={loginWithGoogle}
        isLoading={isLoading}
        className="w-full"
      >
        {isLoading? null : <Icons.google className="w-4 h-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
