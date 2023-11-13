import axios from 'axios';
import { addArticle } from './admin/adminUtils';

// Define the GitHub owner and repository name
const owner = 'allouchii';
const repo = 'allouchi-backend';
const filePath = 'articles.json';
const accessToken = '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';
const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;


async function getAllArticles() {
    try {
      const response = await axios.get(githubApiUrl, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
  
      const content = atob(response.data.content); // Decode Base64 content
      const articles = JSON.parse(content);
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  export let articlesFetched = []
    getAllArticles().then((articles) => {
        articlesFetched = articles
      });

  export function sortArticlesByPrice(articles) {
      articles.sort((a, b) => a.price - b.price);
    return articles;
}

// addArticle({
//     title: 'New Article',
//     description: 'New description',
//     price: 100,
//     race: 'Some Race',
//     age: 0.5,
//   });