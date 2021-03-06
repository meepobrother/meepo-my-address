import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MeepoHistory } from 'meepo-base';
import { StoreService } from 'meepo-store';
import { EventService } from 'meepo-event';
import { FOOTER_HIDDEN, FOOTER_SHOWN } from 'meepo-footer';

import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'address-index',
    templateUrl: './address-index.html',
    styleUrls: ['./address-index.scss']
})
export class AddressIndexComponent extends MeepoHistory {
    key: string = 'address.index';
    page: number = 1;
    psize: number = 10;
    max: number = 200;
    data: any[] = [];

    pageTitle: string = '地址库';
    constructor(
        public store: StoreService,
        public cd: ChangeDetectorRef,
        public router: Router,
        public title: Title,
        public event: EventService
    ) {
        super(store, cd, title);
    }

    meepoInit() {
        this.event.publish(FOOTER_HIDDEN, '')
    }

    add() {
        this.router.navigate(['/address/add'], { queryParams: { key: this.key } });
    }

    edit(item: any) {
        this.router.navigate(['/address/add'], { queryParams: { key: this.key, uid: item.uid } });
    }

    delete(item: any) {
        this.removeItem(item);
    }

    down(e: any) {
        this.page = 1;
        this.data = this.store.getList(this.key, this.page, this.psize);
        e.next(false);
    }

    up(e: any) {
        this.page++;
        let items = this.store.getList(this.key, this.page, this.psize);
        if (items.length > 0) {
            this.data = [...this.data, ...items];
            e.next(true);
        } else {
            e.next(true);
        }
    }
}