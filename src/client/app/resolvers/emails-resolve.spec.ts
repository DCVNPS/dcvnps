import { EmailsResolve } from './emails-resolve';
import { ApiService } from '../services/api.service';

describe('EmailsResolve', (api: ApiService) => {
  it('should create an instance', () => {
    expect(new EmailsResolve(api)).toBeTruthy();
  });
});
