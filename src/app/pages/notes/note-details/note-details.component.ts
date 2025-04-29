import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../../services/notes/notes.service';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css',
})
export class NoteDetailsComponent implements OnInit {
  note: any = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.notesService.getNoteById(noteId).subscribe({
        next: (data) => {
          this.note = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading note:', err);
          this.error = true;
          this.loading = false;
        },
      });
    } else {
      this.error = true;
      this.loading = false;
    }
  }
}
