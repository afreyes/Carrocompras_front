import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import ProductDetail from '../../Components/ProductDetail';

function Home() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const fetchRelatedProducts = (category) => {
    // Utilizamos la categoría del primer producto como ejemplo
    fetch(`https://api.escuelajs.co/api/v1/products?category=${category}`)
      .then(response => response.json())
      .then(relatedData => {
        // Aquí puedes manejar los datos de productos relacionados
        console.log('Productos Relacionados:', relatedData);
      });
  };

  return (
    <>
      <Layout>

        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {items?.map(item => (
            <Card
              key={item.id}
              data={item}
              onClick={() => fetchRelatedProducts(item.category)}
            />
          ))}
        </div>
        <ProductDetail />
      </Layout>
    </>
  );
}

export default Home;