import { interpolate } from './interpolate';

describe('interpolate', () => {
  it('returns an empty string for empty input', () => {
    expect(interpolate('', {})).toBe('');
    expect(interpolate(null, {})).toBe('');
    expect(interpolate(undefined, {})).toBe('');
  });

  it('returns the text unchanged when it has no placeholders', () => {
    expect(interpolate('Email is not valid', { field: 'email' })).toBe('Email is not valid');
  });

  it('replaces a placeholder with the matching value', () => {
    expect(interpolate('{{field}} required', { field: 'last name' })).toBe('last name required');
  });

  it('replaces every placeholder in the text', () => {
    expect(interpolate('{{field}} should have minimum {{length}} characters', {
      field: 'password',
      length: '8',
    })).toBe('password should have minimum 8 characters');
  });

  it('replaces a missing token with an empty string', () => {
    expect(interpolate('{{field}} required', {})).toBe(' required');
  });

  it('resolves dotted tokens as a path', () => {
    const data = { user: { name: 'Dan' } } as unknown as Record<string, string>;

    expect(interpolate('{{user.name}} required', data)).toBe('Dan required');
  });

  it('resolves a broken path to a dash', () => {
    expect(interpolate('{{user.name}} required', {})).toBe('- required');
  });

  it('does not mutate the data it is given', () => {
    const data = { field: 'name' };

    interpolate('{{field}} and {{missing}}', data);

    expect(Object.keys(data)).toEqual(['field']);
  });
});
