import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  ngOnInit() {
    console.log('hello');
    axios.get('http://localhost:3000/products').then((res) => {
      console.log(res.data);
    });
  }
}
