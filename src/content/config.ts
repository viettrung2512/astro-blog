import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => 
    z.object({
      title: z.string()
        .min(10, "Tiêu đề phải có ít nhất 10 ký tự")
        .max(100, "Tiêu đề không quá 100 ký tự"),
      
      pubDate: z
        .string()
        .transform(str => new Date(str)),
      
      author: z.string()
        .default("Admin")
        .transform(val => val.trim()),
      
      image: z.object({
        src: z.string(),
        alt: z.string().optional()
      }).or(z.string()).transform(val => 
        typeof val === 'string' ? { src: val, alt: "" } : val
      ),
      
      tags: z.array(z.string())
        .default(["general"])
        .transform(arr => arr.map(tag => tag.toLowerCase())),
      
      description: z.string()
        .max(160, "Mô tả không quá 160 ký tự")
        .optional(),
      
      draft: z.boolean()
        .default(false)
        .optional()
    })
});

export const collections = {
  blog: blogCollection
};