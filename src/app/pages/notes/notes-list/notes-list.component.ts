import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../../services/notes/notes.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent implements OnInit {
  notes: any[] = [];
  loading = true;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.notesService.getNotes().subscribe({
      next: (response) => {
        this.notes = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
        this.loading = false;
      },
    });
  }

  viewNote(noteId: string) {
    this.router.navigate(['/notes', noteId]);
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  goToCreateNote() {
    this.router.navigate(['/notes/new']);
  }
}
