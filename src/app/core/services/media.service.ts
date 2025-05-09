// src/app/core/services/media.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  // Método para capturar imagen
  async captureImage(): Promise<string> {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera 
    });
    return image.webPath!;
  }
}
