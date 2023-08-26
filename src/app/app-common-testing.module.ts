import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';

/** 此為寫測試用的module */
@NgModule({
    exports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: MockLocationStrategy }
    ]
})
export class AppCommonTestingModule { }
