import dedent from 'dindist';
import { chain } from 'lodash';
import * as Nexus from 'nexus';
import { inspect } from 'util';
import { Messenger } from '../../lib/messenger';
import { PrismaDocumentation } from '../../lib/prisma-documentation';
import { PrismaUtils } from '../../lib/prisma-utils';
import { createWhereUniqueInput } from '../../lib/prisma-utils/whereUniqueInput';
import { fieldTypeToGraphQLType } from './TS';
/**
 * Create the module specification for the JavaScript runtime.
 */
export const createModule = (params) => {
    const { esm, gentimeSettings, dmmf } = params;
    const esmModelExports = dmmf.datamodel.models
        .map((model) => {
        return dedent `
        export const ${model.name} = nexusTypeDefConfigurations['${model.name}']
      `;
    })
        .join('\n') || `// N/A -- You have not defined any models in your Prisma Schema.`;
    const esmEnumExports = dmmf.datamodel.enums
        .map((enum_) => {
        return dedent `
          export const ${enum_.name} = nexusTypeDefConfigurations['${enum_.name}']
        `;
    })
        .join('\n') || `// N/A -- You have not defined any enums in your Prisma Schema.`;
    const exports = esm
        ? dedent `
        //
        // Exports
        //

        // Static API Exports

        export const $settings = RuntimeSettings.changeSettings

        // Reflected Model Exports

        ${esmModelExports}

        // Reflected Enum Exports

        ${esmEnumExports}
      `
        : dedent `
        module.exports = {
          $settings: RuntimeSettings.changeSettings,
          ...nexusTypeDefConfigurations,
        }
      `;
    const importSpecifierToNexusPrismaSourceDirectory = esm ? `nexus-prisma/dist-esm` : `nexus-prisma/dist-cjs`;
    const imports = esm
        ? dedent`
            import { Prisma } from '@prisma/client'
            import { ModuleGenerators } from '${importSpecifierToNexusPrismaSourceDirectory}/generator/ModuleGenerators/index'
            import * as RuntimeSettings from '${importSpecifierToNexusPrismaSourceDirectory}/generator/Settings/Runtime/index'
        `
        : dedent`
            const { Prisma } = require('@prisma/client')
            const { ModuleGenerators } = require('${importSpecifierToNexusPrismaSourceDirectory}/generator/ModuleGenerators/index')
            const RuntimeSettings = require('${importSpecifierToNexusPrismaSourceDirectory}/generator/Settings/Runtime/index')
        `
    return {
        // TODO this is no longer used, just return content
        fileName: 'index.js',
        content: dedent `
      ${imports}

      const gentimeSettingsData = ${JSON.stringify(gentimeSettings.data, null, 2)}
      const runtimeSettingsManager = RuntimeSettings.settings

      const dmmf = Prisma.dmmf

      const nexusTypeDefConfigurations = ModuleGenerators.JS.createNexusTypeDefConfigurations(dmmf, {
        gentime: gentimeSettingsData,
        runtime: runtimeSettingsManager,
      })

      ${exports}
    `,
    };
};
export const createNexusTypeDefConfigurations = (dmmf, settings) => {
    return {
        ...createNexusObjectTypeDefConfigurations(dmmf, settings),
        ...createNexusEnumTypeDefConfigurations(dmmf, settings),
    };
};
/**
 * Create Nexus object type definition configurations for Prisma models found in the given DMMF.
 */
const createNexusObjectTypeDefConfigurations = (dmmf, settings) => {
    return chain(dmmf.datamodel.models)
        .map((model) => {
        return {
            $name: model.name,
            $description: prismaNodeDocumentationToDescription({ settings, node: model }),
            ...chain(model.fields)
                .map((field) => {
                return {
                    name: field.name,
                    type: prismaFieldToNexusType(field, settings),
                    description: prismaNodeDocumentationToDescription({ settings, node: field }),
                    resolve: nexusResolverFromPrismaField(model, field, settings),
                };
            })
                .keyBy('name')
                .value(),
        };
    })
        .keyBy('$name')
        .value();
};
const prismaNodeDocumentationToDescription = (params) => {
    return params.settings.gentime.docPropagation.GraphQLDocs && params.node.documentation
        ? PrismaDocumentation.format(params.node.documentation)
        : undefined;
};
// Complex return type I don't really understand how to easily work with manually.
// eslint-disable-next-line
export const prismaFieldToNexusType = (field, settings) => {
    const graphqlType = fieldTypeToGraphQLType(field, settings.gentime);
    if (field.isList) {
        return Nexus.nonNull(Nexus.list(Nexus.nonNull(graphqlType)));
    }
    else if (field.isRequired) {
        return Nexus.nonNull(graphqlType);
    }
    else {
        return Nexus.nullable(graphqlType);
    }
};
/**
 * Create a GraphQL resolver for the given Prisma field. If the Prisma field is a scalar then no resolver is
 * returned and instead the Nexus default is relied upon.
 *
 * @remarks Allow Nexus default resolver to handle resolving scalars.
 *
 *          By using Nexus default we also affect its generated types, assuming there are not explicit
 *          source types setup which actually for Nexus Prisma projects there usually will be (the Prisma
 *          model types). Still, using the Nexus default is a bit more idiomatic and provides the better
 *          _default_ type generation experience of scalars being expected to come down from the source
 *          type (aka. parent).
 *
 *          So:
 *
 *          ```ts ...
 *          t.field(M1.Foo.bar)
 *          ```
 *
 *          where `bar` is a scalar prisma field would have NO resolve generated and thus default Nexus
 *          as mentioned would think that `bar` field WILL be present on the source type. This is, again,
 *          mostly moot since most Nexus Prisma users WILL setup the Prisma source types e.g.:
 *
 *          ```ts ...
 *          sourceTypes: { modules: [{ module: '.prisma/client', alias: 'PrismaClient' }]},
 *          ```
 *
 *          but this is overall the better way to handle this detail it seems.
 */
