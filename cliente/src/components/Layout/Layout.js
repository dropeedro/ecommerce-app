import React, { useEffect } from 'react';
// import Header from './Header';
import Header from '../Header/Header';
// import Footer from './Footer';
import {Helmet} from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import Footer from '../Footer/Footer';

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author}/>
          <title>{title}</title>
      </Helmet>
      <Header/>
        <main style={{minHeight: '80vh'}}>
            <Toaster/>
            {children}
        </main>
      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title: "MusicPro",
  description: "Tienda de música online",
  keywords: "musica, guitarra, arte, comprar, chile, online, tienda de musica, instrumentos",
  author: "DuocUC"
}

export default Layout