import { InjectionToken } from '@angular/core';
import { Image } from '../service/file-preview-overlay.service';

export const FILE_PREVIEW_DIALOG_DATA = new InjectionToken<Image>('FILE_PREVIEW_DIALOG_DATA');
