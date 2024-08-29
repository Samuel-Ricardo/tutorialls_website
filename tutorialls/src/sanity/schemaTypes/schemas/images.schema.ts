import { SchemaTypeDefinition } from 'sanity';

export const IMAGE_SCHEMA: SchemaTypeDefinition = {
  name: 'images',
  title: 'Images',
  type: 'document',
  fields: [
    {
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'imageD',
      title: 'ImageD',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
