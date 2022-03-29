import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '9n21syz3',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skHVBHkI3sakzANQmpPkXP3qVYFrmfLlwoPOMAf5Lf93YHuIi82SOJX3HHLNN2I3TqwpF3RjQySj7GgZ6q1vjqUUQL49IgV9TdH0SlP504QOVTs7fiK06jzTqjPMHGHFh7sCtoqc49vKXtFhHnXbfoxS1WX2NECJnG5grJASAdLsPbDpW5bm',
  useCdn: false,
})
