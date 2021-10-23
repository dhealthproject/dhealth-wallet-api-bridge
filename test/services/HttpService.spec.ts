/**
 * This file is part of dHealth Wallet API Bridge shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet API Bridge
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { HttpService } from '@/services/HttpService';

class fakeService extends HttpService {
  public wrap(nodeUrl: string) {
    return this.wrapURL(nodeUrl);
  }
};

const mockService = new fakeService;

describe('services/HttpService --->', () => {
  describe('wrapURL() ->', () => {
    it('should keep URL unchanged given valid URL', () => {
      const url = 'http://dual-01.dhealth.cloud:3000';
      const wrapped = mockService.wrap(url);

      expect(wrapped).toEqual(url);
    });

    it('should add protocol given URL with missing protocol', () => {
      const url = 'dual-01.dhealth.cloud:3000';
      const wrapped = mockService.wrap(url);

      expect(wrapped).toEqual(`http://${url}`);
    });

    it('should keep custom port given URL with custom port', () => {
      const url = 'http://dual-01.dhealth.cloud:123';
      const wrapped = mockService.wrap(url);

      expect(wrapped).toEqual(url);
    });

    it('should add default port given URL with missing port', () => {
      const url = 'http://dual-01.dhealth.cloud';
      const wrapped = mockService.wrap(url);

      expect(wrapped).toEqual(`${url}:3000`);
    });

    it('should add HTTPS port given HTTPS URL with missing port', () => {
      const url = 'https://dual-01.dhealth.cloud';
      const wrapped = mockService.wrap(url);

      expect(wrapped).toEqual(`${url}:3001`);
    });
  });

});
