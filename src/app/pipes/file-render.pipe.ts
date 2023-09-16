import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileRender',
})
export class FileRenderPipe implements PipeTransform {
  transform(file: File): Promise<string | null> {
    console.log(file);
    return new Promise<string | null>((resolve) => {
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          console.log(event.target.result);
          resolve(event.target.result);
        } else {
          resolve(null);
        }
      };

      reader.onerror = () => {
        resolve(null);
      };

      console.log(file);
      reader.readAsDataURL(file);
    });
  }
}
