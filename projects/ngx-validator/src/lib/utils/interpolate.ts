const PLACEHOLDER_PATTERN = /\{\{(.+?)\}\}/ig;
const PLACEHOLDER_KEY_PATTERN = /\{{(.*)\}}/i;

/**
 * Replaces every `{{token}}` in `text` with the matching entry from `data`.
 * Dotted tokens (`{{a.b}}`) are resolved as a path; a missing token becomes an
 * empty string and a broken path becomes `-`.
 */
export function interpolate(text: string | null | undefined, data: Record<string, string>): string {
  if (!text) {
    return '';
  }

  const placeholders = text.match(PLACEHOLDER_PATTERN);

  if (!placeholders) {
    return text;
  }

  return placeholders.reduce(
    (result, placeholder) => result.replace(placeholder, readValue(data, readKey(placeholder))),
    text,
  );
}

function readKey(placeholder: string): string {
  const match = placeholder.match(PLACEHOLDER_KEY_PATTERN);

  return match ? match[1] : '';
}

function readValue(data: Record<string, string>, key: string): string {
  if (key.includes('.')) {
    const resolved = key.split('.')
      .reduce<unknown>((value, part) => (value ? (value as Record<string, unknown>)[part] : '-'), data);

    return resolved == null ? '' : `${resolved}`;
  }

  const value = data[key];

  return value == null ? '' : `${value}`;
}
