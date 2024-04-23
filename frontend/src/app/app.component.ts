import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IpcService } from './ipc.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'TEST APP';

  filename: string = "";
  src: string = "";

  constructor(
    private ipcService: IpcService,
  ) { }

  ngOnInit(): void {
    this.ipcService.on("reply_get-users", (_event: any, users: any[]) => {
      this.users = users;
    })
  }

  onChangeFilename(): void {
    this.src = `file:///${this.filename}`;
  }

  users: any[] = [];
  getUsers(): void {
    this.ipcService.send('get-users');


  }
}
