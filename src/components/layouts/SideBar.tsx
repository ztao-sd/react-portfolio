import React from "react";
import { Menu } from "lucide-react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EXTRA_PAGES, MAIN_PAGES } from "@/config/constants";

const mainPages = MAIN_PAGES;
const extraPages = EXTRA_PAGES;

const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="h-[32px] w-[32px] p-0"
        >
          <Menu></Menu>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[170px] p-0">
        <Command>
          <CommandInput placeholder="Search page..." />
          <CommandList>
            <CommandEmpty>No page found.</CommandEmpty>
            <CommandGroup>
              {(mainPages.concat(extraPages)).map((page) => (
                <CommandItem
                  key={page.label}
                  value={page.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    navigate(page.route);
                  }}
                  className="font-bold"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === page.label ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {page.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SideBar;
