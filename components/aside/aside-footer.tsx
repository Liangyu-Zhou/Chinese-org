const footerLinks = [
  ['Terms of Service', 'https://Chinese.org/1'],
  ['Privacy Policy', 'https://Chinese.org/2'],
  ['Cookie Policy', 'https://Chinese.org/3'],
  ['Accessibility', 'https://Chinese.org/4'],
  ['Ads Info', 'https://Chinese.org/5']
] as const;

export function AsideFooter(): JSX.Element {
  return (
    <footer
      className='sticky top-16 flex flex-col gap-3 text-center text-sm 
                 text-light-secondary dark:text-dark-secondary'
    >
      <nav className='flex flex-wrap justify-center gap-2'>
        {footerLinks.map(([linkName, href]) => (
          <a
            className='custom-underline'
            target='_blank'
            rel='noreferrer'
            href={href}
            key={href}
          >
            {linkName}
          </a>
        ))}
      </nav>
      <p>© 2022 Chinese.org</p>
    </footer>
  );
}
