import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { InstructorFormComponent } from './instructors/instructor-form.component';
import { InstructorService } from './instructors/instructor.service';

@NgModule({
  declarations: [
    AppComponent,
    InstructorsComponent,
    InstructorFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: InstructorsComponent},
    ])
  ],
  providers: [InstructorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
