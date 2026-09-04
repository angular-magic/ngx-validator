import { NgxValidatorMessages } from '../ngx-validator.service';
import { resolveErrorMessage } from './resolve-error-message';

const MESSAGES: NgxValidatorMessages = {
  required: '{{field}} required',
  email: 'Email is not valid',
};

describe('resolveErrorMessage', () => {
  it('returns undefined when there are no errors', () => {
    expect(resolveErrorMessage(null, undefined, MESSAGES)).toBeUndefined();
    expect(resolveErrorMessage(undefined, undefined, MESSAGES)).toBeUndefined();
  });

  it('returns the configured message for the first error', () => {
    expect(resolveErrorMessage({ required: true }, undefined, MESSAGES)).toBe('{{field}} required');
  });

  it('returns undefined for an error with no configured message', () => {
    expect(resolveErrorMessage({ unknownError: true }, undefined, MESSAGES)).toBeUndefined();
  });

  it('prefers a matching single custom validation', () => {
    const custom = { name: 'required', text: 'Please fill this in' };

    expect(resolveErrorMessage({ required: true }, custom, MESSAGES)).toBe('Please fill this in');
  });

  it('ignores a custom validation that does not match the error', () => {
    const custom = { name: 'somethingElse', text: 'Please fill this in' };

    expect(resolveErrorMessage({ required: true }, custom, MESSAGES)).toBe('{{field}} required');
  });

  it('picks the matching entry out of a custom validation array', () => {
    const custom = [
      { name: 'email', text: 'Use a work address' },
      { name: 'required', text: 'Please fill this in' },
    ];

    expect(resolveErrorMessage({ required: true }, custom, MESSAGES)).toBe('Please fill this in');
  });

  it('falls back to the defaults when no array entry matches', () => {
    const custom = [{ name: 'email', text: 'Use a work address' }];

    expect(resolveErrorMessage({ required: true }, custom, MESSAGES)).toBe('{{field}} required');
  });
});
