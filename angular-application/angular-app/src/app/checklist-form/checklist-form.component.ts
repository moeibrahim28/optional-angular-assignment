import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from 'app/checklist-service/checklist.service';
import { Checklist } from 'app/checklist-model/checklist';
import { Item } from 'app/checklist-model/item';
import { ItemService } from 'app/checklist-service/item.service';
import { NotFoundError, of } from 'rxjs';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit{

  items!: Item[];
  checklist: Checklist;
  selectedItems: Item[] = new Array;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private checklistService: ChecklistService) {
    this.checklist = new Checklist();
  }

  onSubmit() {
    this.checklist.itemList = this.selectedItems;
    this.checklistService.save(this.checklist).subscribe(result => this.gotoChecklistList());
  }

  addItemToList(item: Item) {
    this.findItem(item)
     this.selectedItems.push(this.findItem(item));
    
  }
  

  findItem(item:Item):Item{
    console.log(item.id)
    
   const foundItem = this.items.find((obj) => {
    return obj.id === item.id;
  });
  console.log(foundItem)
   return foundItem!;
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