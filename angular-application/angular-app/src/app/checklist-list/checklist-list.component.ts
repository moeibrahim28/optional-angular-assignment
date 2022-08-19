import { Component, OnInit } from '@angular/core';
import { Checklist } from 'app/checklist-model/checklist';
import { ChecklistService } from 'app/checklist-service/checklist.service';

@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css']
})
export class ChecklistListComponent implements OnInit {

  checklists!: Checklist[];
  searchChecklists!: Checklist[];
  tagsString: string = "";

  constructor(private checklistService: ChecklistService) {
  }

  onSubmit() {
    
    this.searchChecklists = this.findChecklistWithTag(this.checklists)
    if(this.searchChecklists.length===0){
      alert("No checklists found with this tag")
    }
  }

  findChecklistWithTag(allChecklists: Checklist[]): Checklist[] {
    const checklistsWithTag: Checklist[] = new Array;
    for (let i = 0; i < allChecklists.length; i++) {
      for (let tagNumber = 0; tagNumber < allChecklists[i].tags.length; tagNumber++) {
        if (allChecklists[i].tags[tagNumber] === this.tagsString) {
          checklistsWithTag.push(allChecklists[i])
        }
      }
    }
    return checklistsWithTag;
  }

  ngOnInit() {
    this.checklistService.findAll().subscribe(data => {
      this.checklists = data;
    });
  }

}
