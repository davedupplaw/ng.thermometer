import {Component, Input, OnInit} from '@angular/core';
import {easeInOutCubic} from 'easing-utils';

@Component({
  selector: 'dd-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.scss']
})
export class ThermometerComponent implements OnInit {

  @Input() set liquidColour(newColour: string) {
    this.colour = newColour;
    this.darkColour = ThermometerComponent.blendColors(newColour, '#000000', 0.1);
    this.veryDarkColour = ThermometerComponent.blendColors(newColour, '#000000', 0.2);
  }

  get liquidColour() {
    return this.colour;
  }

  @Input() set value(newValue: number) {
    this.easeValue(newValue);
  }

  @Input() height = 700;
  @Input() minValue = 0;
  @Input() maxValue = 8;
  @Input() startValue = 0;
  @Input() topText = 8;
  @Input() bottomText = 0;
  @Input() textColour = '#000000';
  @Input() tickColour = '#000000';
  @Input() animationSpeed = 1000;
  @Input() pathToSVG = 'svg/thermo-bottom.svg';
  @Input() valueChanged = undefined;
  @Input() onLoad = undefined;

  liquidValue = 0;
  finalValue = 0;

  liquidY: number;
  neckPosition: number;
  boxPosition: number;

  colour: string;
  darkColour: string;
  veryDarkColour: string;

  // This is all a bit magic, but these numbers come
  // from the SVG itself and so this will only work with
  // a specific SVG file.
  liquidBottomY = 346;
  liquidTopY = 25;
  neckBottomY = 573;
  neckTopY = 250;
  neckMinSize = 30;
  svgHeight = 1052;
  leftOffset = 300;
  topOffset = 150;

  private startEaseTime: number = undefined;
  private easeStartValue: number;

  // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  private static blendColors(c0, c1, p) {
    const f = parseInt(c0.slice(1), 16);
    const t = parseInt(c1.slice(1), 16);
    // tslint:disable-next-line:no-bitwise
    const R1 = f >> 16;
    // tslint:disable-next-line:no-bitwise
    const G1 = f >> 8 & 0x00FF;
    // tslint:disable-next-line:no-bitwise
    const B1 = f & 0x0000FF;
    // tslint:disable-next-line:no-bitwise
    const R2 = t >> 16;
    // tslint:disable-next-line:no-bitwise
    const G2 = t >> 8 & 0x00FF;
    // tslint:disable-next-line:no-bitwise
    const B2 = t & 0x0000FF;
    return '#' + (0x1000000 +
      (Math.round((R2 - R1) * p) + R1) * 0x10000 +
      (Math.round((G2 - G1) * p) + G1) * 0x100 +
      (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1);
  }

  private updateValue(newValue: number) {
    this.liquidValue = newValue;
    this.liquidY = this.liquidBottomY - (this.liquidValue - this.minValue) *
      (this.liquidBottomY - this.liquidTopY) / (this.maxValue - this.minValue);
    this.neckPosition = (this.liquidValue - this.minValue) *
      (this.neckBottomY - this.neckTopY) / (this.maxValue - this.minValue) + this.neckMinSize;
    this.boxPosition = this.neckBottomY - this.neckPosition;
  }

  private easeValue(newValue: number) {
    if (!this.liquidValue) {
      this.liquidValue = 0;
    }

    this.finalValue = newValue;
    const diff = this.finalValue - this.liquidValue;

    const ticker = (timestamp) => {
      if (!this.startEaseTime) {
        this.startEaseTime = timestamp;
        this.easeStartValue = this.liquidValue;
      }

      const elapsed = timestamp - this.startEaseTime;
      const pcThroughAnimation = elapsed / this.animationSpeed;
      const easeInCubic1 = easeInOutCubic(pcThroughAnimation);

      this.updateValue(easeInCubic1 * diff + this.easeStartValue);

      if (elapsed <= this.animationSpeed) {
        window.requestAnimationFrame(ticker);
      } else {
        this.startEaseTime = undefined;
        this.easeStartValue = 0;
      }
    };

    window.requestAnimationFrame(ticker);
  }

  ngOnInit(): void {
    this.value = 0;
  }
}
