import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Item {
  id: number;
  name: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private readonly http = inject(HttpClient);
  // write here the Api_Base_Url
  private readonly items = signal<Item[]>([]);

  getAll() {
    return this.items;
  }

  loadAll() {
    // this.http.get<Item[]>(write here the baseUrL).subscribe((items) => this.items.set(items));
  }

  create(name: string, quantity: number) {
    this.http
      // .post<Item>(write here the baseUrL, { name: name.trim(), quantity })
      // .subscribe((item) => this.items.update((list) => [...list, item]));
  }

  update(id: number, changes: Partial<Omit<Item, 'id'>>) {
    this.http
      // .put<Item>(`${write here the baseUrL}/${id}`, changes)
      // .subscribe((updated) =>
      //   this.items.update((list) => list.map((it) => (it.id === id ? updated : it)))
      // );
  }

  delete(id: number) {
    this.http
      // .delete<void>(`${write here the baseUrL}/${id}`)
      // .subscribe(() => this.items.update((list) => list.filter((it) => it.id !== id)));
  }
}
