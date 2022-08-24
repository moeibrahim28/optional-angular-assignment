import { Component, OnInit } from '@angular/core';
import { Checklist } from 'app/checklist-model/checklist';
import { ChecklistService } from 'app/checklist-service/checklist.service';
import { User } from 'app/model/user';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css'],
})
export class ChecklistListComponent implements OnInit {
  checklists!: Checklist[];
  searchChecklists!: Checklist[];
  tagsString: string = '';
  users!: User[];
  selectedUser?: User;
  

  constructor(private checklistService: ChecklistService,
    private userService: UserService) {}

  onSubmit() {
    this.searchChecklists = this.findChecklistWithTag(this.checklists);
    if (this.searchChecklists.length === 0) {
      alert('No checklists found with this tag');
    }
  }

  update(checklist: Checklist) {
    checklist.progress =
      (checklist.isChecked.filter((value) => value === true).length /
        checklist.isChecked.length) *
      100;
    this.checklistService.update(checklist);
  }

  download_txt(checkList: Checklist) {
    var csv = '';
    let counter: number = 1;
    csv += 'User Name: ';
    csv += checkList.user.name;
    csv += '\n';
    csv += 'Checklist ID: ';
    csv += checkList.id;
    csv += '\n';
    csv += 'Checklist Name: ';
    csv += checkList.name;
    csv += '\n';

    csv += 'Tags: ';
    if (checkList.tags.length > 0) {
      if (checkList.tags.length > 1) {
        checkList.tags.forEach((tag) => (csv += tag + ','));
      } else if ((checkList.tags.length = 1)) {
        csv += checkList.tags[0];
      }
    }
    csv = csv.slice(0, -1);
    csv += '\n';
    for (let index = 0; index < checkList.itemList.length; index++) {
      if (checkList.isChecked[index] === false) {
        csv += ' -- \n|  | ' + checkList.itemList[index].name + '\n -- ';
        counter++;
        csv += '\n';
      } else if (checkList.isChecked[index] === true) {
        csv += ' -- \n| √ | ' + checkList.itemList[index].name + '\n -- ';
        counter++;
        csv += '\n';
      }
    }

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = checkList.name + '.txt';
    hiddenElement.click();
  }

  download_json(checkList: Checklist) {
    let stringJson: string = '';
    stringJson = JSON.stringify(checkList);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text;charset=utf-8,' + encodeURI(stringJson);
    hiddenElement.target = '_blank';
    hiddenElement.download = checkList.name + '.json';
    hiddenElement.click();
  }

  updateUser(e: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === parseInt(e.target.value)) {
        this.selectedUser = this.users[i];
      }
    }
    let filteredAllChecklistsByUser = this.checklists.filter((checklist) => checklist.user.id===this.selectedUser?.id)
     this.searchChecklists = filteredAllChecklistsByUser
  }

  findChecklistWithTag(allChecklists: Checklist[]): Checklist[] {
    const checklistsWithTag: Checklist[] = new Array();
    if(this.selectedUser===undefined){
    for (let i = 0; i < allChecklists.length; i++) {
      for (let tagNumber = 0; tagNumber < allChecklists[i].tags.length;tagNumber++) {
        
          if (allChecklists[i].tags[tagNumber] === this.tagsString) {
            checklistsWithTag.push(allChecklists[i]);
          }
        }
      }
    }
    else if(this.selectedUser!==undefined){
      let filteredAllChecklistsByUser = this.checklists.filter((checklist) => checklist.user.id===this.selectedUser?.id)
      for (let i = 0; i < filteredAllChecklistsByUser.length; i++) {
        for (let tagNumber = 0; tagNumber < filteredAllChecklistsByUser[i].tags.length;tagNumber++) {
          
            if (filteredAllChecklistsByUser[i].tags[tagNumber] === this.tagsString) {
              checklistsWithTag.push(filteredAllChecklistsByUser[i]);
            }
          }
        }
    }
    return checklistsWithTag;
  }

  ngOnInit() {
    this.checklistService.findAll().subscribe((data) => {
      this.checklists = data;
    });
    this.userService.findAll().subscribe((data) => {
      this.users = data;
    });
  }
}
