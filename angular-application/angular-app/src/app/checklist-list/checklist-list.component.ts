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

  constructor(private checklistService: ChecklistService) {
  }

  ngOnInit() {
    this.checklistService.findAll().subscribe(data => {
      this.checklists = data;
    });
  }

}
