import {MatPaginatorIntl} from '@angular/material';

export function CustomMatPaginatorIntl() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';
  customPaginatorIntl.firstPageLabel = "Primera página";
  customPaginatorIntl.lastPageLabel = "Última página";
  customPaginatorIntl.nextPageLabel = "Siguiente página";
  customPaginatorIntl.previousPageLabel = "Página anterior";

  return customPaginatorIntl;
}