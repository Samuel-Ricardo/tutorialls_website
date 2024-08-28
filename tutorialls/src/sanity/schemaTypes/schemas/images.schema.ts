import { SchemaTypeDefinition } from 'sanity';

export const IMAGE_SCHEMA: SchemaTypeDefinition = {
  name: 'image',
  title: 'Image',
  type: 'document',
  fields: [
    {
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
