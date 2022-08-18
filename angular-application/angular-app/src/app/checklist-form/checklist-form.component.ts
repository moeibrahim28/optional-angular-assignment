import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from 'app/checklist-service/checklist.service';
import { Checklist } from 'app/checklist-model/checklist';
import { Item } from 'app/checklist-model/item';
import { ItemService } from 'app/checklist-service/item.service';
import { NotFoundError, of } from 'rxjs';
import { TagService } from 'app/checklist-service/tag.service';
import { Tag } from 'app/checklist-model/tag';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit{

  items!: Item[];
  allTags!: Tag[];
  checklist: Checklist;
  selectedItems: Item[] = new Array;
  selectedTags:Tag[] = new Array;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private checklistService: ChecklistService,
        private tagService: TagService) {
    this.checklist = new Checklist();
  }

  onSubmit() {
    this.checklist.itemList = this.selectedItems;
    this.checklist.tagList = this.selectedTags;
    console.log(this.checklist.tagList)
    this.checklistService.save(this.checklist).subscribe(result => this.gotoChecklistList());
  }

  addItemToList(item: Item) {
    this.findItem(item)
     this.selectedItems.push(this.findItem(item));
    
  }

  addTagsToChecklist(tag: Tag) {
    this.findItem(tag)
     this.selectedTags.push(this.findTag(tag));
    
  }
  

  findTag(tag:Tag):Tag{
    
   const foundTag = this.allTags.find((obj) => {
    return obj.name === tag.name;
  });
  if(foundTag!==null){
   return foundTag!;}
   else {
    let newTag:Tag = new Tag;
    newTag.name = tag.name;
    this.tagService.save(newTag);
    return newTag
   }
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
    this.tagService.findAll().subscribe((data) => {
      this.allTags=data;
      console.log(this.allTags)
    });
  }
}