import { zavaLearningAssignments } from './learning';
import { zavaNews } from './news';
import { getZavaPerson, zavaPeople } from './personas';

describe('Zava One fixture integrity', () => {
  test('ships eight authored offline news stories with valid people and media', () => {
    expect(zavaNews).toHaveLength(8);
    expect(new Set(zavaNews.map((story) => story.id)).size).toBe(8);
    for (const story of zavaNews) {
      expect(story.imageUrl.startsWith('data:image/jpeg;base64,')).toBe(true);
      expect(story.imageAlt.length).toBeGreaterThan(20);
      expect(getZavaPerson(story.authorId).id).toBe(story.authorId);
      expect(story.summary.length).toBeGreaterThan(60);
    }
  });

  test('ships portrait-backed recurring personas', () => {
    const people = [zavaPeople.megan, zavaPeople.patti, zavaPeople.diego, zavaPeople.johanna, zavaPeople.joni];
    expect(people.every((person) => person.photoUrl.startsWith('data:image/jpeg;base64,'))).toBe(true);
    expect(new Set(people.map((person) => person.id)).size).toBe(people.length);
  });

  test('prioritizes three independently selectable required assignments', () => {
    expect(zavaLearningAssignments).toHaveLength(3);
    expect(zavaLearningAssignments[0].id).toBe('learn-data-care');
    expect(zavaLearningAssignments.every((assignment) => assignment.required)).toBe(true);
    expect(new Set(zavaLearningAssignments.map((assignment) => assignment.id)).size).toBe(3);
  });
});