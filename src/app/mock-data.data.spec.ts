import { MOCK_USERS, MOCK_FEEDBACK } from './mock-data.data';

describe('Mock Data', () => {
  it('should load mock users', () => {
    expect(MOCK_USERS.length).toBeGreaterThan(0);
  });

  it('should load mock feedback', () => {
    expect(MOCK_FEEDBACK.length).toBeGreaterThan(0);
  });
});
