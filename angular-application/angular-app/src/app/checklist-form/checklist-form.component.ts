import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService } from 'app/checklist-service/checklist.service';
import { Checklist } from 'app/checklist-model/checklist';
import { Item } from 'app/checklist-model/item';
import { User } from 'app/model/user';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  items!: Item[];
  users!: User[];
  checklist: Checklist;
  selectedItems: Item[] = new Array;
  tagsString: string = "";
  itemsString: string = "";
  newItems: Item[] = new Array;
  selectedUser!: User;
  allChecklists!: Checklist[];
  isChecked:boolean[] = new Array;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checklistService: ChecklistService,
    private userService: UserService) {
    this.checklist = new Checklist();
  }

  onSubmit() {
    if (this.selectedItems.length !== 0) {
      this.checklist.itemList = this.selectedItems;
    }
    this.checklist.user = this.selectedUser
    this.checklist.tags = this.addNewTagsToChecklist(this.tagsString);
    this.addNewItemsToChecklist(this.itemsString);
    this.checklist.itemList.forEach(() => this.isChecked.push(false))
    this.checklist.isChecked=this.isChecked
    this.checklist.progress=0;
    this.checklistService.save(this.checklist).subscribe(result => this.gotoChecklistList());

  }

  addNewTagsToChecklist(tagsString: string): string[] {
    let tagsArray: string[] = tagsString.split(",");
    return tagsArray;
  }

  removeLastItemAdded() {
    this.selectedItems.pop()
  }

  removeItemFromCart(index:number) {
    this.selectedItems.splice(index,1)
  }

  clearCart(){
    this.selectedItems=[]
  }

  addNewItemsToChecklist(itemsString: string) {
    if (this.itemsString.length > 0) {
      let itemsStringArray: string[] = itemsString.split(",");
      let itemsArray: Item[] = new Array;
      for (let i = 0; i < itemsStringArray.length; i++) {
        let newItem: Item = new Item
        newItem.name = itemsStringArray[i]
        this.checklist.itemList.push(newItem)
      }
    }
  }

  addItemsFromOtherChecklist(otherChecklist: Checklist) {
    for (let i = 0; i < otherChecklist.itemList.length; i++) {
      this.selectedItems.push(otherChecklist.itemList[i])
    }
  }


  addItemToList(item: Item) {
    this.findItem(item)
    this.selectedItems.push(this.findItem(item));
  }

  findItem(item: Item): Item {

    const foundItem = this.items.find((obj) => {
      return obj.id === item.id;
    });
    return foundItem!;
  }

  gotoChecklistList() {
    this.router.navigate(['/checklists']);
  }

  updateUser(e: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === parseInt(e.target.value)) {
        this.selectedUser = this.users[i]
      }
    }
  }

  ngOnInit() {
    this.checklistService.findAllItems().subscribe((data) => {
      this.items = data;
    });

    this.checklistService.findAll().subscribe((data) => {
      this.allChecklists = data;
    });

    this.userService.findAll().subscribe((data) => {
      this.users = data;
    });

  }

}