import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';
  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>;

  emitValue(): void {
    this.onValue.emit(this.txtInput.nativeElement.value);
  }
}
