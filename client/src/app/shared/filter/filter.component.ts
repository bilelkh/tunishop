import { Component, OnInit,Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  private filterForm: FormGroup;
  @Input() adsList: any;
  @Input() delegationsList: string;
  @Input() governoratesList: string;

  constructor(private formBuilder: FormBuilder, ) {
    this.filterForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("===adsList===",this.adsList);
    console.log("===delegationsList===",this.delegationsList);
    console.log("===governoratesList===",this.governoratesList);

  }

}
