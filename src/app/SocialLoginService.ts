import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SocialloginService {
    url;
    constructor(private http: HttpClient) { }

    Savesresponse(response) {
        console.log('saved:' + response);
    }

}