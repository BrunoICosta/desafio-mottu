import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss',
})
export class NoDataComponent {
  @Input() public title!: string;
  @Input() public subTitle!: string;
  @Input() public isShowButton: boolean = false;
  @Output() public emitClickButton = new EventEmitter<void>();

  public buttonClicked(): void {
    this.emitClickButton.emit();
  }
}
