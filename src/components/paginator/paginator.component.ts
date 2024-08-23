import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../shared/services/custom-mat-paginator-intl/custom-mat-paginator-intl.service';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]

})
export class PaginatorComponent {
  @Input() public length?: number;
  @Output() public emitPageChanged = new EventEmitter<PageEvent>();

  public handlePageEvent(pageEvent: PageEvent): void {
    this.emitPageChanged.emit(pageEvent);
  }
}
