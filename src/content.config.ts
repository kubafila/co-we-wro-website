import {z, defineCollection} from "astro:content";
import {file, glob} from 'astro/loaders'; // Not available with legacy API


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
  title: z.string(), // Tytuł tygodnia
  dateFrom: z.date(), // Tydzień od
  dateTo: z.date(),   // Tydzień do
  events: z.array(
    z.object({
      title: z.string(),         // Tytuł wydarzenia
      date: z.string(),          // Data wydarzenia (można zmienić na
      location: z.string(),      // Miejsce wydarzenia
      price: z.string().optional(),         // Cena (opcjonalnie)
      registration: z.string().optional(),  // Zapisy (opcjonalnie)
      body: z.string(),          // Opis (markdown)
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