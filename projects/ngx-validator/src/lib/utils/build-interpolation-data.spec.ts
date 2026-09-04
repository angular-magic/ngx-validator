import { FormControl, FormGroup, Validators } from '@angular/forms';

import { buildInterpolationData, getControlName } from './build-interpolation-data';

describe('buildInterpolationData', () => {
  it('returns an empty map when there are no errors', () => {
    expect(buildInterpolationData(null, undefined, undefined)).toEqual({});
    expect(buildInterpolationData(undefined, undefined, undefined)).toEqual({});
  });

  it('prefers customName over the derived control name', () => {
    expect(buildInterpolationData({ required: true }, 'Hobby', undefined)['field']).toBe('Hobby');
  });

  it('derives and prettifies the field name from the parent FormGroup', () => {
    const group = new FormGroup({ lastName: new FormControl(null, Validators.required) });

    expect(buildInterpolationData({ required: true }, undefined, group.controls.lastName)['field'])
      .toBe('last name');
  });

  it('falls back to an empty field name for a parentless control', () => {
    expect(buildInterpolationData({ required: true }, undefined, new FormControl(null))['field']).toBe('');
  });

  it('exposes min and max bounds', () => {
    expect(buildInterpolationData({ min: { min: 18, actual: 5 } }, 'Age', undefined))
      .toEqual({ field: 'Age', min: 18 });
    expect(buildInterpolationData({ max: { max: 50, actual: 60 } }, 'Age', undefined))
      .toEqual({ field: 'Age', max: 50 });
  });

  it('exposes the required length for length errors', () => {
    expect(buildInterpolationData({ minlength: { requiredLength: 8, actualLength: 3 } }, 'Password', undefined))
      .toEqual({ field: 'Password', length: 8 });
    expect(buildInterpolationData({ maxlength: { requiredLength: 256, actualLength: 300 } }, 'Hobby', undefined))
      .toEqual({ field: 'Hobby', length: 256 });
  });

  it('exposes a value token for any other error', () => {
    expect(buildInterpolationData({ pattern: { value: 'abc' } }, 'Code', undefined))
      .toEqual({ field: 'Code', value: 'abc' });
  });
});

describe('getControlName', () => {
  it('finds the key a control is registered under', () => {
    const group = new FormGroup({ email: new FormControl(null) });

    expect(getControlName(group.controls.email)).toBe('email');
  });

  it('returns an empty string when the control has no FormGroup parent', () => {
    expect(getControlName(new FormControl(null))).toBe('');
    expect(getControlName(undefined)).toBe('');
  });
});
