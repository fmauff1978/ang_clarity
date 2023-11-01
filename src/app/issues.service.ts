import { Injectable } from '@angular/core';
import { Issues } from './issues';
import { issues } from '../assets/mock-issues';


@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private issues: Issues[] = [];



  constructor() { }

  getPendingIssues(): Issues[] {
    return this.issues.filter(issue => !issue.completed);







}
createIssue(issue: Issues) {
  issue.issueNo = this.issues.length + 1;
  this.issues.push(issue);
  console.log(issue);
}

completeIssue(issue: Issues){

  const selectedIssue: Issues = {

    ...issue, completed: new Date()};

    const index  = this.issues.findIndex(i=>i===issue);
    this.issues[index] = selectedIssue;
  }

  getSuggestions(title: string): Issues[] {
    if (title.length > 3) {
      return this.issues.filter(issue =>
        issue.title.indexOf(title) !== -1);
    }
    return [];
  }

  updateIssue(issueNo: number, issue: Issues) {
    const existingIssue = this.issues.find(i => i.issueNo === issueNo);
    if(existingIssue) {
      const index = this.issues.indexOf(existingIssue);
      this.issues[index] = {
        ...existingIssue,
        ...issue
      };



    }}
}


