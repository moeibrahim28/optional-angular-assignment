import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from '../checklist-model/tag';
import {Observable,of, from } from 'rxjs';

@Injectable()
export class TagService {

  private tagsUrl: string;

  constructor(private http: HttpClient) {
    this.tagsUrl = 'http://localhost:8080/tags';
  }

  public findAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl);
  }

  public save(tag: Tag) {
    return this.http.post<Tag>(this.tagsUrl, tag);
  }
}