import { Component, OnInit } from '@angular/core'

import { Router } from '@angular/router'
import { Board, FirestoreService } from '../firestore.service'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'

@Component({
  selector: 'app-boards-create',
  templateUrl: './boards-create.component.html',
  styleUrls: ['./boards-create.component.css'],
})
export class BoardsCreateComponent implements OnInit {
  boardsForm: FormGroup
  Name = ''
  Email = ''
  Phone = ''

  constructor(
    private router: Router,
    private fs: FirestoreService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      Name: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      Phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

  onFormSubmit() {
    const board = this.boardsForm.value
    console.log(board)
    this.fs.postBoard(board).subscribe(
      id => {
        this.router.navigate(['/boards-details', id])
      },
      err => {
        console.log(err)
      },
    )
  }
}
