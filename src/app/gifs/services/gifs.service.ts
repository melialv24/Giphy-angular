import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'hqsTk5dtVzkcboAI8DvAia79jeGHt5gV';
  private _historial: string[] = [];

  get historial() {
    //De esta manera rompemos la referencia y solo mandamos lo que contiene
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (this._historial.includes(query)) return;
    this._historial.unshift(query);
    this._historial = this._historial.splice(0, 10);

    this.http
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe((resp: any) => {
        console.log(resp.data);
      });

    console.log(this._historial);
  }
}
