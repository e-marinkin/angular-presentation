import { Component, OnInit } from '@angular/core';
import { Instructor } from '../instructors/instructor';
import { InstructorService } from './instructor.service';

@Component({
    selector: 'app-instructors',
    templateUrl: './instructors.component.html'
})

export class InstructorsComponent implements OnInit {

    instructors: Instructor[];
    selectedInstructor: Instructor;

    constructor(private instructorService: InstructorService) { }

    ngOnInit(): void {
        this.selectedInstructor = new Instructor();
        this.loadInstructors();
    }

    select(instructor: Instructor) {
        let copyInstructor = new Instructor();
        Object.assign(copyInstructor, instructor);
        this.selectedInstructor = copyInstructor;
    }

    loadInstructors(): void {
        this.instructorService.getInstructors()
            .subscribe(is => this.instructors = is);
    }

    updateInstructors(event: Event) {
        if (event) {
            this.loadInstructors();
        }
    }

    delete(instructor: Instructor) {
        this.instructorService.deleteInstructor(instructor.id)
            .subscribe(() => {
                this.loadInstructors();
            });
    }
}
