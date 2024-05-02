import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

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

  mainImageUrl: any;
  mainImage: any;
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.mainImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mainImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onchange() {}
  insertItems() {
    axios
      .post(
        'http://localhost:3000/api/v1/products/addproduct',
        {
          productName: this.name,
          price: this.price,
          description: this.description,
          rating: '',
          image: this.mainImage,
          category: this.category,
          otherImages: null,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type for file upload
          },
        }
      )
      .then((response: any) => {
        alert('image uploaded successfully');
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);

        alert('something went wrong');
      });
  }
  updateItems() {
    if (this.id && this.mainImage) {
      axios
        .patch(
          'http://localhost:3000/api/v1/products/updateproduct',
          {
            id: this.id,
            productName: this.name,
            price: this.price,
            description: this.description,
            rating: '',
            image: this.mainImage,
            category: this.category,
            otherImages: null,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Set content type for file upload
            },
          }
        )
        .then((response: any) => {
          alert('Product Updated successfully');
          console.log(response);
        })
        .catch((error: any) => {
          console.log(error);

          alert('something went wrong');
        });
    } else {
      alert('Please enter a valid id and image');
    }
  }
  fetchItems() {
    if (this.id.length == 24) {
      axios
        .get('http://localhost:3000/api/v1/products/getproductbyid', {
          params: {
            _id: this.id,
          },
        })
        .then((response: any) => {
          this.searchData = response.data.data;
          // alert('Product Deleted successfully');
          console.log(response);
        });
    } else {
      if (this.category.length > 0) {
        axios
          .get('http://localhost:3000/api/v1/products/getproductbycategory', {
            params: {
              category: this.category,
            },
          })
          .then((response: any) => {
            // alert('Product Deleted successfully');
            this.searchData = response.data.data;
            console.log(response);
            console.log(this.searchData);
          });
      } else if (this.name.length > 0) {
        axios
          .get('http://localhost:3000/api/v1/products/getproductbyname', {
            params: {
              name: this.name,
            },
          })
          .then((response: any) => {
            this.searchData = response.data.data;
            // alert('Product Deleted successfully');
            console.log(response);
          });
      }
    }
  }
  deleteItems() {
    if (this.id.length == 24) {
      axios
        .patch('http://localhost:3000/api/v1/products/deleteproduct', {
          id: this.id,
        })
        .then((response: any) => {
          alert('Product Deleted successfully');
          console.log(response);
        })
        .catch((error: any) => {
          console.log(error);

          alert('something went wrong');
        });
    }
  }
  infoLoader(i: any) {}
}
