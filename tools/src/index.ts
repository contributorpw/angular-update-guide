import { promises as fs } from 'fs';
import * as path from 'path';
import { labelLocalizations, stepLocalizations } from '../../src/app/localization';
import './../../src/app/locales';
import { RECOMMENDATIONS } from './../../src/app/recommendations';

interface Checkout {
  [key: string]: {
    missing?: string[]; // Missing, untranslated keys
    waste?: string[]; // Unnecessary, extra keys
    present?: string[]; // Found, present keys
    expected?: string[]; // Expected, required keys
  };
}

const [, passedLocale] = process.argv.find((arg) => /^--locale=/.test(arg))?.match(/locale=(.*?)$/) ?? [, undefined];
const passedVerbose = !!process.argv.find((arg) => /^--verbose/.test(arg));

const checkLocalesActions = (verbose: Boolean = false) => {
  const locs = Array.from(stepLocalizations.keys());
  const expected = RECOMMENDATIONS.map((rec) => rec.step);
  return locs.map((loc) => {
    // @ts-ignore
    const present = Object.keys(stepLocalizations.get(loc));
    const out = {} as Checkout;
    out[loc] = verbose ? { present, expected } : {};
    // @ts-ignore
    out[loc]['missing'] = expected.filter((rec) => !stepLocalizations.get(loc)[rec]);
    out[loc]['waste'] = present?.filter((key) => !RECOMMENDATIONS.some((rec) => rec.step === key));
    return out;
  });
};

const checkLocalesLabels = async (verbose: Boolean = false) => {
  const dataTs = await fs.readFile(path.join('./../src/app/app.component.ts'), 'utf8');
  const stringTs = dataTs.replace(/[\r\n]/g, '');
  const matchesTs = stringTs.matchAll(/i18Service\.transform\(['"](.*?)['"]\)/g);
  const dataHtml = await fs.readFile(path.join('./../src/app/app.component.html'), 'utf8');
  const stringHtml = dataHtml.replace(/[\r\n]/g, '');
  const matchesHtml = stringHtml.matchAll(/{{\s*['"](.*?)['"]\s*\|\s*i18n}}/g);
  const expected = [...Array.from(matchesTs), ...Array.from(matchesHtml)].map((m) => m[1]);
  const locs = Array.from(labelLocalizations.keys());
  return locs.map((loc) => {
    // @ts-ignore
    const present = Object.keys(labelLocalizations.get(loc));
    const out = {} as Checkout;
    out[loc] = verbose ? { present, expected } : {};
    // @ts-ignore
    out[loc]['missing'] = expected.filter((rec) => !labelLocalizations.get(loc)[rec]);
    out[loc]['waste'] = present?.filter((key) => !expected.some((rec) => rec === key));
    return out;
  });
};

(async () => {
  let checkActions = checkLocalesActions(passedVerbose);
  let checkLabels = await checkLocalesLabels(passedVerbose);

  if (passedLocale) {
    // @ts-ignore
    checkActions = checkActions.find((loc) => loc[passedLocale]);
    // @ts-ignore
    checkLabels = checkLabels.find((loc) => loc[passedLocale]);
  }

  console.log('Check actions', JSON.stringify(checkActions, null, '  '));
  console.log('Check labels', JSON.stringify(checkLabels, null, '  '));
})();
