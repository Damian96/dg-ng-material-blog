import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent {
  @Input() label: string = 'Upload File';
  @Input() accept: string = 'image/jpeg,image/png,image/webp';
  @Input() maxSize: number = 5242880; // Default max file size: 5 MB (in bytes)

  @Output() fileSelected: EventEmitter<File | false> = new EventEmitter<File | false>();

  // @Output() onGroupCreated$: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  fileFormGroup: FormGroup;

  constructor() {
    this.fileFormGroup = new FormGroup({
      postImage: new FormControl({ selectedFile: null }, [Validators.required, this.fileTypeValidator.bind(this), this.fileSizeValidator.bind(this)])
    });

    // this.onGroupCreated$.emit(this.fileFormGroup);
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      this.fileFormGroup.get('postImage').setValue(files[0]);
      if (this.fileFormGroup.get('postImage').valid) {
        console.log('emitting');
        this.fileSelected.emit(files[0]);
      } else {
        this.fileSelected.emit(false);
      }
    }
  }

  private fileTypeValidator(control: FormControl): { [key: string]: any } | null {
    const allowedTypes = this.accept.split(',');
    const file = control.value;

    if (file) {
      const fileType = file.type;
      if (!allowedTypes.includes(fileType)) {
        return { invalidFileType: true };
      }
    }

    return null;
  }

  private fileSizeValidator(control: FormControl): { [key: string]: any } | null {
    const file = control.value;

    if (file) {
      const fileSize = file.size;
      if (fileSize > this.maxSize) {
        return { invalidFileSize: true };
      }
    }

    return null;
  }
}
