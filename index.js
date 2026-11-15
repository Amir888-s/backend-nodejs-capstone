require('dotenv').config();
const natural = require('natural');
const app = require('./app');

const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

app.post('/api/sentiment', (req, res) => {
  const text = String(req.body.text || '');
  const tokens = new natural.WordTokenizer().tokenize(text);
  const score = analyzer.getSentiment(tokens);
  const sentiment = score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral';
  res.json({ text, score, sentiment });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Second Chance API listening on port ${port}`));
}

module.exports = app;
