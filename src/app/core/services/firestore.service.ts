import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, CollectionReference, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface MediaRecord {
  id?: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private collectionPath = 'media';
  private mediaCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.mediaCollection = collection(this.firestore, this.collectionPath) as CollectionReference;
  }

  addMediaRecord(description: string, imageUrl: string): Promise<void> {
    const newRecord: Omit<MediaRecord, 'id'> = {
      description,
      imageUrl,
      createdAt: new Date(),
    };
    return addDoc(this.mediaCollection, newRecord).then(() => {});
  }

  getMediaRecords(): Observable<MediaRecord[]> {
    return collectionData(this.mediaCollection, { idField: 'id' }) as Observable<MediaRecord[]>;
  }
}
