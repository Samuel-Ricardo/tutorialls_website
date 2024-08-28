import { SchemaTypeDefinition } from 'sanity';

export const PARAGRAPH_SCHEMA: SchemaTypeDefinition = {
  name: 'paragraphs',
  title: 'Paragraphs',
  type: 'document',
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
