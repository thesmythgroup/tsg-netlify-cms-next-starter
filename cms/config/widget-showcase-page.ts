import { CmsCollectionFile } from 'netlify-cms-core';

// This page serves to highlight the various widgets that are available as part of Netlify CMS.
// Documentation can be found here: https://www.netlifycms.org/docs/widgets/
export const widgetShowcasePage: CmsCollectionFile = {
  label: 'Widget Showcase',
  name: 'widgetShowcasePage',
  file: 'content/widgetShowcase.md',
  i18n: true,
  fields: [
    {
      label: 'Header Color',
      name: 'color',
      widget: 'color',
      enableAlpha: true,
      allowInput: true,
      i18n: true,
    },
    // The object widget allows you to group multiple widgets together, nested under a single
    // field. You can choose any widget as a child of an object widget–even other objects.
    {
      label: 'Profile',
      name: 'profile',
      widget: 'object',
      summary: 'Profile: {{fields.name}}',
      i18n: true,
      fields: [
        {
          label: 'Public',
          name: 'public',
          widget: 'boolean',
          i18n: true,
          default: true,
        },
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
          default: 'John Doe',
          i18n: true,
        },
        {
          label: 'Profile Picture Picker',
          name: 'profilePicture',
          required: false,
          widget: 'file',
          default: '/uploads/cleanshot-2022-05-24-at-17.13.20-2x.png',
          i18n: true,
          media_library: {
            name: 'mediaLibraryName',
            config: {
              multiple: true,
            },
          },
        },
        {
          label: 'Age',
          name: 'age',
          widget: 'number',
          default: 2,
          value_type: 'int',
          min: 1,
          max: 101,
          step: 1,
          i18n: true,
        },
        {
          label: 'Bio',
          name: 'bio',
          widget: 'text',
          default: 'I am a human.',
          pattern: ['.{5,}', 'Must have at least 5 characters'],
          i18n: true,
        },
        {
          label: 'Roles',
          name: 'roles',
          widget: 'select',
          multiple: true,
          min: 1,
          max: 3,
          required: false,
          options: ['Design', 'UX', 'Dev', 'Marketing', 'Sales'],
          default: 'Design',
          i18n: true,
        },
        {
          label: 'Address',
          name: 'address',
          widget: 'object',
          collapsed: true,
          i18n: true,
          fields: [
            {
              label: 'Street Address',
              name: 'street',
              widget: 'string',
              required: false,
              i18n: true,
            },
            {
              label: 'City',
              name: 'city',
              widget: 'string',
              required: false,
              i18n: true,
            },
            {
              label: 'Zip Code',
              name: 'zip-code',
              widget: 'string',
              required: false,
              i18n: true,
            },
          ],
        },
        {
          label: 'Nearest Airport',
          name: 'airportCode',
          required: false,
          widget: 'select',
          options: [
            { label: 'New York', value: 'JFK' },
            { label: 'London', value: 'LHR' },
            { label: 'Paris', value: 'CDG' },
            { label: 'Tokyo', value: 'HND' },
          ],
          // 2 issues with setting a "default":
          //   1. The docs say that this can access an object {label: string, value: string} but the
          //      TypeScript types say it's a string | string[].
          //      HACK: the "as unknown as string" is to show that according to the docs, it should
          //      be an object, but the types say it's a string | string[].
          //   2. Setting a default doesn't seem to select the given value (i.e. it doesn't work).
          default: { label: 'Tokyo', value: 'HND' } as unknown as string,
        },
      ],
    },
    {
      label: 'Choose Pick-up Location',
      name: 'location',
      widget: 'map',
      required: false,
      i18n: true,
    },
    {
      label: 'Schedule Next Appointment',
      name: 'startTime',
      widget: 'datetime',
      default: '',
      date_format: 'DD.MM.YYYY', // e.g. 24.12.2021
      time_format: 'HH:mm', // e.g. 21:07
      format: 'LLL',
      picker_utc: false,
      i18n: true,
    },
    // Hidden
    { label: 'Layout', name: 'layout', widget: 'hidden', default: 'blog' },
    {
      label: 'Code',
      name: 'code',
      widget: 'code',
      i18n: true,
    },

    // Referencing a file collection list field example
    {
      label: 'Promoted Feature',
      name: 'promotedFeature',
      widget: 'relation',
      collection: 'pages',
      file: 'home',
      search_fields: ['features.*.title'],
      value_field: 'features.*.title',
      display_fields: ['features.*.title'],
    },

    // Referencing a folder collection field example
    {
      label: 'Featured Location',
      name: 'featuredLocation',
      widget: 'relation',
      collection: 'sales-offices',
      search_fields: ['address'],
      value_field: 'address',
      display_fields: ['{{title}} ({{address}})'],
    },
  ],
};
