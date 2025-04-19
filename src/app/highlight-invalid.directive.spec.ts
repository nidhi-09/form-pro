import { ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { HighlightInvalidDirective } from './highlight-invalid.directive';

describe('HighlightInvalidDirective', () => {
  it('should create an instance', () => {
    const mockElement = new ElementRef(document.createElement('input'));
    const mockRenderer = {
      setStyle: () => {},
      removeStyle: () => {}
    } as unknown as Renderer2;

    const mockControl = {} as NgControl;

    const directive = new HighlightInvalidDirective(mockElement, mockRenderer, mockControl);
    expect(directive).toBeTruthy();
  });
});
