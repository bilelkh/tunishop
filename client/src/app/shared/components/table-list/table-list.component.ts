import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  @Input() dataList: any;
  @Input() totalItem: any;
  @Input() page: any;
  @Input() title: any;

  constructor() { }

  ngOnInit() {
    console.log("==dataList==",this.dataList);
    console.log("==totalItem==",this.totalItem)
    console.log("==page==",this.page)
    console.log("==title==",this.title)

  }

}
