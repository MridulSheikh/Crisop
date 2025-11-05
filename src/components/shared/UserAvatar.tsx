"use client";

import { LogOut, Logs, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

export function UserAvatar({ className, userName }: { className: string, userName: string }) {
  const router = useRouter();
   const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn("cursor-pointer ", className)}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{userName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 text-center  bg-white/90 backdrop-blur-sm"
        align="end"
      >
        <div className=" pt-5 flex justify-center">
          <Avatar className={cn("cursor-pointer size-14 ")}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </div>
        <h2 className=" mt-2 text-center text-sm" >{userName}</h2>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/cart")}
            className=" cursor-pointer"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Cart</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/my-order")}
            className=" cursor-pointer"
          >
            <Logs className="mr-2 h-4 w-4" />
            <span>My order</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => dispatch(logout())} className=" cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
