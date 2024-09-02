import 'reflect-metadata';
import { CreateTutorialUseCase } from '@/@module/application/use_case/tutorial/create.use_case';
import { ICreateTutorialDTO } from '@/@module/domain/DTO/tutorial/create.dto';
import { DeleteTutorialUseCase } from '@/@module/application/use_case/tutorial/delete.use_case';
import { IDeleteTutorialDTO } from '@/@module/domain/DTO/tutorial/delete.dto';
import { IUpdateTutorialDTO } from '@/@module/domain/DTO/tutorial/update.dto';
import { IListAllTutorialsDTO } from '@/@module/domain/DTO/tutorial/list/all.dto';
import { IFilterTutorialsByAuthorDTO } from '@/@module/domain/DTO/tutorial/filter/by/author.dto';
import { IFilterTutorialsByContentDTO } from '@/@module/domain/DTO/tutorial/filter/by/content.dto';
import { FilterTutorialByAuthorUseCase } from '@/@module/application/use_case/tutorial/filter/by/author.use_case';
import { FilterTutorialByKeywordUseCase } from '@/@module/application/use_case/tutorial/filter/by/keyword.use_case';
import { FilterTutorialByTitleUseCase } from '@/@module/application/use_case/tutorial/filter/by/title.use_case';
import { ListAllTutorialsUseCase } from '@/@module/application/use_case/tutorial/list/all.use_case';
import { UpdateTutorialUseCase } from '@/@module/application/use_case/tutorial/update.uce_case';
import { IFilterTutorialsByTitleDTO } from '@/@module/domain/DTO/tutorial/filter/by/title.dto';

const mockGateway = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  listAll: jest.fn(),
  findByAuthor: jest.fn(),
  findByKeywordInContent: jest.fn(),
  findByTitle: jest.fn(),
};

