import { ITutorialDTO } from '@/tutorial/tutorial.dto';

export class Tutorial {
  private readonly id: string;
  private readonly title: string;
  private readonly content: string;
  private readonly autor: string;
  private readonly created_at?: Date;
  private readonly updated_at?: Date;

  constructor(
    id: string,
    title: string,
    content: string,
    autor: string,
    created_at?: Date,
    updated_at?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.autor = autor;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toDTO(): ITutorialDTO {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      author: this.autor,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  static fromDTO(dto: ITutorialDTO): Tutorial {
    return new Tutorial(
      dto.id!,
      dto.title,
      dto.content,
      dto.author,
      dto.created_at,
      dto.updated_at,
    );
  }
}
