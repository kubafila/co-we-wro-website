import {z, defineCollection} from "astro:content";
import { glob} from 'astro/loaders'; // Not available with legacy API


/// Ustawienia
const metaSettingsSchema = (image) => z.object({
  metaTags: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string()
  }),
  openGraph: z.object({
    title: z.string(),
    description: z.string(),
    image: image()
  })

});

const metaSettingsSchemai18n = ({image}) => z.object({
  pl: metaSettingsSchema(image),
});

const metaSettings = defineCollection({
  loader: glob({pattern: "meta.md", base: 'src/content/settings'}),
  schema: metaSettingsSchemai18n
});

export const weekSchema = z.object({
  title: z.string(),
  dateFrom: z.date(),
  dateTo: z.date(),
  events: z.array(
    z.object({
      title: z.string(),
      date: z.string(),
      location: z.string(),
      price: z.string().optional(),
      registration: z.string().optional(),
      link: z.string().optional(),
      body: z.string(),
    })
  )
})


const weeks = defineCollection({
  loader: glob({pattern: "*.md", base: 'src/content/weeks'}),
  schema: weekSchema
});
export const collections = {
  weeks,
  metaSettings
}