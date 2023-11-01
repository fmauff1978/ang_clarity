import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issues } from '../issues';
import { Issueform } from '../issueform';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})

export class IssueDetailComponent implements OnInit{


  @Input() issue: Issues | undefined;
  @Output() formClose = new EventEmitter();
  issueForm: FormGroup<Issueform> | undefined;

  constructor(private builder: FormBuilder, private issueService: IssuesService) { }

  ngOnInit(): void {
    if (this.issue) {
      this.issueForm = this.builder.group<Issueform>({
        title: new FormControl(this.issue.title, { nonNullable: true, validators: Validators.required }),
        description: new FormControl(this.issue.description, { nonNullable: true }),
        priority: new FormControl(this.issue.priority, { nonNullable: true, validators: Validators.required }),
        type: new FormControl(this.issue.priority, { nonNullable: true, validators: Validators.required })
            });
    }
  }
  save() {
    if (this.issue) {
      this.issueService.updateIssue(this.issue.issueNo, this.issueForm?.getRawValue() as Issues);
      this.formClose.emit();
    }
  }

}

