import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HotelService } from '../hotel.service';
import { HttpService } from '../../httprequest.service';
import { GetHotelsService } from '../get-hotels.service';

@Component({
    selector: 'app-single-hotel',
    templateUrl: './single-hotel.component.html',
    styleUrls: ['../../assets/app.component.scss'],
    providers: [HttpService],
})
export class SingleHotelComponent implements OnInit {
    timeoutId;
    timeRestarter;
    messageActive = true;
    messageInactive = false;
    saving = false;
    emptyAutosave = true;
    emptyMessage = true;
    timeAgo = 1;
    counter = setInterval(this.setTimeAgo.bind(this), 1000);

    constructor(
        private updateservice: HttpService,
        public hotelservice: HotelService,
        public gethotelservice: GetHotelsService,
        public router: Router,
    ) { }


    updateHotel(id) {
        this.emptyAutosave = false;
        this.emptyMessage = false
        this.saving = true;
        this.messageActive = true;
        const endpoint = 'api/hotels/' + id;
        this.updateservice.httpRequest(this.hotelservice.hotel.hotelWithId.data, endpoint, 'patch')
            .subscribe(
                response => {
                    this.gethotelservice.getHotels()
                    this.fadeOutMessageTimer()
                    this.timeAgo = 0;
                    this.saving = false;
                    this.emptyAutosave = true;
                    this.messageInactive = false;
                },
                error => {
                    console.error(error)
                }
            );
        }

    setTimeAgo () {
        this.timeAgo++;
    };

    autoSave(id) {
        this.timeRestarter = clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => this.updateHotel(id), 1000);
    }

    fadeOutMessageTimer() {
        setTimeout(() => this.fadeOutMessage(), 4000)
    }

    fadeOutMessage() {
        this.messageActive = false;
        this.messageInactive = true;
    }

    redirect() {
        this.router.navigate(['hotels'])
    }

    ngOnInit(
    ) { }
}