export const nexusResolverFromPrismaField = (model, field, settings) => {
    if (field.kind !== 'object') {
        return undefined;
    }
    return (source, _args, ctx) => {
        const whereUnique = createWhereUniqueInput(source, model);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const prisma = ctx[settings.runtime.data.prismaClientContextField];
        const prismaOrmModelPropertyName = PrismaUtils.typeScriptOrmModelPropertyNameFromModelName(model.name);
        if (settings.runtime.data.checks.PrismaClientOnContext.enabled) {
            const performInstanceOfStrategy = () => {
                // eslint-disable-next-line
                let PrismaClientPackage;
                try {
                    // eslint-disable-next-line
                    PrismaClientPackage = require(settings.gentime.prismaClientImportId);
                }
                catch (e) {
                    // TODO rich errors
                    throw new Error(`Could not perform "PrismaClientOnContext" check because there was an error while trying to import Prisma Client:\n\n${String(e)}`);
                }
                if (!(PrismaClientPackage !== null &&
                    typeof PrismaClientPackage === 'object' &&
                    // eslint-disable-next-line
                    typeof PrismaClientPackage.PrismaClient === 'function')) {
                    // TODO rich errors
                    throw new Error(`Could not perform "PrismaClientOnContext" check because could not get a reference to a valid Prisma Client class. Found:\n\n${inspect(PrismaClientPackage)}`);
                }
                // eslint-disable-next-line
                return prisma instanceof PrismaClientPackage.PrismaClient;
            };
            if (settings.runtime.data.checks.PrismaClientOnContext.strategy === 'duckType') {
                if (!PrismaUtils.duckTypeIsPrismaClient(prisma, prismaOrmModelPropertyName)) {
                    console.error(1);
                    // TODO rich errors
                    throw new Error(`Check "PrismaClientOnContext" failed using "duckType" strategy. The GraphQL context.${settings.runtime.data.prismaClientContextField} value is not an instance of the Prisma Client.`);
                }
            }
            else if (settings.runtime.data.checks.PrismaClientOnContext.strategy === 'instanceOf') {
                if (!performInstanceOfStrategy()) {
                    throw new Error(`Check "PrismaClientOnContext" failed using "instanceOf" strategy. The GraphQL context.${settings.runtime.data.prismaClientContextField} value is not an instance of the Prisma Client.`);
                }
            }
            else {
                if (!performInstanceOfStrategy()) {
                    if (!PrismaUtils.duckTypeIsPrismaClient(prisma, prismaOrmModelPropertyName)) {
                        // TODO rich errors
                        throw new Error(`Check "PrismaClientOnContext" failed using "instanceOf_duckType_fallback" strategy. The GraphQL context.${settings.runtime.data.prismaClientContextField} value is not an instance of the Prisma Client.`);
                    }
                    // DuckType passed but InstanceOf strategy failed, so show a warning.
                    Messenger.showWarning({
                        code: 'PrismaClientOnContextInstanceOfStrategyFailed',
                        title: `Prisma Client on GraphQL context failed being checked using instanceof`,
                        reason: `The Prisma Client class reference imported from ${settings.gentime.prismaClientImportId} is not the same class used by you to create your Prisma Client instance.`,
                        consequence: `Maybe none since duck typing fallback indicates that the Prisma Client on the GraphQL context is actually valid. However relying on duck typing is hacky.`,
                    });
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const prismaModel = prisma[prismaOrmModelPropertyName];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (typeof prismaModel.findUnique !== 'function') {
            // TODO rich errors
            throw new Error(`The prisma model ${model.name} does not have a findUnique method available.`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const findUnique = prismaModel.findUnique;
        const result = findUnique({
            where: whereUnique,
            /**
             *
             * The user might have configured Prisma Client globally to rejectOnNotFound.
             * In the context of this Nexus Prisma managed resolver, we don't want that setting to
             * be a behavioral factor. Instead, Nexus Prisma has its own documented rules about the logic
             * it uses to project nullability from the database to the api.
             *
             * More details about this design can be found in the README.
             *
             * References:
             *
             * - https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#rejectonnotfound
             */
            rejectOnNotFound: false,
        });
        // @ts-expect-error Only known at runtime
        // eslint-disable-next-line
        return result[field.name]();
    };
};
/**
 * Create Nexus enum type definition configurations for Prisma enums found in the given DMMF.
 */
const createNexusEnumTypeDefConfigurations = (dmmf, settings) => {
    return chain(dmmf.datamodel.enums)
        .map((enum_) => {
        return {
            name: enum_.name,
            description: prismaNodeDocumentationToDescription({ settings, node: enum_ }),
            members: enum_.values.map((val) => val.name),
        };
    })
        .keyBy('name')
        .value();
};
//# sourceMappingURL=JS.js.map