"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MdClose } from "react-icons/md";

import { ErrorUi, LoadingUi } from "@/app/(admin)/admin/team/page";
import { TStock } from "@/types/user";
import { useGetStockQuery } from "@/redux/features/warehouse/stockApi";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SelectStockCommand = ({ value, onChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error, isError } = useGetStockQuery(
    { search: searchTerm },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const stocks = data?.data;

  return (
    <div>
      <Label className="block mb-1">Stock</Label>

      {/* If no stock selected */}
      {!value && (
        <Command className="w-full border rounded-lg" shouldFilter={false}>
          <CommandInput
            placeholder="Search stock..."
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value)}
          />

          <CommandList>
            <CommandGroup>
              {isError && <ErrorUi error={error} />}

              {isLoading ? (
                <div className="w-full flex justify-center items-center">
                  <LoadingUi />
                </div>
              ) : (
                <>
                  {stocks?.data?.length === 0 && (
                    <CommandEmpty>No stock found.</CommandEmpty>
                  )}
                </>
              )}

              {stocks?.data?.map((stock : TStock) => (
                <CommandItem
                  key={stock?._id}
                  value={stock?._id}
                  onSelect={(currentValue : string) => {
                    onChange(currentValue === value ? "" : currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === stock._id ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {/* Show stock info */}
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {stock?.productName} - {stock?.warehouse?.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Quantity: {stock?.quantity} {stock?.unit}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}

      {/* If stock already selected */}
      {value && (
        <div className="w-full rounded-lg border flex justify-between items-center">
          <p className="text-muted-foreground px-3 py-2">
           { stocks?.data?.find((stock) => stock._id === value)?.quantity}{" "}
           { stocks?.data?.find((stock) => stock._id === value)?.unit}
          </p>

          <Button variant="ghost" onClick={() => onChange("")}>
            <MdClose />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectStockCommand;