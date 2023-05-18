"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRuntime = exports.generateRuntimeAndEmit = exports.OUTPUT_SOURCE_DIR = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-jetpack"));
const Path = tslib_1.__importStar(require("path"));
const debugNexusPrisma_1 = require("../helpers/debugNexusPrisma");
const ModuleGenerators_1 = require("./ModuleGenerators");
exports.OUTPUT_SOURCE_DIR = Path.join(__dirname, '../../../../node_modules/.nexus-prisma');
/** Generate the Nexus Prisma runtime files and emit them into a "hole" in the internal package source tree. */
const generateRuntimeAndEmit = (dmmf, settings) => {
    (0, debugNexusPrisma_1.d)('start generateRuntime with configuration %j', settings);
    (0, debugNexusPrisma_1.d)('start generateRuntime');
    if (process.env.NP_DEBUG) {
        fs.write('dmmf.json', dmmf);
    }
    const declarationSourceFile = ModuleGenerators_1.ModuleGenerators.TS.createModule(dmmf, settings);
    // comment this code because we generate only in on path
    /*  if (settings.data.output.directory === 'default') {
      // ESM
  
      const esmSourceFiles = [
        ModuleGenerators.JS.createModule({
          gentimeSettings: settings,
          esm: true,
          dmmf,
        }),
        declarationSourceFile,
      ]
  
      // fs.remove(OUTPUT_SOURCE_DIR_ESM)
  
      esmSourceFiles.forEach((sf) => {
        const filePath = Path.join(OUTPUT_SOURCE_DIR, sf.fileName)
        fs.remove(filePath)
        fs.write(filePath, sf.content)
        d(`did write ${filePath}`)
      })
  
      // CJS
  
      const cjsSourceFiles = [
        ModuleGenerators.JS.createModule({
          gentimeSettings: settings,
          esm: false,
          dmmf,
        }),
        declarationSourceFile,
      ]
  
      fs.remove(OUTPUT_SOURCE_DIR)
  
      cjsSourceFiles.forEach((sf) => {
        const filePath = Path.join(OUTPUT_SOURCE_DIR, sf.fileName)
        fs.remove(filePath)
        fs.write(filePath, sf.content)
        d(`did write ${filePath}`)
      })
    } else {*/
    const sourceFiles = [
        ModuleGenerators_1.ModuleGenerators.JS.createModule({
            gentimeSettings: settings,
            esm: false,
            dmmf,
        }),
        declarationSourceFile,
    ];
    // fs.remove(outputDir)
    const outPutDir = settings.data.output.directory === 'default' ? exports.OUTPUT_SOURCE_DIR : settings.data.output.directory;
    (0, debugNexusPrisma_1.d)(`found outputSourceDir ${outPutDir}`);
    sourceFiles.forEach((sf) => {
        const filePath = Path.join(outPutDir, sf.fileName.endsWith('d.ts') ? `${settings.data.output.name}.d.ts` : `${settings.data.output.name}.js`);
        fs.remove(filePath);
        fs.write(filePath, sf.content);
        (0, debugNexusPrisma_1.d)(`did write ${filePath}`);
    });
    //}
    (0, debugNexusPrisma_1.d)(`done writing all emitted files`);
};
exports.generateRuntimeAndEmit = generateRuntimeAndEmit;
/** Transform the given DMMF into JS source code with accompanying TS declarations. */
const generateRuntime = (dmmf, settings) => {
    return [
        ModuleGenerators_1.ModuleGenerators.JS.createModule({
            gentimeSettings: settings,
            esm: true,
            dmmf,
        }),
        ModuleGenerators_1.ModuleGenerators.JS.createModule({
            gentimeSettings: settings,
            esm: false,
            dmmf,
        }),
        ModuleGenerators_1.ModuleGenerators.TS.createModule(dmmf, settings),
    ];
};
exports.generateRuntime = generateRuntime;
//# sourceMappingURL=generate.js.map