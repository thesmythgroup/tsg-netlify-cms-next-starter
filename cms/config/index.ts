import {
  CmsCollection,
  CmsCollectionFile,
  CmsConfig,
  CmsField,
  CmsFieldBase,
} from 'netlify-cms-core';
import { widgetShowcasePage } from './widget-showcase-page';

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
  collections: [
    {
      label: 'Pages',
      name: 'pages',
      files: [
        {
          label: 'Home',
          name: 'home',
          file: 'content/home.md',
          fields: [
            {
              label: 'Title',
              name: 'title',
              widget: 'string',
            },
            {
              label: 'Intro',
              name: 'intro',
              widget: 'markdown',
            },
            {
              label: 'Show Gallery?',
              name: 'showGallery',
              widget: 'boolean',
            },
            {
              label: 'Video',
              name: 'embeddedVideo',
              widget: 'embeddedVideo',
            },
            {
              label: 'Features',
              name: 'features',
              widget: 'list',
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
              label: 'Gallery Images',
              name: 'gallery',
              widget: 'list',
              label_singular: 'Image',
              add_to_top: true,
              fields: [{ label: 'Image', name: 'image', widget: 'image' }],
            },
          ],
        },
        {
          label: 'About',
          name: 'about',
          file: 'content/about.md',
          fields: [
            {
              label: 'Content',
              name: 'content',
              widget: 'string',
            },
          ],
        },
        {
          label: 'Contact',
          name: 'contact',
          file: 'content/contact.md',
          fields: [
            {
              label: 'Intro',
              name: 'intro',
              widget: 'string',
            },
          ],
        },
        {
          label: 'Embedded Video Example',
          name: 'embedded-video-example',
          file: 'content/embedded-video-example.md',
          fields: [
            {
              label: 'Video',
              name: 'embeddedVideo',
              widget: 'embeddedVideo',
            },
          ],
        },

        // Example page to showcase all widgets.
        widgetShowcasePage,
      ],
    },
    // This collection is used to show off the "relation" widget in the
    // WidgetShowcasePage.
    {
      label: 'Sales Offices',
      name: 'sales-offices',
      folder: 'content/sales-offices',
      create: true,
      fields: [
        {
          label: 'Name',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Address',
          name: 'address',
          widget: 'string',
        },
        { label: 'Description', name: 'description', widget: 'markdown' },
      ],
    },
  ],
};
