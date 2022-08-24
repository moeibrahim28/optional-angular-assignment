import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../checklist-model/item';
import { Observable, of, from } from 'rxjs';

@Injectable()
export class ItemService {
  private itemsUrl: string;

  constructor(private http: HttpClient) {
    this.itemsUrl = 'http://localhost:8080/items';
  }

  public findAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  public save(item: Item) {
    return this.http.post<Item>(this.itemsUrl, item);
  }
}
