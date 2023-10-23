import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './stepper/stepper.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { VerificationCodeDialogComponent } from './verification-code-dialog/verification-code-dialog.component';



@NgModule({
    declarations: [
        AppComponent,
        ConfirmationDialogComponent,
        VerificationCodeDialogComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        StepperComponent,
        MatIconModule,
        HttpClientModule,
        FormsModule
    ]
})
export class AppModule { }
