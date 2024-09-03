/*
 * @jest-environment node
 */

import { MODULES } from '@/@module/app.facotry';
import { TutorialController } from '@/@module/application/controller/tutorial/tutorial.controller';
import { AuthController } from '@/@module/application/controller/user/auth.controller';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { GlobalSession } from '@/global/session.global';
import 'reflect-metadata';

jest.setTimeout(100000); // Define o tempo limite como 10 segundos

describe('[INTEGRATION] | CONTROLLER => [TUTORIAL]', () => {
  let controller: TutorialController;
  let auth: AuthController;
  let tutorial: ITutorialDTO;

  beforeEach(async () => {
    controller = MODULES.APPLICATION.CONTROLLER.TUTORIAL();
    auth = MODULES.APPLICATION.CONTROLLER.AUTH();

    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(TutorialController);

    expect(auth).toBeDefined();
    expect(auth).toBeInstanceOf(AuthController);

    try {
      await auth.signup({
        email: 'admin@admin.com',
        password: '123456789',
      });
    } catch (e) {}

    const { token } = await auth.login({
      email: 'admin@admin.com',
      password: '123456789',
    });

    expect(token).toBeDefined();

    GlobalSession.user = {
      authToken: token,
      email: 'admin@admin.com',
      password: '123456789',
    };

    expect(GlobalSession.user).toBeDefined();
  });

  it('[SHOULD] | [CREATE] => [TUTORIAL]', async () => {
    const result = await controller.create({
      title: 'title',
      content: 'content',
      author: 'author',
    });

    expect(result.id).toBeDefined();
    expect(result.title).toBe('title');
    expect(result.content).toBe('content');
    expect(result.autor).toBe('author');
  });

  it('[SHOULD] | LIST [ALL] => [TUTORIALS]', async () => {
    const result = await controller.listAll({
      pagination: { limit: 10, page: 1 },
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.length).toBeLessThanOrEqual(10);

    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].title).toBeDefined();
    expect(result.items[0].content).toBeDefined();
    expect(result.items[0].author).toBeDefined();

    tutorial = result.items[0];
  });

  it('[SHOULD] | [UPDATE] => [TUTORIAL]', async () => {
    const result = await controller.update({
      id: tutorial.id,
      title: 'title_updated',
      content: 'content_updated',
      author: 'author_updated',
    });

    expect(result.id).toBe(tutorial.id);
    expect(result.title).toBe('title_updated');
    expect(result.content).toBe('content_updated');
    expect(result.autor).toBe('author_updated');

    tutorial = result;
  });

  it('[SHOULD] | FILTER BY [TITLE] => [TUTORIAL]', async () => {
    const result = await controller.filterByTitle({
      title: 'title',
      limit: 10,
      page: 1,
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.length).toBeLessThanOrEqual(10);

    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].title).toBe('title_updated');
    expect(result.items[0].content).toBeDefined();
    expect(result.items[0].author).toBeDefined();
  });

  it('[SHOULD] | FILTER BY [AUTHOR] => [TUTORIAL]', async () => {
    const result = await controller.filterByAuthor({
      author: 'author',
      limit: 10,
      page: 1,
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.length).toBeLessThanOrEqual(10);

    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].title).toBeDefined();
    expect(result.items[0].content).toBeDefined();
    expect(result.items[0].author).toBe('author_updated');
  });

  it('[SHOULD] | FILTER BY [KEYWORD] IN [CONTENT] => [TUTORIAL]', async () => {
    const result = await controller.filterByKeywordInContent({
      keyword: 'content',
      limit: 10,
      page: 1,
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.length).toBeLessThanOrEqual(10);

    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].title).toBeDefined();
    expect(result.items[0].content).toBe('content_updated');
    expect(result.items[0].author).toBeDefined();
  });

  it('[SHOULD] | [DELETE] => [TUTORIAL]', async () => {
    const result = await controller.delete({
      id: tutorial.id || '',
    });

    expect(result).toBe(true);
  });
});
