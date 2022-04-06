import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit, OnChanges {

  @Input() currentPage: number = 1;
  @Input() pageSize: number = 5;
  @Input() sourceData: Array<any> = [];
  @Input() startingItemIndex: number = 0;
  @Input() showItemCount: boolean = true;
  
  @Output() pagedItemsChanged = new EventEmitter<Array<any>>();

  public isFirstPage: boolean = true;
  public isLastPage: boolean = true;
  public firstIndex: number = 0;
  public lastIndex: number = 0;
  public itemCount: number = 0;

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.startingItemIndex)  {
      this.setStartPage(changes.startingItemIndex.currentValue);
    }
    this.pageData();
  }

  ngOnInit(): void {
    //if (this.sourceData) {
    //  this.pageData();
    //}
  }

  setStartPage(startingIndex: number) {
    if (startingIndex <= 0) {
      startingIndex = 0;
    } else if (startingIndex >= this.sourceData.length) {
      startingIndex = this.sourceData.length - 1;
    }

    this.currentPage = Math.floor(startingIndex / this.pageSize) + 1;    
  }

  public pageData(){
    let pagedData: Array<any> = []
    if(this.sourceData) {
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;


      if(endIndex > this.sourceData.length) { 
        endIndex = this.sourceData.length 
      }

      pagedData = this.sourceData.slice(startIndex, endIndex);
      this.itemCount = this.sourceData.length;

      this.isFirstPage = this.currentPage == 1;
      this.isLastPage = this.currentPage == (Math.floor(this.itemCount / this.pageSize) + 1);
      if(this.sourceData.length > 0) {
        this.firstIndex = startIndex + 1;
        this.lastIndex = endIndex;
      } else {
        this.firstIndex = 0;
        this.lastIndex = 0;
      }

    } else {
      this.isFirstPage = true;
      this.isLastPage = true;
      this.firstIndex = 0;
      this.lastIndex = 0;
    }

    this.pagedItemsChanged.emit(pagedData);
  }

  nextPage() {
    this.currentPage++;
    this.pageData();
  }

  previousPage() {
    this.currentPage--;
    this.pageData();
  }

}
