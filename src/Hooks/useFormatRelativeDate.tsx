import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";


/**
* Cool user experience formated date
* @author andr30z
**/
export function useFormatRelativeDate(dateString: string) {
  const date = useMemo(
    () =>
      formatRelative(new Date(dateString), new Date(), {
        locale: ptBR,
      }),
    [dateString]
  );
  return date;
}
