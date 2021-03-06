/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for angular-app-archive-network', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app-archive-network', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app-archive-network');
    })
  });

  it('network-name should be archive-network@0.0.10',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('archive-network@0.0.10.bna');
    });
  });

  it('navbar-brand should be angular-app-archive-network',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('angular-app-archive-network');
    });
  });

  
    it('OfficialDocument component should be loadable',() => {
      page.navigateTo('/OfficialDocument');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OfficialDocument');
      });
    });

    it('OfficialDocument table should have 31 columns',() => {
      page.navigateTo('/OfficialDocument');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(31); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Secretary component should be loadable',() => {
      page.navigateTo('/Secretary');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Secretary');
      });
    });

    it('Secretary table should have 4 columns',() => {
      page.navigateTo('/Secretary');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Querent component should be loadable',() => {
      page.navigateTo('/Querent');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Querent');
      });
    });

    it('Querent table should have 4 columns',() => {
      page.navigateTo('/Querent');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Archive component should be loadable',() => {
      page.navigateTo('/Archive');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Archive');
      });
    });
  
    it('ArchivePrint component should be loadable',() => {
      page.navigateTo('/ArchivePrint');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ArchivePrint');
      });
    });
  
    it('Inquiry component should be loadable',() => {
      page.navigateTo('/Inquiry');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Inquiry');
      });
    });
  
    it('Demo component should be loadable',() => {
      page.navigateTo('/Demo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Demo');
      });
    });
  
    it('InquiryHistorian component should be loadable',() => {
      page.navigateTo('/InquiryHistorian');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('InquiryHistorian');
      });
    });
  

});