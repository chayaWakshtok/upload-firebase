import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  files: File[] = [];
  panelOpenState = false;
  isClose: boolean = true;
  expandLess: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  uploadImage(event: any) {
    this.isClose = false;
    for (let i = 0; i < event.files.length; i++) {
      this.files.push(event.files.item(i));
    }
  }

  close() {
    this.isClose = true;
    this.files = [];
  }

}
