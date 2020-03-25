import React from 'react';
import config from '../../config';

export default function PageFooter() {
  return (
    <footer id="footer">
      <ul className="copyright">
        <li>
          {config.authorName}, {config.authorStreet}, {config.authorZip}{' '}
          {config.authorTown}, {config.authorCountry}
        </li>
      </ul>
    </footer>
  );
}
