import { type SchemaTypeDefinition } from 'sanity';
import { PARAGRAPH_SCHEMA } from './schemas/typography/paragraph.schema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [PARAGRAPH_SCHEMA],
};
