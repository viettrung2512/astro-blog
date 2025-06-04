import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => 
    z.object({
      title: z.string()
        .min(10, "Tiêu đề phải có ít nhất 10 ký tự")
        .max(100, "Tiêu đề không quá 100 ký tự"),
      
      pubDate: z.date(),

      author: z.string()
        .default("Admin")
        .transform(val => val.trim()),
      
      image: z.string(),
      
      tags: z.array(z.string())
        .default(["general"])
        .transform(arr => arr.map(tag => tag.toLowerCase())),
          
      draft: z.boolean()
        .default(false)
        .optional()
    })
});

export const collections = {
  blog: blogCollection
};