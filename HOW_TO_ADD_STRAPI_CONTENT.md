# How to Add a New Strapi Content Type and Integrate with Next.js

This guide outlines the process for adding a new content type in Strapi and integrating it into your Next.js frontend. It covers data fetching, component updates, and styling considerations.

## 1. Understand Existing Strapi Content Types

Before creating a new content type, review existing ones to understand their structure and how they are used. This helps maintain consistency.

*   **Locate Content Type Definitions:** Examine `.json` files in `strapi-content-types/` (e.g., `strapi-content-types/cancer-information.json`). These define the fields and their types.
*   **Review API Usage:** Look at existing data fetching functions in `lib/strapi/` (e.g., `lib/strapi/content.ts`) to see how data is queried and transformed.

## 2. Create/Identify Your Strapi Content Type

If you don't have an existing content type, you'll need to create one in your Strapi admin panel. Define the necessary fields (e.g., `title`, `content` (as Rich Text), `category`, `order`, etc.).

*   **Content Manager:** Go to your Strapi admin panel -> Content Manager -> Create new collection type.
*   **Define Fields:** Add fields relevant to your content. For rich text content that might include Markdown, ensure you select the `Rich text` field type.

## 3. Create a Data Fetching Function in `lib/strapi/`

Create a new TypeScript file in the `lib/strapi/` directory (e.g., `lib/strapi/your-new-content.ts`). This file will contain the logic to fetch and transform data from your new Strapi content type.

*   **Define Types:**

    ```typescript
    // Type for a single item from Strapi
    export interface StrapiYourContent {
      id: number;
      // ... other fields as defined in your Strapi content type
      content: any; // Use 'any' for rich text content from Strapi
    }

    // Type for the transformed data (what your components will use)
    export interface YourContent {
      id: string;
      // ... transformed fields
      content: string; // Will be Markdown string if using react-markdown
    }
    ```

*   **Create a Transform Function:** This function converts the raw Strapi data into a format suitable for your frontend components. If your Strapi rich text field stores Markdown, simply pass the content through.

    ```typescript
    export function transformStrapiYourContent(item: StrapiYourContent): YourContent {
      return {
        id: item.id.toString(),
        // ... transform other fields
        content: item.content, // Assuming content is already Markdown string
      };
    }
    ```

*   **Create an API Fetching Function:** Use `strapiRequest` to fetch data from your Strapi API endpoint. Remember to include any filters or sorting needed.

    ```typescript
    import { strapiRequest } from './config';

    export async function fetchYourContent(category?: string): Promise<YourContent[]> {
      try {
        let query = '/api/your-content-plural-name'; // e.g., /api/cancer-informations
        if (category) {
          query += `?filters[category][$eq]=${category}&sort=order:asc`;
        }
        const data = await strapiRequest<{ data: StrapiYourContent[] }>(query);

        if (data?.data) {
          return data.data.map(transformStrapiYourContent);
        }
        return [];
      } catch (error) {
        console.error(`Failed to fetch your content for category ${category || 'all'}:`, error);
        return [];
      }
    }
    ```

## 4. Update Your Next.js Page Component

Modify the relevant Next.js page component (e.g., `app/your-page/page.tsx`) to fetch the data using your new function and pass it to your client components.

*   **Import:** `import { fetchYourContent } from '@/lib/strapi/your-new-content';`
*   **Fetch Data:** Call the async function within your page component.

    ```typescript
    export default async function YourPage() {
      const yourData = await fetchYourContent();
      // ... or with a category: const signsData = await fetchYourContent('signs');

      return (
        <main>
          {/* Pass data to client components */}
          <YourClientComponent data={yourData} />
        </main>
      );
    }
    ```

## 5. Update Your Client Components to Render Data

Modify the client components (e.g., `app/your-page/YourClientComponent.tsx`) to receive the data as props and render it. If your content field is Markdown, use `react-markdown`.

*   **Install `react-markdown`:** If you haven't already, install it: `npm install react-markdown`
*   **Import:** `import ReactMarkdown from 'react-markdown';`
*   **Use `ReactMarkdown`:** Replace `dangerouslySetInnerHTML` with `ReactMarkdown`.

    ```typescript
    interface YourClientComponentProps {
      data: YourContent[];
    }

    const YourClientComponent: React.FC<YourClientComponentProps> = ({ data }) => {
      return (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      );
    };
    ```

## 6. Address Styling Implications

Moving content to Strapi and rendering it dynamically can affect styling, especially if your CSS relies on specific HTML structures that were previously hardcoded.

*   **Inspect Elements:** Use browser developer tools to inspect the rendered HTML and compare it to your original design.
*   **Adjust CSS:** Modify `app/custom.css` (or other relevant CSS files) to target the new HTML structure generated by `react-markdown` or your components.
    *   **Example (for lists):** If lists lose their bullets, you might need to add rules like:

        ```css
        .card-text ul {
          list-style-type: disc !important;
          list-style-position: inside;
          padding-left: 1rem;
        }
        ```
    *   **Example (for first character styling):** If you have a `first-character` class that was applied to a `<span>` within a `<p>`, and now the `<p>` is generated by Markdown, you might need to adjust your CSS to target the first letter of the paragraph directly:

        ```css
        .your-container-class p:first-of-type::first-letter {
          /* your first character styles */
        }
        ```

## 7. Add Content in Strapi Admin Panel

Finally, populate your new content type with data in the Strapi admin panel. Ensure the content is entered correctly, especially rich text fields (e.g., using Markdown syntax for lists, bolding, etc.).

*   **Publish:** Remember to publish your entries in Strapi for them to be available via the API.

By following these steps, you should be able to successfully add and integrate new content types from Strapi into your Next.js application.