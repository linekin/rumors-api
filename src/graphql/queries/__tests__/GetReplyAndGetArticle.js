import GraphQL from 'util/GraphQL';
import { loadFixtures, unloadFixtures } from 'util/fixtures';
import fixtures from '../__fixtures__/GetReplyAndArticle';

beforeAll(() => loadFixtures(fixtures));

describe('GetArticle', () => {
  it('should get the specified article & associated replies from ID', async () => {
    expect(await GraphQL(`{
      GetArticle(id: "foo") {
        text
        references { type }
        replies {
          versions {
            text
            type
            reference
          }
        }
      }
    }`)).toMatchSnapshot();
  });

  it('relatedArticles should work', async () => {
    // No param
    //
    expect(await GraphQL(`{
      GetArticle(id: "foo") {
        relatedArticles {
          id
          text
        }
      }
    }`)).toMatchSnapshot();

    // filter
    //
    expect(await GraphQL(`{
      GetArticle(id: "foo") {
        relatedArticles(filter: {replyCount: {GT: 1}}) {
          id
          text
        }
      }
    }`)).toMatchSnapshot();

    // sort
    //
    expect(await GraphQL(`{
      GetArticle(id: "foo") {
        relatedArticles(orderBy: [{field: _score, order: ASC}]) {
          id
          text
        }
      }
    }`)).toMatchSnapshot();
  });
});

describe('GetReply', () => {
  it('should get the specified reply & associated articles from ID', async () => {
    expect(await GraphQL(`{
      GetReply(id: "bar") {
        versions {
          text
          type
          reference
        }
        articles {
          text
        }
      }
    }`)).toMatchSnapshot();
  });
});

afterAll(() => unloadFixtures(fixtures));