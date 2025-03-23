import _ from 'lodash'
export const news = _.times(100, (i) => ({
  nick: `build-news-${i}`,
  name: `Новость ${i}`,
  description: `Описание ${i}`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} for news ${i}...</p>`).join(''),
}))
