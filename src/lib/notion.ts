import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const syncImagesWithNotion = async (databaseId: string) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return response.results.map((page: any) => ({
      url: page.properties.URL?.url || '',
      title: page.properties.Name?.title[0]?.plain_text || '',
      description: page.properties.Description?.rich_text[0]?.plain_text || '',
      category: page.properties.Category?.select?.name || '',
      alt_text: page.properties.AltText?.rich_text[0]?.plain_text || '',
    }));
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    throw error;
  }
};