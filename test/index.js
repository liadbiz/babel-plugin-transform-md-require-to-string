import { expect } from 'chai';
import { join } from 'path';
import { readdirSync, statSync, readFileSync } from 'fs';

import testPlugin from './testPlugin';

const FIXTURE_PATH = join(__dirname, 'fixtures');

const testFolders = readdirSync(FIXTURE_PATH).filter(file => (
  statSync(join(FIXTURE_PATH, file)).isDirectory()
));


describe('test require markdown file to string', () => {
  testFolders.forEach((folderName) =>　{
    const actual = readFileSync(join(FIXTURE_PATH, folderName, 'actual.js'), 'utf-8');
    const expected = readFileSync(join(FIXTURE_PATH, folderName, 'expected.js'), 'utf8');

    it(`works with $(folderName)`, () => {
      const result = testPlugin(actual);
      expect(result.trim()).to.equal(expected.trim());
    })
  })
});