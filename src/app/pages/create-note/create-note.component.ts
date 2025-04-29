import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes/notes.service';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css',
})
export class CreateNoteComponent {
  noteForm!: FormGroup;
  formDirty = false;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      topics: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  get topics() {
    return this.noteForm.get('topics') as FormArray;
  }

  addTopic() {
    this.topics.push(this.fb.control('', Validators.required));
  }

  removeTopic(index: number) {
    if (this.topics.length > 1) {
      this.topics.removeAt(index);
    }
  }

  onSubmit() {
    if (this.noteForm.invalid) return;

    this.notesService.createNote(this.noteForm.value).subscribe({
      next: () => {
        this.toastService.showSuccess('Note created successfully!');
        this.formDirty = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error creating note:', err);
        this.toastService.showError('Failed to create note!');
      },
    });
  }

  canDeactivate(): boolean {
    return (
      !this.formDirty ||
      confirm('You have unsaved changes. Are you sure you want to leave?')
    );
  }

  markDirty() {
    this.formDirty = true;
  }
}
