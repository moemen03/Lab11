import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsService, Item } from './items.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-3xl font-semibold tracking-tight mb-6">Simple CRUD</h1>

      <section class="bg-white shadow-sm border border-gray-200 rounded-xl p-5 mb-6">
        <h2 class="text-lg font-medium mb-4" *ngIf="editingId === null">Add Item</h2>
        <h2 class="text-lg font-medium mb-4" *ngIf="editingId !== null">Edit Item #{{ editingId }}</h2>

        <form class="space-y-4" (ngSubmit)="editingId === null ? addItem() : saveEdit()">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" type="text" [(ngModel)]="name" name="name" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" type="number" [(ngModel)]="quantity" name="quantity" min="1" required />
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button class="inline-flex items-center rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="submit">{{ editingId === null ? 'Add' : 'Save' }}</button>
            <button class="inline-flex items-center rounded-lg bg-gray-100 text-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" type="button" *ngIf="editingId !== null" (click)="cancelEdit()">Cancel</button>
          </div>
        </form>
      </section>

      <section class="bg-white shadow-sm border border-gray-200 rounded-xl">
        <div class="px-5 pt-5">
          <h2 class="text-lg font-medium">Items</h2>
        </div>
        <div class="overflow-x-auto p-5">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="bg-gray-100 text-gray-700">
                <th class="text-left font-semibold px-3 py-2">ID</th>
                <th class="text-left font-semibold px-3 py-2">Name</th>
                <th class="text-left font-semibold px-3 py-2">Quantity</th>
                <th class="text-left font-semibold px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t" *ngFor="let item of items()">
                <td class="px-3 py-2">{{ item.id }}</td>
                <td class="px-3 py-2">{{ item.name }}</td>
                <td class="px-3 py-2">{{ item.quantity }}</td>
                <td class="px-3 py-2">
                  <div class="flex gap-2">
                    <button class="inline-flex items-center rounded-md bg-blue-600 text-white px-3 py-1.5 text-xs font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" (click)="startEdit(item)">Edit</button>
                    <button class="inline-flex items-center rounded-md bg-rose-600 text-white px-3 py-1.5 text-xs font-medium hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500" (click)="deleteItem(item.id)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private readonly itemsSvc = inject(ItemsService);
  protected readonly items = this.itemsSvc.getAll();

  protected name = '';
  protected quantity = 1;
  protected editingId: number | null = null;

  ngOnInit(): void {
    this.itemsSvc.loadAll();
  }

  protected addItem() {
    if (!this.name.trim()) return;
    this.itemsSvc.create(this.name, this.quantity);
    this.name = '';
    this.quantity = 1;
  }

  protected startEdit(item: Item) {
    this.editingId = item.id;
    this.name = item.name;
    this.quantity = item.quantity;
  }

  protected saveEdit() {
    if (this.editingId == null) return;
    this.itemsSvc.update(this.editingId, { name: this.name.trim(), quantity: this.quantity });
    this.cancelEdit();
  }

  protected cancelEdit() {
    this.editingId = null;
    this.name = '';
    this.quantity = 1;
  }

  protected deleteItem(id: number) {
    this.itemsSvc.delete(id);
    if (this.editingId === id) this.cancelEdit();
  }
}

