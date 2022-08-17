import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from 'app/checklist-service/checklist.service';
import { Checklist } from 'app/checklist-model/checklist';
import { Item } from 'app/checklist-model/item';
import { ItemService } from 'app/checklist-service/item.service';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit{

  items!: Item[];
  checklist: Checklist;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private checklistService: ChecklistService) {
    this.checklist = new Checklist();
  }

  onSubmit() {
    this.checklist.itemList = this.items;
    this.checklistService.save(this.checklist).subscribe(result => this.gotoChecklistList());
  }

  addItemToList(event: any,item: Item) {
    // this.checklist.itemList.push(this.findItem(item));
    
  }
  

  findItem(item:Item){
    return this.checklistService.findItem(item);
  }

  gotoChecklistList() {
    this.router.navigate(['/checklists']);
  }

  ngOnInit() {
    this.checklistService.findAllItems().subscribe((data) => {
      this.items=data;
    });
  }
}