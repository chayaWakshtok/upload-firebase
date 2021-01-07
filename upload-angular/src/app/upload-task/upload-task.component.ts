import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit, OnChanges {

  @Input() file!: File;
  @Input() isCloseAll: boolean = false;

  task!: AngularFireUploadTask;
  percentage!: Observable<number | undefined>;
  snapshot!: Observable<UploadTaskSnapshot>;
  isSuccess: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  ngOnChanges() {
    if (this.isCloseAll == true && this.task)
      this.task.cancel();
  }

  ngOnInit() {
    this.startUpload();
  }

  bytesToSize(bytes: number) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt((Math.floor(Math.log(bytes) / Math.log(1024))).toString());
    return Math.round(bytes / Math.pow(1024, i)).toPrecision(2) + ' ' + sizes[i];
  }

  startUpload() {
    const path = `filesStorage/${new Date().getTime()}_${this.file.name}`;
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.isSuccess = true;
      }),
    );
  }
}
