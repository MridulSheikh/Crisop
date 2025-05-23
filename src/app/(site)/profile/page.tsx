"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Key, LogOut, Pencil } from "lucide-react";

const user = {
  name: "Mridul Sheikh",
  email: "mridul@example.com",
  phone: "+880 1234-567890",
  address: "Dhaka, Bangladesh",
  role: "Customer",
  avatar: "https://ui-avatars.com/api/?name=Mridul+Sheikh",
};

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6 bg-white text-black">
      <Card className="border border-gray-200 shadow-none relative">
        <Button variant={"ghost"} size={"sm"} className=" absolute top-3 right-3">
            <Pencil />
        </Button>
        <CardHeader className="flex justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-5">
            <Button variant="destructive">
             <LogOut /> Log out
            </Button>
            <Button variant="default">
             <Key /> Change password
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-black w-1/4">Full Name</TableCell>
                <TableCell className="text-gray-700">{user.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Email</TableCell>
                <TableCell className="text-gray-700">{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Phone</TableCell>
                <TableCell className="text-gray-700">{user.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Address</TableCell>
                <TableCell className="text-gray-700">{user.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-black">Role</TableCell>
                <TableCell className="text-gray-700">{user.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
