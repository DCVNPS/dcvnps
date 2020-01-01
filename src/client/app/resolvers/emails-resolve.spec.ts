import { EmailsResolve } from './emails-resolve';
import { ApiService } from '../services/api.service';

describe('EmailsResolve', () => {
  it('should create an instance', () => {
    const api = new ApiService();
    expect(new EmailsResolve(api)).toBeTruthy();
  });
});
