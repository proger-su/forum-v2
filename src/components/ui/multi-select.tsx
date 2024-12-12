import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { PREDEFINED_TOPICS } from "../../lib/constants";

interface MultiSelectProps {
  options: Array<{ label: string; icon: React.ElementType }>;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [search, setSearch] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (optionLabel: string) => {
    const newValue = value.includes(optionLabel)
      ? value.filter((v) => v !== optionLabel)
      : [...value, optionLabel];
    onChange(newValue);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        className={cn(
          "min-h-[2.5rem] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-text",
          className
        )}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-wrap gap-1">
          {value.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm"
            >
              {item}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(item);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={value.length === 0 ? placeholder : ""}
            className="flex-1 bg-transparent outline-none min-w-[8rem] placeholder:text-muted-foreground"
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-md">
          <div className="p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.label);
                const Icon = option.icon;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => toggleOption(option.label)}
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-left",
                      isSelected && "bg-accent/50"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2 shrink-0" />
                    <span className="flex-1 truncate">{option.label}</span>
                    {isSelected && (
                      <Check className="ml-2 h-4 w-4 shrink-0 opacity-100" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}