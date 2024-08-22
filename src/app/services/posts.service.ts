import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post'; // Import your Post model
import { map, Observable } from 'rxjs';
import { Category, CategoryWithId } from '../models/category';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    // private storage: Storage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  // Upload image and return its URL
//   uploadImage(selectedImage: File | null, postData: Post) {
  
//     const filePath = `postIMG/${Date.now()}`;
//     console.log(filePath);

// this.storage.upload(filePath, selectedImage).then(()=>{
//   console.log('post image uploaded successfully');

//   this.storage.ref(filePath).getDownloadURL().subscribe((URL: string)=>{
//     postData.postImgPath = URL;
//     console.log(postData);

//     this.afs.collection('posts').add(postData).then(docRef => {
//       this.toastr.success('Data Insert Successfully')
//     })
//   })
  
// })
  
//   } 

 uploadImage(selectedImage: File | null, postData: Post){
  const filePath = `postIMG/${Date.now()}`;
  console.log(filePath);

  this.storage.upload(filePath, selectedImage).then(()=>{
    console.log('Post Image uploaded successfully');

    this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
      postData.postImgPath = URL;
     this.savePostData(postData);
    })
  })

 }

  // Save post data to Firestore
  savePostData(postData: Post) {
    this.afs.collection('posts').add(postData).then(docRef =>{
      this.toastr.success('Data inserted successfully');
      this.router.navigate(['/all-posts']);
    });
    

  }


  // loadData() {
  //   return this.afs.collection('posts').snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data() as Category;
  //         const id = a.payload.doc.id;
  //         return { id, data };
  //       });
  //     })
  //   );
  // }

  loadData(): Observable<Array<{ id: string, data: Post }>> {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }
  
}
