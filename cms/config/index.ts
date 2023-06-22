import {
  CmsCollection,
  CmsCollectionFile,
  CmsConfig,
  CmsField,
  CmsFieldBase,
} from 'netlify-cms-core';
import { widgetShowcasePage } from './widget-showcase-page';
import { DEFAULT_LOCALE, LOCALES } from '../../lib/locale-settings';

/**
 * This is a helper/utility type that allows us to override a single
 * property of a type.
 */
type Modify<T, R> = Omit<T, keyof R> & R;

interface CustomCmsFieldTypes extends CmsFieldBase {
  widget: 'embeddedVideo';
  default?: string;
}

// In order to add support for custom widgets, we need to go down the chain
// of types and add our custom widget to the union of possible widgets.
type CustomCmsField = CmsField | (CmsFieldBase & CustomCmsFieldTypes);
type CustomCmsCollectionFiles = Modify<
  CmsCollectionFile,
  {
    fields: CustomCmsField[];
  }
>;
type CustomCmsCollection = Modify<
  CmsCollection,
  { files?: CustomCmsCollectionFiles[] }
>;
type CustomCmsConfig = Modify<
  CmsConfig,
  { collections: CustomCmsCollection[] }
>;

export const cmsConfig: CustomCmsConfig = {
  backend: {
    name: 'git-gateway',
    branch: 'main',
    commit_messages: {
      create: 'docs: create {{collection}} “{{slug}}”',
      update: 'docs: update {{collection}} “{{slug}}”',
      delete: 'docs: delete {{collection}} “{{slug}}”',
      uploadMedia: 'docs: upload “{{path}}”',
      deleteMedia: 'docs: delete “{{path}}”',
      openAuthoring: 'docs: {{message}}',
    },
  },
  local_backend: true,
  media_folder: '/public/uploads',
  public_folder: '/uploads',
  i18n: {
    structure: 'multiple_folders',
    locales: LOCALES,
    default_locale: DEFAULT_LOCALE,
  },
  collections: [
    {
      label: 'Pages',
      name: 'pages',
      i18n: {
        structure: 'single_file',
        locales: LOCALES,
      },
      files: [
        {
          label: 'Home',
          name: 'home',
          file: 'content/home.md',
          i18n: true,
          fields: [
            {
              label: 'Title',
              name: 'title',
              widget: 'string',
              i18n: true,
            },
            {
              label: 'Intro',
              name: 'intro',
              widget: 'markdown',
              i18n: true,
            },
            {
              label: 'Show Gallery?',
              name: 'showGallery',
              widget: 'boolean',
              default: false,
              i18n: true,
            },
            {
              label: 'Features',
              name: 'features',
              widget: 'list',
              required: false,
              i18n: true,
              fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                {
                  label: 'Content',
                  name: 'content',
                  widget: 'markdown',
                  modes: ['rich_text', 'raw'],
                },
              ],
            },
            {
              label: 'Secondary Heading',
              name: 'secondaryHeading',
              widget: 'string',
              i18n: true,
            },
            {
              label: 'Secondary Content',
              name: 'secondaryContent',
              widget: 'markdown',
              i18n: true,
            },
            {
              label: 'Video',
              name: 'embeddedVideo',
              widget: 'embeddedVideo',
              i18n: true,
            },
            {
              label: 'Gallery Images',
              name: 'gallery',
              widget: 'list',
              label_singular: 'Image',
              add_to_top: true,
              required: false,
              fields: [{ label: 'Image', name: 'image', widget: 'image' }],
            },
          ],
        },
        {
          label: 'Blog',
          name: 'blog',
          file: 'content/blogHeading.md',
          i18n: true,
          fields: [
            {
              label: 'Title',
              name: 'title',
              widget: 'string',
              i18n: true,
            },
            {
              label: 'Subtitle',
              name: 'subtitle',
              widget: 'string',
              i18n: true,
            },
          ],
        },
        {
          label: 'About',
          name: 'about',
          file: 'content/about.md',
          i18n: true,
          fields: [
            {
              label: 'Title',
              name: 'title',
              widget: 'string',
              i18n: true,
            },
            {
              label: 'Content',
              name: 'content',
              widget: 'markdown',
              modes: ['rich_text', 'raw'],
              i18n: true,
            },
          ],
        },
        {
          label: 'Contact',
          name: 'contact',
          file: 'content/contact.md',
          i18n: true,
          fields: [
            {
              label: 'Title',
              name: 'title',
              widget: 'string',
              i18n: true,
            },
            {
              label: 'Intro',
              name: 'intro',
              widget: 'string',
              i18n: true,
            },
          ],
        },
        {
          label: 'Embedded Video Example',
          name: 'embedded-video-example',
          file: 'content/embedded-video-example.md',
          i18n: true,
          fields: [
            {
              label: 'Video',
              name: 'embeddedVideo',
              widget: 'embeddedVideo',
              i18n: true,
            },
          ],
        },

        // Example page to showcase all widgets.
        widgetShowcasePage,
      ],
    },
    {
      label: 'Blog Posts',
      label_singular: 'Blog Post',
      name: 'blogPosts',
      folder: 'content/blog',
      create: true,
      slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
      i18n: {
        structure: 'single_file',
        locales: LOCALES,
      },
      fields: [
        {
          label: 'Category',
          name: 'category',
          widget: 'relation',
          collection: 'categories',
          search_fields: ['name'],
          value_field: 'name',
          display_fields: ['name'],
          i18n: true,
        },
        { label: 'Title', name: 'title', widget: 'string', i18n: true },
        { label: 'Date', name: 'date', widget: 'datetime', i18n: true },
        {
          label: 'Tags',
          name: 'tags',
          widget: 'relation',
          collection: 'tags',
          multiple: true,
          search_fields: ['name'],
          value_field: 'name',
          display_fields: ['name'],
          i18n: true,
        },
        { label: 'Image', name: 'image', widget: 'image', i18n: true },
        {
          label: 'Content',
          name: 'content',
          widget: 'markdown',
          modes: ['rich_text', 'raw'],
          i18n: true,
        },
      ],
    },
    {
      label: 'Blog Post Categories',
      label_singular: 'Category',
      name: 'categories',
      folder: 'content/categories',
      create: true,
      identifier_field: 'name',
      slug: '{{slug}}',
      editor: {
        preview: false,
      },
      i18n: {
        structure: 'single_file',
        locales: LOCALES,
      },
      fields: [{ label: 'Name', name: 'name', widget: 'string', i18n: true }],
    },
    {
      label: 'Blog Post Tags',
      label_singular: 'Tag',
      name: 'tags',
      folder: 'content/tags',
      create: true,
      identifier_field: 'name',
      slug: '{{slug}}',
      i18n: {
        structure: 'single_file',
        locales: LOCALES,
      },
      editor: {
        preview: false,
      },
      fields: [{ label: 'Name', name: 'name', widget: 'string', i18n: true }],
    },
    // This collection is used to show off the "relation" widget in the
    // WidgetShowcasePage.
    {
      label: 'Sales Offices',
      label_singular: 'Sales Office',
      name: 'sales-offices',
      folder: 'content/sales-offices',
      create: true,
      i18n: {
        structure: 'single_file',
        locales: LOCALES,
      },
      editor: {
        preview: false,
      },
      fields: [
        {
          label: 'Name',
          name: 'title',
          widget: 'string',
          i18n: true,
        },
        {
          label: 'Address',
          name: 'address',
          widget: 'string',
          i18n: true,
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'markdown',
          i18n: true,
        },
      ],
    },
  ],
};
