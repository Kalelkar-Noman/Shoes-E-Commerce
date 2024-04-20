import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  receivedCategoryData: any[] = [];
  imagePreviews: string = '';
  imagePreviewsLink: string = '';
  id: string = '';
  name: string = '';
  category: string = '';
  price: number = 0;
  description: string = '';
  searchData: any[] = [];
  access = true;
  userToken = 'id';

  onchange() {}
  insertItems() {}
  updateItems() {}
  fetchItems() {}
  deleteItems() {}
  infoLoader(i: any) {}
}
