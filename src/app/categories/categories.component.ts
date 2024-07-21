// // categories.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

// @Component({
//   selector: 'app-categories',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.css']
// })
// export class CategoriesComponent implements OnInit {

//   constructor(private afs: AngularFirestore) { }

//   ngOnInit(): void {
//     // Initialize any data if needed
//   }

//   onSubmit(formData: any) {
//     let categoryData = {
//       category: formData.value.category
//     };

//     this.afs.collection('categories').add(categoryData).then(docRef => {
//       console.log(docRef);
//     })
//     .catch(err => { console.log(err); });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    // Initialize any data if needed
  }

  onSubmit(formData: any) {
    let categoryData = {
      category: formData.value.category
    };

    this.afs.collection('categories').add(categoryData).then(docRef => {
      console.log(docRef);
    })
    .catch(err => { console.log(err); });
  }
}
