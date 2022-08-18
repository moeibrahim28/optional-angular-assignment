import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from 'app/checklist-service/checklist.service';
import { Checklist } from 'app/checklist-model/checklist';
import { Item } from 'app/checklist-model/item';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit{

  items!: Item[];
  checklist: Checklist;
  selectedItems: Item[] = new Array;
  tagsString: string="";

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private checklistService: ChecklistService) {
    this.checklist = new Checklist();
  }

  onSubmit() {
    this.checklist.itemList = this.selectedItems;
    
    this.checklist.tags = this.addNewTagsToChecklist(this.tagsString);
    
    console.log(this.checklist)
    this.checklistService.save(this.checklist).subscribe(result => this.gotoChecklistList());
   
  }

  addNewTagsToChecklist(tagsString: string):string[] {
    let tagsArray: string[] = tagsString.split(",");
    return tagsArray;
  }

  addItemToList(item: Item) {
    this.findItem(item)
     this.selectedItems.push(this.findItem(item));
    alert(item.name + " added to cart");
  }

  findItem(item:Item):Item{
    
   const foundItem = this.items.find((obj) => {
    return obj.id === item.id;
  });
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