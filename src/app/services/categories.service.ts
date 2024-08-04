import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category, CategoryWithId } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService, http:HttpClient) { }

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

  updateData(id: any, EditData: any) {
    this.afs.doc(`Blog-categories/${id}`).update(EditData).then(docref => {
      this.toastr.success('Category updated successfully!');
    }).catch(err => {
      console.log(err);
    });
  }

  deleteData(id: any) {
    this.afs.doc(`Blog-categories/${id}`).delete().then(docRef => {
        this.toastr.success('Category deleted successfully');
    }).catch(error => {
        this.toastr.error('Error deleting category: ' + error.message);
    });
}

}
