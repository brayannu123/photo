import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaService } from 'src/app/core/services/media.service';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  form: FormGroup;
  // imageFile: File | null = null;
  // imagePreview: string | null = null;
  // fileName: string | null = null;
  // mimeType: string | null = null;
  fileName: string | null = null;
  mimeType: string | null = null;
  filePreviewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    private supabaseService: SupabaseService,
    private firestore: Firestore
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required]
    });
  }

  // async pickImage() {
  //   const result = await this.mediaService.pickFiles();
  //   if (result && result.files.length > 0) {
  //     const file = result.files[0];
  //     this.fileName = file.name;
  //     this.mimeType = file.mimeType;
  //   }
  // }

  async pickImage() {
    const result = await this.mediaService.pickFiles();
    if (result && result.files.length > 0) {
      console.log("Result " + JSON.stringify(result))

      const file = result.files[0];
      file
      const response = await fetch(file.path!); // asegúrate que `path` no es null
      const blob = await response.blob();
      const imageFile = new File([blob], file.name, { type: file.mimeType });

      this.fileName = file.name;
      this.mimeType = file.mimeType;
      try {
        this.filePreviewUrl = URL.createObjectURL(imageFile);
        console.log("filePreviewUrl " + this.filePreviewUrl)
        console.log("Result path" + file.path)
      } catch (error) {
        alert("Error " + error)
      }

    }
  }

  async onSubmit() {
    // if (!this.imageFile || this.form.invalid) return;

    // const path = `multimedia/${Date.now()}_${this.imageFile.name}`;
    // const publicUrl = await this.supabaseService.uploadImage(this.imageFile, path);

    // const data = {
    //   description: this.form.value.description,
    //   imageUrl: publicUrl,
    //   createdAt: Timestamp.now()
    // };

    // await addDoc(collection(this.firestore, 'multimedia'), data);
    // this.form.reset();
    // this.imageFile = null;
    // this.imagePreview = null;
    // alert('Multimedia registrada correctamente');
  }

}
