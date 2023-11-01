import { issues } from './../../assets/mock-issues';
import { IssuesService } from './../issues.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Issueform } from '../issueform';
import { Issues } from '../issues';


@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {
  issueForm = new FormGroup<Issueform>({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true , validators: Validators.required }),
    type: new FormControl('', { nonNullable: true , validators: Validators.required })




  });

  suggestions: Issues[]= [];
  @Output() formClose = new EventEmitter();

  constructor(private IssuesService: IssuesService){}

  ngOnInit(): void {
    this.issueForm.controls.title.valueChanges.subscribe(title => {
      this.suggestions = this.IssuesService.getSuggestions(title);
    });
  }



  addIssue() {

    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;

    }
    this.IssuesService.createIssue(this.issueForm.getRawValue() as Issues);
    this.formClose.emit();


  }



}
