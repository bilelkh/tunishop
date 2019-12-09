import { Component, OnInit } from "@angular/core";
import { AdsService } from "../../services/ads.service";
// import { AllCommunityModules } from "@ag-grid-community/all-modules";
import { ButtonRendererComponent } from "../../../../shared/components/renderer-button/button-renderer.component";

@Component({
  selector: "app-ads",
  templateUrl: "./ads.component.html",
  styleUrls: ["./ads.component.scss"]
})
export class AdsComponent implements OnInit {
  private getRowHeight;
  private defaultColDef;

  frameworkComponents: any;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  // columnDefs = [
  //   { field: "make" },
  //   { field: "model" },
  //   { field: "price" },
  //   {
  //     headerName: '',
  //     cellRenderer: "buttonRenderer",
  //     cellRendererParams: {
  //       onClick: this.onBtnClick1.bind(this),
  //       label: "Click 1"
  //     }
  //   },

  // ];

  // rowData = [
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 }
  // ];

  columnDefs = [
    {   width :300 , headerName: "Make", field: "make" },
    {   width :300 , headerName: "Model", field: "model" },
    {   width :300 , headerName: "Price", field: "price" },
    {
      width :100 , 
      headerName: "",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: "Click 1",
        action : 'delete'
      }
    }
,
    {
      width :100 , 
      headerName: "",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.onBtnClick2.bind(this),
        label: "Click 2",
        action : 'edit'
      }
    }

    // {
    //   headerName: "",
    //   field: "icon",
    //   width: 50,
    //   cellRendererParams: {
    //     onClick: this.onBtnClick1.bind(this),
    //     label: 'Click 1'
    //   }
    // }
    //   // cellRenderer: function(params) {
    //   //   return '<button  class="btn btn-sm btn-danger mr-2"><i class="fa fa-trash"></i></button>';
    //   // }
    // },
    // {
    //   headerName: "",
    //   field: "icon",
    //   width: 50,
    //   cellRenderer: function(params) {
    //     return '<button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>';
    //   }
    // }
  ];

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];

  constructor(public adsService: AdsService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    };
    // this.defaultColDef = {
    //   sortable: true,
    //   resizable: true,
    //   filter: true
    // };
    // this.getRowHeight = function(params) {
    //   return params.data.rowHeight;
    // };
  }

  // modules = AllCommunityModules;
  ngOnInit() {
    // this.getAllAds();
  }

  getAllAds() {
    this.adsService.getAds(10, 1).subscribe(
      data => {
        console.log("data", data);

        //this.rowData = this.changeDataModel(data.ads);
      },
      error => {
        console.log("error", error);
      }
    );
  }

  changeDataModel(ads) {
    // const ads = [] ;
    // console.log("==data==", data)
    // for (const ad of ads) {
    //     for (const column of columnDefs) {
    //           for (let [key, value] of Object.entries(ad)) {
    //                               if(key===column.headerName) {
    //                               }
    //                                   if(typeof (value) === 'object') {
    //                                         ads = [...,{key===column.headerName :column.headerName  }]
    //                                   }
    //        }
    //  }
    // for (const ad of ads) {
    // }
  }
  onBtnClick1(e) {
    console.log("===event===", e);
    e.action = 'delete'
    this.rowDataClicked2 = e.rowData;
  }

  onBtnClick2(e) {
    console.log("===event===", e);
    e.action = 'edit'
    this.rowDataClicked2 = e.rowData;
  }

  onClick(event) {
    console.log("===event===", event);
  }
}
