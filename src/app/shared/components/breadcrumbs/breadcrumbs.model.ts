export type BreadCrumb = {
  link: string;
  label: string;
  children?: BreadCrumb[];
};

export const breadcrumbs = [
  { label: 'Home', link: '/' },

  {
    label: 'Posts', link: '/post-list', children: [
      { label: 'Add Post', link: '/add-post' },
      { label: 'Edit Post', link: '/edit-post/:id' },
      { label: 'Search Posts', link: '/search-posts' },
    ]
  },

  { label: 'Login', link: '/login' },
  { label: 'Logout', link: '/logout' },
  { label: 'Register', link: '/register' },
];
