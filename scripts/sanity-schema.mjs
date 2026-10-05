// Prints the schema in src/sanity/schema.mjs as the object-literal declaration Sanity's managed schema
// deploy expects (the `schemaDeclaration` of the deploy_schema tool): one literal per type, unquoted keys.
//   node scripts/sanity-schema.mjs [typeName ...]     (default: all types)
import { schemaTypes } from "../src/sanity/schema.mjs";
const only = process.argv.slice(2);
const literal = t => JSON.stringify(t).replace(/"([A-Za-z_][A-Za-z0-9_]*)":/g, "$1:");
console.log(schemaTypes.filter(t => !only.length || only.includes(t.name)).map(literal).join("\n\n"));
