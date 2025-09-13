import React from "react"
import { Label } from "../../label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../command"
import { Button } from "../../button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { MdClose } from "react-icons/md"

const warehouses = [
  { id: "wh1", name: "Dhaka Warehouse" },
  { id: "wh2", name: "Chittagong Warehouse" },
  { id: "wh3", name: "Sylhet Warehouse" },
]

type Props = {
  value: string
  onChange: (value: string) => void
}

export function SelectWarehouse({value, onChange} : Props) {

  return (
    <div>
      <Label className="block mb-1">Warehouse</Label>
      {
        !value && (
          <Command className="w-full border rounded-lg">
            <CommandInput placeholder="Search warehouse..." />
            <CommandList>
              <CommandEmpty>No warehouse found.</CommandEmpty>
              <CommandGroup>
                {warehouses.map((wh) => (
                  <CommandItem
                    key={wh.id}
                    value={wh.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === wh.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {wh.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )
      }


      {value && (
        <div className="w-full rounded-lg border flex justify-between">
          <p className="text-muted-foreground px-2 py-2">
            {warehouses.find((wh) => wh.id === value)?.name}
          </p>
          <Button variant={"ghost"} onClick={() => onChange("")}>
               <MdClose />
          </Button>
        </div>
      )}
    </div>
  )
}
