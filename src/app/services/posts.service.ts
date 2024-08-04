import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post'; // Import your Post model

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private storage: Storage,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) {}

  // Upload image and return its URL
  uploadImage(selectedImage: File | null): Promise<string> {
    if (!selectedImage) {
      this.toastr.error('No image selected');
      return Promise.reject('No image selected');
    }

    const filePath = `postIMG/${Date.now()}_${selectedImage.name}`;
    const fileRef = ref(this.storage, filePath);

    return uploadBytes(fileRef, selectedImage)
      .then(() => getDownloadURL(fileRef))
      .catch((error) => {
        console.error('Error uploading image:', error);
        this.toastr.error('Error uploading image');
        throw error;
      });
  }

  // Save post data to Firestore
  savePostData(postData: Post): Promise<void> {
    return this.afs.collection('posts').add(postData)
      .then(() => {
        this.toastr.success('Data inserted successfully');
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        this.toastr.error('Error inserting data');
        throw error;
      });
  }
}
