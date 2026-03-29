'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LimitSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const limit = Number(searchParams.get("limit")) || 15;
  const handleLimitChange = (value: string) => {
    params.set("limit", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  return (
    <Select value={String(limit)} onValueChange={handleLimitChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select Item Per Page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Item</SelectLabel>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LimitSelect;
