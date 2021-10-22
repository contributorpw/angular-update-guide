// import * as fs from 'fs';
// import { promisify } from 'util';
import './../../src/app/locales';

// // stepLocalizations = new Map<string, LocalizedSteps>();
// // export const labelLocalizations = new Map<string, LocalizedLabels>();

// const readFile_ = promisify(fs.readFile);
// const [, locale_] = process.argv[2]?.match(/\-\-locale=(.*?)$/) ?? [, undefined];

// if (!locale_) {
//   console.log('Expected param "--locale=ru-RU"');
//   process.exit(0);
// }

// (async () => {
//   const data = await readFile_('./src/app/app.component.html', 'utf8');
//   // @ts-ignore
//   const matches: string[] = Array.from(data.matchAll(/{{(.*?)\|i18n}}/gi))
//     .filter((m: string[]) => m[1] && m[1].length)
//     .map((m): string => m[1].replace(/^['`"]*(.+)['`"]+$/, '$1'))
//     .filter((m, i, a) => a.indexOf(m) === i)
//     .sort();
//   console.log(matches.map((m) => `'${m}': '',`).join('\n'));

//   // console.log(locales);
// })();
