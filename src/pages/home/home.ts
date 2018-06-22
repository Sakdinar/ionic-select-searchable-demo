import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { Subscription } from 'rxjs';
import { ModalPage } from '../../pages';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    ports: Port[];
    port: Port;
    portsSubscription: Subscription;

    constructor(
        private portService: PortService,
        private modalController: ModalController
    ) { }

    filterPorts(ports: Port[], text: string) {
        return ports.filter(port => {
            return port.name.toLowerCase().indexOf(text) !== -1 ||
                port.country.name.toLowerCase().indexOf(text) !== -1;
        });
    }

    searchPorts(event: {
        component: SelectSearchableComponent,
        text: string
    }) {
        let text = event.text.trim().toLowerCase();
        event.component.startSearch();

        // Close any running subscription.
        if (this.portsSubscription) {
            this.portsSubscription.unsubscribe();
        }

        if (!text) {
            // Close any running subscription.
            if (this.portsSubscription) {
                this.portsSubscription.unsubscribe();
            }

            event.component.items = [];
            event.component.endSearch();
            return;
        }

        this.portsSubscription = this.portService.getPortsAsync().subscribe(ports => {
            // Subscription will be closed when unsubscribed manually.
            if (this.portsSubscription.closed) {
                return;
            }

            event.component.items = this.filterPorts(ports, text);
            event.component.endSearch();
        });
    }

    portChange(event: {
        component: SelectSearchableComponent,
        value: any
    }) {
        console.log('port:', event.value);
    }

    openModal() {
        let modal = this.modalController.create(ModalPage);
        modal.present();
    }
}
