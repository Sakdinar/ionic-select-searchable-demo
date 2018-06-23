import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { PortService } from '../../services';
import { Port } from '../../types';

@Component({
    selector: 'page-modal',
    templateUrl: 'modal.html'
})
export class ModalPage {
    port: Port;
    ports: Port[];

    constructor(
        private viewController: ViewController,
        private portService: PortService
    ) {
        this.ports = this.portService.getPorts();
    }

    dismiss() {
        this.viewController.dismiss();
    }
}
