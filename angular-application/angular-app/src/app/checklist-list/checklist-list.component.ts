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
    if (this.searchChecklists.length === 0) {
      alert("No checklists found with this tag")
    }
  }

  update(checklist:Checklist){

    console.log(checklist)
    checklist.progress = (checklist.isChecked.filter(value => value ===true).length / checklist.isChecked.length)*100
    this.checklistService.update(checklist)
  }

  download_txt(checkList: Checklist) {
    var csv = '';
    let counter: number = 1;
    csv += "User Name: ";
    csv += checkList.user.name;
    csv += "\n";
    csv += "Checklist ID: ";
    csv += checkList.id;
    csv += "\n";
    csv += "Checklist Name: ";
    csv += checkList.name;
    csv += "\n";

    csv += "Tags: ";
    if (checkList.tags.length > 0) {
      if (checkList.tags.length > 1) {
        checkList.tags.forEach(tag => csv += tag + ",")

      }
      else if (checkList.tags.length = 1) {
        csv += checkList.tags[0]
      }
    }
    csv = csv.slice(0, -1)
    csv += "\n";
    checkList.itemList.forEach(item => {
      csv += " -- \n|  | " + item.name + "\n -- ";
      counter++;
      csv += "\n";
    })

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = checkList.name + '.txt';
    hiddenElement.click();
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
    console.log(this.checklists)
    }

}
