import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Category, CategoryWithId } from '../models/category';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  loadData(): Observable<CategoryWithId[]> {
    return this.afs.collection('subscribers').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }

  deleteData(id: any) {
    this.afs.doc(`subscribers/${id}`).delete().then(docRef => {
        this.toastr.success('Subscriber deleted successfully');
    }).catch(error => {
        this.toastr.error('Error deleting subscriber: ' + error.message);
    });
}
}
