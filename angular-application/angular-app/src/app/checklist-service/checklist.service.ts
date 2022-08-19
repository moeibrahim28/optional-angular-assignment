import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Checklist } from '../checklist-model/checklist';
import { Observable, of, from, map } from 'rxjs';
import { Item } from 'app/checklist-model/item';
import { ItemService } from './item.service';

@Injectable()
export class ChecklistService {

  private checklistsUrl: string;
  private itemsUrl: string;
  constructor(private http: HttpClient) {
    this.checklistsUrl = 'http://localhost:8080/checklists';
    this.itemsUrl = 'http://localhost:8080/items';
  }

  public findAll(): Observable<Checklist[]> {
    return this.http.get<Checklist[]>(this.checklistsUrl);
  }

  public findAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  public findItem(item: Item): Observable<Item> {
    return this.http.get<Item>(this.itemsUrl + "/" + item.id);
  }


  public save(checklist: Checklist) {
    return this.http.post<Checklist>(this.checklistsUrl, checklist);
  }
}