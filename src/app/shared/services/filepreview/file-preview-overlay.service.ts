import { FILE_PREVIEW_DIALOG_DATA } from './../token/file-preview-overlay.token';
import { FilePreviewOverlayRef } from './../../../components/filepreview/file-preview-overlay-ref';
import { FilePreviewOverlayComponent } from './../../../components/filepreview/file-preview-overlay/file-preview-overlay.component';
import { Injectable, ComponentRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

export interface Image {
  name: string;
  url: string;
}

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  image?: Image;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
};

@Injectable()
export class FilePreviewOverlayService {

  constructor(private overlay: Overlay, private injector: Injector) { }

  open(config: FilePreviewDialogConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(dialogConfig);
    const dialogRef = new FilePreviewOverlayRef(overlayRef);

    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);
    dialogRef.componentInstance = overlayComponent;
    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: FilePreviewDialogConfig, dialogRef: FilePreviewOverlayRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(FilePreviewOverlayComponent, null, injector);
    const containerRef: ComponentRef<FilePreviewOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(config: FilePreviewDialogConfig, dialogRef: FilePreviewOverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(FilePreviewOverlayRef, dialogRef);
    injectionTokens.set(FILE_PREVIEW_DIALOG_DATA, config.image);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
