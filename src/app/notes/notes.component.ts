import { Component, Input, OnInit, AfterViewInit, trigger, state, animate, transition, style } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            opacity: 1
        })),
        state('hidden', style({
            opacity: 0
        })),
        transition('* => *', animate('0.2s'))
    ])
  ],
})
export class NotesComponent {

  @Input() user: string;

  readIsVisible: string = 'hidden';
  writeIsVisible: string = 'hidden';
  notesRef: AngularFireList<any>;
  notes: Observable<any[]>;
  reading: boolean = true;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    if (this.user == 'connor')
      this.notesRef = this.db.list('/notes-connor')
    else if (this.user == 'rea')
      this.notesRef = this.db.list('/notes-rea')

    this.notes = this.notesRef.snapshotChanges(['child_added', 'child_removed']).map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }))
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.toggleVisibility('read');
    }, 300);
  }

  updateDescription(note, description) {
    this.notesRef.update(note.key, {description: description})
  }

  toggleView() {
    switch (this.user) {
      case 'rea':
        this.user = 'connor';
        break;
      case 'connor':
        this.user = 'rea';
        break;
    }
    this.ngOnInit();
    if (this.reading) {
      this.toggleVisibility('read');
      setTimeout(() => {
        this.toggleVisibility('write');
      }, 200);
    } else {
      this.toggleVisibility('write');
      setTimeout(() => {
        this.toggleVisibility('read');
      }, 200);
    }
    this.reading = !this.reading
  }

  toggleVisibility(item: string) {
    switch (item) {
      case 'read':
        this.readIsVisible = this.readIsVisible == 'shown' ? 'hidden' : 'shown';
        break;
      case 'write':
        this.writeIsVisible = this.writeIsVisible == 'shown' ? 'hidden' : 'shown';
        break;
    }
  }

}
