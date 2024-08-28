import { SchemaTypeDefinition } from 'sanity';

export const PARAGRAPH_SCHEMA: SchemaTypeDefinition = {
  name: 'paragraph',
  title: 'Paragraph',
  type: 'object',
  fields: [
    {
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'string',
    },
  ],
};
