import { CmsConfig } from 'netlify-cms-core';

export const cmsConfig: CmsConfig = {
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
      ],
    },
  ],
};
