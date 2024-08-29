import { type SchemaTypeDefinition } from 'sanity';
import { PARAGRAPH_SCHEMA } from './schemas/typography/paragraph.schema';
import { IMAGE_SCHEMA } from './schemas/images.schema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [PARAGRAPH_SCHEMA, IMAGE_SCHEMA],
};
