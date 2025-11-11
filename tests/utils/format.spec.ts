import { describe, it, expect } from 'vitest';
import { formatDate, formatDateTime, formatTemp } from '@/utils/format';

describe('format helpers', () => {
  it('formatTemp', () => {
    expect(formatTemp(24)).toBe('24°C');
  });

  it('formatDate', () => {
    expect(formatDate('2025-11-10')).toMatch('11/9/2025');
  });

  it('formatDateTime', () => {
    const out = formatDateTime('2025-11-10T06:00');
    expect(out).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(out).toMatch(/\d{2}:\d{2}/);
  });
});
