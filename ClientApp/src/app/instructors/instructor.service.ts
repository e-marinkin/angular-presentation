import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Instructor } from './instructor';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class InstructorService {

    private url: string;

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        this.url = baseUrl + 'api/instructors';
    }

    getInstructors(): Observable<Instructor[]> {
        return this.httpClient.get<Instructor[]>(this.url)
        .pipe(catchError(this.handleError<Instructor[]>('getInstructors', [])));
    }

    addInstructor(instructor: Instructor): Observable<Instructor> {
        return this.httpClient.post<Instructor>(this.url, instructor, httpOptions)
            .pipe(catchError(this.handleError<Instructor>('addInstructor')));
    }

    updateInstructor(instructor: Instructor): Observable<{}> {
        return this.httpClient.put<Instructor>(this.url, instructor, httpOptions)
        .pipe(catchError(this.handleError<Instructor>('updateInstructor')));
    }

    deleteInstructor(id: number): Observable<{}> {
        return this.httpClient.delete(this.url + '/' + id)
        .pipe(catchError(this.handleError<Instructor>('deleteInstructor')));
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          return of(result as T);
        };
      }
}
