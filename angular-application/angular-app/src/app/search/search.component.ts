import { Component, OnInit } from '@angular/core';
import { Checklist } from 'app/checklist-model/checklist';
import { ChecklistService } from 'app/checklist-service/checklist.service';
import { User } from 'app/model/user';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  checklists!: Checklist[];
  searchChecklists!: Checklist[];
  tagsString?: string;
  users!: User[];
  selectedUser?: User;
  
  constructor(private checklistService: ChecklistService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.checklistService.findAll().subscribe((data) => {
      this.checklists = data;
      this.searchChecklists=this.checklists
    });
    this.userService.findAll().subscribe((data) => {
      this.users = data;
    });
  }
  onSubmit() {
    this.searchChecklists = this.findChecklistWithTag(this.checklists);
    if (this.searchChecklists.length === 0) {
      alert('No checklists found with this tag');
    }
  }

  updateUser(e: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === parseInt(e.target.value)) {
        this.selectedUser = this.users[i];
      }
    }
    if(this.selectedUser===undefined){
      this.searchChecklists=this.checklists
    }
    else if (this.selectedUser!==undefined){
      let filteredAllChecklistsByUser = this.checklists.filter((checklist) => checklist.user.id===this.selectedUser?.id)
      this.searchChecklists = filteredAllChecklistsByUser
      this.selectedUser=undefined
    }
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
}