describe('[MODULE] [USE_CASE] => [TUTORIAL]', () => {
  let createTutorialUseCase: CreateTutorialUseCase;
  let updateTutorialUseCase: UpdateTutorialUseCase;
  let deleteTutorialUseCase: DeleteTutorialUseCase;
  let listAllTutorialsUseCase: ListAllTutorialsUseCase;
  let filterTutorialByAuthorUseCase: FilterTutorialByAuthorUseCase;
  let filterTutorialByKeywordUseCase: FilterTutorialByKeywordUseCase;
  let filterTutorialByTitleUseCase: FilterTutorialByTitleUseCase;

  beforeEach(() => {
    createTutorialUseCase = new CreateTutorialUseCase();
    (createTutorialUseCase as any).gateway = mockGateway;

    updateTutorialUseCase = new UpdateTutorialUseCase();
    (updateTutorialUseCase as any).gateway = mockGateway;

    deleteTutorialUseCase = new DeleteTutorialUseCase();
    (deleteTutorialUseCase as any).gateway = mockGateway;

    listAllTutorialsUseCase = new ListAllTutorialsUseCase();
    (listAllTutorialsUseCase as any).gateway = mockGateway;

    filterTutorialByAuthorUseCase = new FilterTutorialByAuthorUseCase();
    (filterTutorialByAuthorUseCase as any).gateway = mockGateway;

    filterTutorialByKeywordUseCase = new FilterTutorialByKeywordUseCase();
    (filterTutorialByKeywordUseCase as any).gateway = mockGateway;

    filterTutorialByTitleUseCase = new FilterTutorialByTitleUseCase();
    (filterTutorialByTitleUseCase as any).gateway = mockGateway;
  });

  it('[UNIT] | SHOULD - CREATE > TUTORIAL [USE_CASE]', async () => {
    const tutorialDTO: ICreateTutorialDTO = {
      author: 'Test Author',
      title: 'Test Tutorial',
      content: 'This is a test tutorial content.',
    };

    mockGateway.create.mockResolvedValueOnce(tutorialDTO);
    const result = await createTutorialUseCase.execute(tutorialDTO);

    expect(mockGateway.create).toHaveBeenCalledTimes(1);
    expect(mockGateway.create).toHaveBeenCalledWith(tutorialDTO);
    expect(result).toEqual(tutorialDTO);
  });

  it('[UNIT] | [SHOULD] - ERROR [ON] CREATE > TUTORIAL [USE_CASE]', async () => {
    const tutorialDTO: ICreateTutorialDTO = {
      title: 'Test Tutorial',
      content: 'This is a test tutorial content.',
      author: 'Test Author',
    };

    const error = new Error('Failed to create tutorial');
    mockGateway.create.mockRejectedValueOnce(error);

    await expect(createTutorialUseCase.execute(tutorialDTO)).rejects.toThrow(
      'Failed to create tutorial',
    );
  });

  it('[UNIT] | SHOULD - UPDATE > TUTORIAL [USE_CASE]', async () => {
    const updateDTO: IUpdateTutorialDTO = {
      id: '1',
      author: 'Updated Author',
      title: 'Updated Tutorial',
      content: 'This is updated tutorial content.',
    };

    mockGateway.update.mockResolvedValueOnce(updateDTO);
    const result = await updateTutorialUseCase.execute(updateDTO);

    expect(mockGateway.update).toHaveBeenCalledTimes(1);
    expect(mockGateway.update).toHaveBeenCalledWith(updateDTO);
    expect(result).toEqual(updateDTO);
  });

  it('[UNIT] | [SHOULD] - ERROR [ON] UPDATE > TUTORIAL [USE_CASE]', async () => {
    const updateDTO: IUpdateTutorialDTO = {
      id: '1',
      author: 'Updated Author',
      title: 'Updated Tutorial',
      content: 'This is updated tutorial content.',
    };

    const error = new Error('Failed to update tutorial');
    mockGateway.update.mockRejectedValueOnce(error);

    await expect(updateTutorialUseCase.execute(updateDTO)).rejects.toThrow(
      'Failed to update tutorial',
    );
  });

  it('[UNIT] | SHOULD - DELETE > TUTORIAL [USE_CASE]', async () => {
    const deleteDTO: IDeleteTutorialDTO = {
      id: '1',
    };

    mockGateway.delete.mockResolvedValueOnce(deleteDTO);
    const result = await deleteTutorialUseCase.execute(deleteDTO);

    expect(mockGateway.delete).toHaveBeenCalledTimes(1);
    expect(mockGateway.delete).toHaveBeenCalledWith(deleteDTO);
    expect(result).toEqual(deleteDTO);
  });

  it('[UNIT] | [SHOULD] - ERROR [ON] DELETE > TUTORIAL [USE_CASE]', async () => {
    const deleteDTO: IDeleteTutorialDTO = {
      id: '1',
    };

    const error = new Error('Failed to delete tutorial');
    mockGateway.delete.mockRejectedValueOnce(error);

    await expect(deleteTutorialUseCase.execute(deleteDTO)).rejects.toThrow(
      'Failed to delete tutorial',
    );
  });

  it('[UNIT] | SHOULD - LIST ALL > TUTORIALS [USE_CASE]', async () => {
    const listAllDTO: IListAllTutorialsDTO = {
      filter: 'some-filter',
    };

    const tutorialList = [
      { id: '1', author: 'Author 1', title: 'Title 1', content: 'Content 1' },
      { id: '2', author: 'Author 2', title: 'Title 2', content: 'Content 2' },
    ];

    mockGateway.listAll.mockResolvedValueOnce(tutorialList);
    const result = await listAllTutorialsUseCase.execute(listAllDTO);

    expect(mockGateway.listAll).toHaveBeenCalledTimes(1);
    expect(mockGateway.listAll).toHaveBeenCalledWith(listAllDTO);
    expect(result).toEqual(tutorialList);
  });

  it('[UNIT] | [SHOULD] - ERROR [ON] LIST ALL > TUTORIALS [USE_CASE]', async () => {
    const listAllDTO: IListAllTutorialsDTO = {
      filter: 'some-filter',
    };

    const error = new Error('Failed to list all tutorials');
    mockGateway.listAll.mockRejectedValueOnce(error);

    await expect(listAllTutorialsUseCase.execute(listAllDTO)).rejects.toThrow(
      'Failed to list all tutorials',
    );
  });

  it('[UNIT] | SHOULD - FILTER BY AUTHOR > TUTORIALS [USE_CASE]', async () => {
    const filterDTO: IFilterTutorialsByAuthorDTO = {
      author: 'Author 1',
    };

    const filteredTutorials = [
      { id: '1', author: 'Author 1', title: 'Title 1', content: 'Content 1' },
    ];

    mockGateway.findByAuthor.mockResolvedValueOnce(filteredTutorials);
    const result = await filterTutorialByAuthorUseCase.execute(filterDTO);

    expect(mockGateway.findByAuthor).toHaveBeenCalledTimes(1);
    expect(mockGateway.findByAuthor).toHaveBeenCalledWith(filterDTO);
    expect(result).toEqual(filteredTutorials);
  });

  it('[UNIT] | [SHOULD] - ERROR [ON] FILTER BY AUTHOR > TUTORIALS [USE_CASE]', async () => {
    const filterDTO: IFilterTutorialsByAuthorDTO = {
      author: 'Author 1',
    };

    const error = new Error('Failed to filter tutorials by author');
    mockGateway.findByAuthor.mockRejectedValueOnce(error);

    await expect(
      filterTutorialByAuthorUseCase.execute(filterDTO),
    ).rejects.toThrow('Failed to filter tutorials by author');
  });

  it('[UNIT] | SHOULD - FILTER BY KEYWORD > TUTORIALS [USE_CASE]', async () => {
    const filterDTO: IFilterTutorialsByContentDTO = {
      keyword: 'test',
    };

    const filteredTutorials = [
      {
        id: '1',
        author: 'Author 1',
        title: 'Title 1',
        content: 'This is a test content',
      },
    ];

    mockGateway.findByKeywordInContent.mockResolvedValueOnce(filteredTutorials);
    const result = await filterTutorialByKeywordUseCase.execute(filterDTO);

    expect(mockGateway.findByKeywordInContent).toHaveBeenCalledTimes(1);
    expect(mockGateway.findByKeywordInContent).toHaveBeenCalledWith(filterDTO);
    expect(result).toEqual(filteredTutorials);
  });

  it('[UNIT] | [SHOULD] - ERROR [ON] FILTER BY KEYWORD > TUTORIALS [USE_CASE]', async () => {
    const filterDTO: IFilterTutorialsByContentDTO = {
      keyword: 'test',
    };

    const error = new Error('Failed to filter tutorials by keyword');
    mockGateway.findByKeywordInContent.mockRejectedValueOnce(error);

    await expect(
      filterTutorialByKeywordUseCase.execute(filterDTO),
    ).rejects.toThrow('Failed to filter tutorials by keyword');
  });

  it('[UNIT] | SHOULD - FILTER BY TITLE > TUTORIALS [USE_CASE]', async () => {
    const filterDTO: IFilterTutorialsByTitleDTO = {
      title: 'Tutorial Title',
    };

    const filteredTutorials = [
      {
        id: '1',
        author: 'Author 1',
        title: 'Tutorial Title',
        content: 'Content 1',
      },
    ];

    mockGateway.findByTitle.mockResolvedValueOnce(filteredTutorials);
    const result = await filterTutorialByTitleUseCase.execute(filterDTO);

    expect(mockGateway.findByTitle).toHaveBeenCalledTimes(1);
    expect(mockGateway.findByTitle).toHaveBeenCalledWith(filterDTO);
    expect(result).toEqual(filteredTutorials);
  });

  it('[UNIT] | [SHOULD] - ERROR [ON] FILTER BY TITLE > TUTORIALS [USE_CASE]', async () => {
    const filterDTO: IFilterTutorialsByTitleDTO = {
      title: 'Tutorial Title',
    };

    const error = new Error('Failed to filter tutorials by title');
    mockGateway.findByTitle.mockRejectedValueOnce(error);

    await expect(
      filterTutorialByTitleUseCase.execute(filterDTO),
    ).rejects.toThrow('Failed to filter tutorials by title');
  });
});
