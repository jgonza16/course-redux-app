import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewPost, Post, PostDTO } from '../interfaces/posts.interface';

const BASE_URL = environment.api;
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPostsByUser(userId: number): Observable<PostDTO[]> {
    const params = new HttpParams();
    params.append('userId', userId);
    return this.http.get<PostDTO[]>(`${BASE_URL}/posts`, { params });
  }

  getCommmentdByPost(idPost: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/posts/${idPost}/comments`);
  }

  createPost(body: NewPost): Observable<PostDTO> {
    return this.http.post<PostDTO>(`${BASE_URL}/posts`, body);
  }

  updatePost(body: PostDTO): Observable<PostDTO> {
    return this.http.put<PostDTO>(`${BASE_URL}/posts/${body.id}`, body);
  }

  deletePost(id: number): Observable<{}> {
    return this.http.delete<{}>(`${BASE_URL}/posts/${id}`);
  }
}
