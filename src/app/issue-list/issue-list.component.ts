import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issues } from '../issues';




@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issues[] = [];
  showReportIssue = false;
  selectedIssue: Issues| null = null;
  editIssue: Issues | null = null;




  constructor(private issueService: IssuesService) { }

  ngOnInit(): void {

    this.getIssues();
  }
  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  onCloseReport(){
    this.showReportIssue = false;
    this.getIssues();
  }


onConfirm(confirmed: boolean) {
  if (confirmed && this.selectedIssue) {
    this.issueService.completeIssue(this.selectedIssue);
    this.getIssues();
  }
  this.selectedIssue = null;
}

onCloseEdit() {
  this.editIssue = null;
  this.getIssues();
}

}
