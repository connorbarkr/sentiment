import { Component, OnInit, Input } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {

  @Input() user: string;

  notesRef: AngularFireList<any>;
  notes: Observable<any[]>;
  reading = false;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    if (this.user == 'connor') {
      this.notesRef = this.db.list('/notes-connor')
    } else if (this.user == 'rea') {
      this.notesRef = this.db.list('/notes-rea')
    } else {
      this.notesRef = this.db.list('/notes-connor')
    }
    this.notes = this.notesRef.snapshotChanges(['child_added', 'child_removed']).map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }))
    })
  }

  updateDescription(note, description) {
    this.notesRef.update(note.key, {description: description})
  }

  toggleView() {
    switch (this.user) {
      case 'rea':
        this.user = 'connor'
        break
      case 'connor':
        this.user = 'rea'
        break
    }
    this.ngOnInit()
    this.reading = !this.reading
  }

}
