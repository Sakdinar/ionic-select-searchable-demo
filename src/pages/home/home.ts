import { Component } from '@angular/core';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    ports: Port[];
    port: Port;

    constructor(
        private portService: PortService
    ) {
        this.ports = this.portService.getPorts();
    }

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
        let text = (event.text || '').trim().toLowerCase();

        if (!text) {
            event.component.items = [];
            return;
        } else if (event.text.length < 1) {
            return;
        }

        event.component.isSearching = true;

        this.portService.getPortsAsync().subscribe(ports => {
            event.component.items = this.filterPorts(ports, text);
            event.component.isSearching = false;
        });
    }

    portChange(event: {
        component: SelectSearchableComponent,
        value: any
    }) {
        console.log('port:', event.value);
    }
}
