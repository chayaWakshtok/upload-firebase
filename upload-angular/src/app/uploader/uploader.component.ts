import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  files: File[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  uploadImage(event: any) {
    for (let i = 0; i < event.files.length; i++) {
      this.files.push(event.files.item(i));
    }
  }

}
