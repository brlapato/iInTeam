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
  @Input() startingItemIndex: number = -1;
  @Input() showItemCount: boolean = true;
  
  @Output() pagedItemsChanged = new EventEmitter<Array<any>>();

  public isFirstPage: boolean = true;
  public isLastPage: boolean = true;
  public firstIndex: number = -1;
  public lastIndex: number = -1;
  public itemCount: number = -1;

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    this.pageData();
  }

  ngOnInit(): void {
    //if (this.sourceData) {
    //  this.pageData();
    //}
  }

  pageData(){
    let pagedData: Array<any> = []
    if(this.sourceData) {
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;

      if(endIndex > this.sourceData.length) { 
        endIndex = this.sourceData.length 
      }

      console.log("paging: start: " + startIndex.toString() + " end: " + endIndex.toString());
      pagedData = this.sourceData.slice(startIndex, endIndex);
      this.itemCount = this.sourceData.length;

      this.isFirstPage = this.currentPage == 1;
      this.isLastPage = this.currentPage == (Math.floor(this.itemCount / this.pageSize) + 1);
      this.firstIndex = startIndex + 1;
      this.lastIndex = endIndex;

      this.pagedItemsChanged.emit(pagedData);
    }
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
