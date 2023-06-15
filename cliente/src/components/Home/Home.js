import React from 'react';
import './Home.scss';

import Banner from './Banner/Banner';
import Layout from '../Layout/Layout';
import Category from './Category/Category';
import Products from '../Products/Products';
import { useAuth } from '../../context/auth';
import Indicators from './Indicators/Indicators';

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        <div className='home'>
            <Banner/>
            <div className="main-content">
                <div className="layout">
                    {/* <Category/>  */}
                    <Products/>
                </div>
            </div>
            <Indicators/>
        </div>
    </Layout>
  )
}

export default Home