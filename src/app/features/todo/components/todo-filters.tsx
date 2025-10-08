"use client";

import { useAppStore } from "@/store";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFilterStore } from "../store/filter-store";

export function TodoFilters() {
  // Conecta o componente à store Zustand
  const { status, query, date, setFilter } = useFilterStore();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
      {/* Filtro por Query */}
      <Input
        placeholder="Filtrar por nome..."
        value={query}
        onChange={(e) => setFilter({ query: e.target.value })}
        className="flex-grow"
      />

      {/* Filtro por Status */}
      <Select
        value={status}
        onValueChange={(value) => setFilter({ status: value })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Status</SelectItem>
          <SelectItem value="PENDING">Pendente</SelectItem>
          <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
          <SelectItem value="DONE">Concluído</SelectItem>
        </SelectContent>
      </Select>

      {/* Filtro por Data */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full sm:w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP", { locale: ptBR })
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(selectedDate) =>
              setFilter({ date: selectedDate || null })
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
