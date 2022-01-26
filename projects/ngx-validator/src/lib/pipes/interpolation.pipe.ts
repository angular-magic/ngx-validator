import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interpolation',
})
export class InterpolationPipe implements PipeTransform {
  transform(text: string | null | undefined = '', messages: Record<string, string>): string {
    if (!text) {
      return '';
    }

    const bracketValues = this.giveWords(text);

    if (!bracketValues) {
      return text;
    }

    bracketValues.forEach(item => {
      const clearWord = this.giveWord(item);

      if (!messages[clearWord]) {
        messages[clearWord] = '';
      }

      text = text?.replace(item, this.getPropertyValue(messages, clearWord));
    });

    return `${text}`;
  }

  private giveWords(text: string): string[] {
    const regExp = /\{\{(.+?)\}\}/ig;
    const words = text.match(regExp);

    return words ?? [];
  }

  private giveWord(text: string): string {
    const regExp = /\{{(.*)\}}/i;
    const words = text.match(regExp);

    return words ? words[1] : '';
  }

  private getPropertyValue(item: any, property: string): string {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object ? object[key] : '-', item);
    }

    return item[property];
  }
}
