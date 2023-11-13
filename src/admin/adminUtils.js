import axios from 'axios';

// Define the GitHub owner and repository name
const owner = 'allouchii';
const repo = 'allouchi-backend';
const filePath = 'articles.json';
const accessToken = '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';
const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;


export async function getAllArticles() {
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

export async function addArticle(newArticle, articles) {
    try {
        await updateArticlesInRepo(articles, `Added new article with ID ${newArticle.id}`);

    } catch (error) {
        console.error('Error adding new article:', error);
    }
}

export async function updateArticle(articleId, updatedArticle) {
    try {
        let articles = await getAllArticles();

        const index = articles.findIndex((article) => article.id === articleId);
        if (index !== -1) {
            articles[index] = { ...articles[index], ...updatedArticle };

            await updateArticlesInRepo(articles, `Update article with ID ${articleId}`);
        } else {
            console.log(`Article with ID ${articleId} not found.`);
        }
    } catch (error) {
        console.error('Error updating article');
    }
}

export async function deleteArticle(articleId) {
    try {
        let articles = await getAllArticles();

        const index = articles.findIndex((article) => article.id === articleId);
        if (index !== -1) {
            articles.splice(index, 1);

            await updateArticlesInRepo(articles, `Delete article with ID ${articleId}`);

            console.log(`Article with ID ${articleId} deleted successfully.`);
        } else {
            console.log(`Article with ID ${articleId} not found.`);
        }
    } catch (error) {
        console.error('Error deleting article');
    }
}

export async function updateArticlesInRepo(articles, commitMessage) {
    const currentContent = await getCurrentContent();
    const sha = currentContent.sha;
    const updatedContent = JSON.stringify(articles, null, 2);
    const encodedContent = btoa(updatedContent); // Encode content to Base64
  
    await axios.put(
      githubApiUrl,
      {
        message: commitMessage,
        content: encodedContent,
        sha: sha, // Provide the sha of the current file version
      },
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
  }

export async function getCurrentContent() {
    try {
      const response = await axios.get(githubApiUrl, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching current content:', error);
      return null;
    }
  }


// addArticle({
//     title: 'Hello World',
//     description: 'New description',
//     price: 100,
//     race: 'Some Race',
//     age: 0.5,
// });
