import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post'; // Import your Post model
import { catchError, map, Observable, of } from 'rxjs';
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

uploadImage(selectedImage: File | null, postData: Post) {
  if (!selectedImage) {
    this.toastr.error('No image selected.');
    return;
  }

  const filePath = `postIMG/${Date.now()}_${selectedImage.name}`;
  const fileRef = this.storage.ref(filePath);
  
  this.storage.upload(filePath, selectedImage).then(() => {
    fileRef.getDownloadURL().subscribe({
      next: (URL) => {
        postData.postImgPath = URL;
        this.savePostData(postData);
      },
      error: (err) => {
        this.toastr.error('Error fetching image URL.');
        console.error(err);
      },
    });
  }).catch((err) => {
    this.toastr.error('Image upload failed.');
    console.error(err);
  });
}


  // Save post data to Firestore
  savePostData(postData: Post) {
    this.afs.collection('posts').add(postData).then(docRef =>{
      this.toastr.success('Data inserted successfully');
      this.router.navigate(['/all-posts']);
    });
    

  }

  loadData(): Observable<Array<{ id: string, data: Post }>> {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        });
      }),
      catchError(error => {
        console.error('Error loading posts:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }
  
  loadPostData(id: string): Observable<Post | undefined> {
    return this.afs.doc<Post>(`posts/${id}`).valueChanges().pipe(
      catchError(error => {
        console.error('Error loading post data:', error);
        return of(undefined); // Return undefined in case of error
      })
    );
  }
  


  
}

