import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Instructor } from './instructor';
import { InstructorService } from './instructor.service';


@Component ({
    selector: 'app-instructor-form',
    templateUrl: './instructor-form.component.html'
})

export class InstructorFormComponent implements OnInit, OnChanges {

    @Input() instructor: Instructor;
    @Output() updated = new EventEmitter<boolean>();

    private copyInstructor: Instructor;

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.copyInstructor = new Instructor();
        if (changes.instructor) {
            Object.assign(this.copyInstructor, changes.instructor.currentValue);
        }
    }

    constructor (private instructorService: InstructorService) { }

    addOrSave(): void {
        if (this.instructor.id === 0
                || this.copyInstructor.firstName !== this.instructor.firstName) {
            this.instructor.id = 0;
            this.instructorService.addInstructor(this.instructor)
                .subscribe(i => {
                    this.initForm();
                    this.updated.emit(true);
                });
        } else {
            this.instructorService.updateInstructor(this.instructor)
                .subscribe(() => {
                    this.initForm();
                    this.updated.emit(true);
                });
        }
    }

    initForm(): void {
        this.instructor = new Instructor();
        this.instructor.id = 0;
        this.instructor.firstName = '';
        this.instructor.lastName = '';
    }
}
