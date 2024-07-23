
// categories.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

interface CategoryWithId {
  id: string;
  data: Category;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data: Category) {
    this.afs.collection('Blog-categories').add(data).then(docRef => {
      console.log(docRef);
      this.toastr.success('Category added successfully!');
    })
    .catch(err => { console.log(err); });
  }

  loadData(): Observable<CategoryWithId[]> {
    return this.afs.collection('Blog-categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }
}
